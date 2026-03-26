// src/services/dbService.js
// Firestore database layer — all reads and writes go through here

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// ─── Helpers ────────────────────────────────────────────────────────────────

const uid = () => auth().currentUser?.uid;

const now = () => firestore.FieldValue.serverTimestamp();

// ─── USERS ──────────────────────────────────────────────────────────────────
// Collection: /users/{uid}
// Created on first login; updated when user completes onboarding

/**
 * Create or overwrite a user document.
 * Called from OTPVerifyScreen after successful verification.
 */
export const createUserProfile = async ({ phoneNumber }) => {
  try {
    await firestore().collection('users').doc(uid()).set({
      uid:         uid(),
      phoneNumber,
      name:        '',
      role:        '',          // 'worker' | 'employer'
      workType:    '',
      experience:  '',
      age:         '',
      location:    '',
      rating:      0,
      totalJobs:   0,
      totalEarned: 0,
      verified:    false,
      createdAt:   now(),
      updatedAt:   now(),
    }, { merge: true });       // merge: true won't wipe existing data on re-login
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Update onboarding fields (AboutWorkScreen + GetStartedScreen).
 */
export const updateUserProfile = async (fields) => {
  try {
    await firestore().collection('users').doc(uid()).update({
      ...fields,
      updatedAt: now(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Fetch the current user's profile.
 */
export const getUserProfile = async () => {
  try {
    const doc = await firestore().collection('users').doc(uid()).get();
    if (doc.exists) return { success: true, data: doc.data() };
    return { success: false, error: 'User not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Real-time listener for current user profile.
 * Returns unsubscribe function — call it on component unmount.
 * Usage: const unsub = subscribeToUserProfile(data => setState(data));
 */
export const subscribeToUserProfile = (onUpdate) => {
  return firestore()
    .collection('users')
    .doc(uid())
    .onSnapshot(doc => {
      if (doc.exists) onUpdate(doc.data());
    });
};

// ─── JOBS ────────────────────────────────────────────────────────────────────
// Collection: /jobs/{jobId}
// Posted by employers; read by workers

/**
 * Post a new job (PostJobScreen).
 */
export const postJob = async ({
  title, category, description, location,
  duration, urgency, workersNeeded,
  dailyBudgetMin, dailyBudgetMax,
  provideMeals, provideTransport,
  contactName, contactPhone,
}) => {
  try {
    const ref = await firestore().collection('jobs').add({
      employerId:      uid(),
      title,
      category,
      description,
      location,
      duration,
      urgency,
      workersNeeded:   Number(workersNeeded),
      dailyBudgetMin:  Number(dailyBudgetMin) || 0,
      dailyBudgetMax:  Number(dailyBudgetMax) || 0,
      provideMeals,
      provideTransport,
      contactName,
      contactPhone,
      status:          'open',     // 'open' | 'ongoing' | 'completed' | 'cancelled'
      applicants:      [],
      hiredWorkers:    [],
      createdAt:       now(),
      updatedAt:       now(),
    });
    return { success: true, jobId: ref.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Fetch all open jobs (HereJobScreen — job listings).
 */
export const getOpenJobs = async () => {
  try {
    const snapshot = await firestore()
      .collection('jobs')
      .where('status', '==', 'open')
      .orderBy('createdAt', 'desc')
      .get();
    const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: jobs };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Real-time listener for open jobs.
 */
export const subscribeToOpenJobs = (onUpdate) => {
  return firestore()
    .collection('jobs')
    .where('status', '==', 'open')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      onUpdate(jobs);
    });
};

/**
 * Fetch a single job by ID.
 */
export const getJobById = async (jobId) => {
  try {
    const doc = await firestore().collection('jobs').doc(jobId).get();
    if (doc.exists) return { success: true, data: { id: doc.id, ...doc.data() } };
    return { success: false, error: 'Job not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Update job status (e.g. mark as completed/cancelled).
 */
export const updateJobStatus = async (jobId, status) => {
  try {
    await firestore().collection('jobs').doc(jobId).update({
      status,
      updatedAt: now(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Fetch jobs posted by the current employer (DashboardScreen).
 */
export const getMyPostedJobs = async () => {
  try {
    const snapshot = await firestore()
      .collection('jobs')
      .where('employerId', '==', uid())
      .orderBy('createdAt', 'desc')
      .get();
    const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: jobs };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ─── APPLICATIONS ────────────────────────────────────────────────────────────
// Collection: /applications/{applicationId}
// Created when a worker taps "Accept" / applies to a job

/**
 * Worker applies to a job.
 */
export const applyToJob = async (jobId) => {
  try {
    // Prevent duplicate applications
    const existing = await firestore()
      .collection('applications')
      .where('jobId', '==', jobId)
      .where('workerId', '==', uid())
      .get();

    if (!existing.empty) {
      return { success: false, error: 'You have already applied to this job.' };
    }

    const ref = await firestore().collection('applications').add({
      jobId,
      workerId:  uid(),
      status:    'pending',   // 'pending' | 'accepted' | 'rejected'
      appliedAt: now(),
      updatedAt: now(),
    });

    // Also add workerId to job's applicants array
    await firestore().collection('jobs').doc(jobId).update({
      applicants: firestore.FieldValue.arrayUnion(uid()),
      updatedAt:  now(),
    });

    return { success: true, applicationId: ref.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Fetch applications made by the current worker (ActiveJobsScreen).
 */
export const getMyApplications = async () => {
  try {
    const snapshot = await firestore()
      .collection('applications')
      .where('workerId', '==', uid())
      .orderBy('appliedAt', 'desc')
      .get();
    const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: apps };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Real-time listener for the current worker's applications.
 */
export const subscribeToMyApplications = (onUpdate) => {
  return firestore()
    .collection('applications')
    .where('workerId', '==', uid())
    .orderBy('appliedAt', 'desc')
    .onSnapshot(snapshot => {
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      onUpdate(apps);
    });
};

// ─── RATINGS ─────────────────────────────────────────────────────────────────
// Collection: /ratings/{ratingId}
// Created from RateJobScreen

/**
 * Submit a rating.
 * @param {string} targetId  — uid of the user being rated
 * @param {string} jobId
 * @param {number} stars     — 1–5
 * @param {string} comment
 */
export const submitRating = async (targetId, jobId, stars, comment = '') => {
  try {
    await firestore().collection('ratings').add({
      fromId:    uid(),
      targetId,
      jobId,
      stars,
      comment,
      createdAt: now(),
    });

    // Update the target user's average rating
    const ratingsSnap = await firestore()
      .collection('ratings')
      .where('targetId', '==', targetId)
      .get();

    const allStars = ratingsSnap.docs.map(d => d.data().stars);
    const avg = allStars.reduce((a, b) => a + b, 0) / allStars.length;

    await firestore().collection('users').doc(targetId).update({
      rating:    parseFloat(avg.toFixed(1)),
      updatedAt: now(),
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Get all ratings for a user.
 */
export const getRatingsForUser = async (targetId) => {
  try {
    const snapshot = await firestore()
      .collection('ratings')
      .where('targetId', '==', targetId)
      .orderBy('createdAt', 'desc')
      .get();
    const ratings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: ratings };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
