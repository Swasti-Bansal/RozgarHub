// src/services/dbService.js
// Firestore database layer — all reads and writes go through here

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const uid  = () => auth().currentUser?.uid;
const now  = () => firestore.FieldValue.serverTimestamp();

// ─── USERS ───────────────────────────────────────────────────────────────────

/** Create/merge user doc on first login (OTPVerifyScreen). */
export const createUserProfile = async ({ phoneNumber }) => {
  try {
    await firestore().collection('users').doc(uid()).set({
      uid: uid(), phoneNumber,
      name: '', role: '', workTypes: [], experience: '', age: '',
      location: null, locationLabel: '',
      rating: 0, totalJobs: 0, totalEarned: 0, verified: false,
      createdAt: now(), updatedAt: now(),
    }, { merge: true });
    return { success: true };
  } catch (e) { return { success: false, error: e.message }; }
};

/** Save onboarding profile fields to Firestore. */
export const updateUserProfile = async (fields) => {
  try {
    await firestore().collection('users').doc(uid()).update({ ...fields, updatedAt: now() });
    return { success: true };
  } catch (e) { return { success: false, error: e.message }; }
};

/** One-time fetch of current user's Firestore profile. */
export const getUserProfile = async () => {
  try {
    const doc = await firestore().collection('users').doc(uid()).get();
    if (doc.exists) return { success: true, data: doc.data() };
    return { success: false, error: 'User not found' };
  } catch (e) { return { success: false, error: e.message }; }
};

/** Real-time listener for current user profile. Returns unsubscribe fn. */
export const subscribeToUserProfile = (onUpdate) =>
  firestore().collection('users').doc(uid())
    .onSnapshot(doc => { if (doc.exists) onUpdate(doc.data()); });

// ─── JOBS ────────────────────────────────────────────────────────────────────

/** Post a new job (PostJobScreen → Firestore). */
export const postJob = async ({
  title, category, description, location,
  duration, urgency, workersNeeded,
  dailyBudgetMin, dailyBudgetMax,
  provideMeals, provideTransport,
  contactName, contactPhone,
}) => {
  try {
    const ref = await firestore().collection('jobs').add({
      employerId: uid(),
      title, category, description, location,
      duration, urgency,
      workersNeeded:  Number(workersNeeded),
      dailyBudgetMin: Number(dailyBudgetMin) || 0,
      dailyBudgetMax: Number(dailyBudgetMax) || 0,
      provideMeals, provideTransport,
      contactName, contactPhone,
      status: 'open',       // 'open' | 'ongoing' | 'completed' | 'cancelled'
      applicants: [],       // array of worker uids who applied
      hiredWorkers: [],     // array of worker uids who were hired
      createdAt: now(), updatedAt: now(),
    });
    return { success: true, jobId: ref.id };
  } catch (e) { return { success: false, error: e.message }; }
};

/** Real-time listener — all open jobs (HereJobScreen). */
export const subscribeToOpenJobs = (onUpdate) =>
  firestore().collection('jobs')
    .where('status', '==', 'open')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snap => {
      onUpdate(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

/** One-time fetch — all open jobs. */
export const getOpenJobs = async () => {
  try {
    const snap = await firestore().collection('jobs')
      .where('status', '==', 'open')
      .orderBy('createdAt', 'desc').get();
    return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
  } catch (e) { return { success: false, error: e.message }; }
};

/** Fetch single job by ID. */
export const getJobById = async (jobId) => {
  try {
    const doc = await firestore().collection('jobs').doc(jobId).get();
    if (doc.exists) return { success: true, data: { id: doc.id, ...doc.data() } };
    return { success: false, error: 'Job not found' };
  } catch (e) { return { success: false, error: e.message }; }
};

/** Update a job's status field. */
export const updateJobStatus = async (jobId, status) => {
  try {
    await firestore().collection('jobs').doc(jobId).update({ status, updatedAt: now() });
    return { success: true };
  } catch (e) { return { success: false, error: e.message }; }
};

/**
 * Real-time listener — jobs posted by current employer (EmployerHomeScreen).
 * Returns unsubscribe fn.
 */
export const subscribeToMyPostedJobs = (onUpdate) =>
  firestore().collection('jobs')
    .where('employerId', '==', uid())
    .orderBy('createdAt', 'desc')
    .onSnapshot(snap => {
      onUpdate(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

/** One-time fetch — jobs posted by current employer. */
export const getMyPostedJobs = async () => {
  try {
    const snap = await firestore().collection('jobs')
      .where('employerId', '==', uid())
      .orderBy('createdAt', 'desc').get();
    return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
  } catch (e) { return { success: false, error: e.message }; }
};

// ─── APPLICATIONS ─────────────────────────────────────────────────────────────

/**
 * Worker applies to a job.
 * Creates an application doc and adds workerId to job.applicants[].
 */
export const applyToJob = async (jobId, jobSnapshot) => {
  try {
    // Prevent duplicate
    const existing = await firestore().collection('applications')
      .where('jobId', '==', jobId)
      .where('workerId', '==', uid())
      .get();
    if (!existing.empty) return { success: false, error: 'You have already applied to this job.' };

    // Build application doc — embed key job fields so we can show them without extra fetches
    await firestore().collection('applications').add({
      jobId,
      workerId:      uid(),
      employerId:    jobSnapshot?.employerId || '',
      jobTitle:      jobSnapshot?.title      || '',
      jobLocation:   jobSnapshot?.location   || '',
      jobCategory:   jobSnapshot?.category   || '',
      dailyBudgetMin: jobSnapshot?.dailyBudgetMin || 0,
      dailyBudgetMax: jobSnapshot?.dailyBudgetMax || 0,
      duration:      jobSnapshot?.duration   || '',
      contactName:   jobSnapshot?.contactName || '',
      status:        'pending',   // 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled'
      appliedAt:     now(),
      updatedAt:     now(),
    });

    // Add worker to job's applicants array
    await firestore().collection('jobs').doc(jobId).update({
      applicants: firestore.FieldValue.arrayUnion(uid()),
      updatedAt:  now(),
    });

    return { success: true };
  } catch (e) { return { success: false, error: e.message }; }
};

/**
 * Employer accepts a worker's application.
 * Moves application status → 'accepted', adds to job.hiredWorkers[].
 * If enough workers hired, changes job status to 'ongoing'.
 */
export const acceptApplication = async (applicationId, jobId, workerId) => {
  try {
    const batch = firestore().batch();

    // Update application status
    batch.update(firestore().collection('applications').doc(applicationId), {
      status: 'accepted', updatedAt: now(),
    });

    // Add worker to hiredWorkers on the job
    batch.update(firestore().collection('jobs').doc(jobId), {
      hiredWorkers: firestore.FieldValue.arrayUnion(workerId),
      status:       'ongoing',
      updatedAt:    now(),
    });

    await batch.commit();
    return { success: true };
  } catch (e) { return { success: false, error: e.message }; }
};

/**
 * Employer rejects a worker's application.
 */
export const rejectApplication = async (applicationId) => {
  try {
    await firestore().collection('applications').doc(applicationId).update({
      status: 'rejected', updatedAt: now(),
    });
    return { success: true };
  } catch (e) { return { success: false, error: e.message }; }
};

/**
 * Mark a job as completed (called from RateJobScreen).
 * Updates job status → 'completed'.
 * Updates application status → 'completed'.
 * Increments worker's totalJobs counter.
 */
export const completeJob = async (jobId, applicationId) => {
  try {
    const batch = firestore().batch();

    // Job → completed
    batch.update(firestore().collection('jobs').doc(jobId), {
      status: 'completed', updatedAt: now(),
    });

    // Application → completed
    if (applicationId) {
      batch.update(firestore().collection('applications').doc(applicationId), {
        status: 'completed', completedAt: now(), updatedAt: now(),
      });
    }

    // Increment worker's totalJobs
    batch.update(firestore().collection('users').doc(uid()), {
      totalJobs: firestore.FieldValue.increment(1),
      updatedAt: now(),
    });

    await batch.commit();
    return { success: true };
  } catch (e) { return { success: false, error: e.message }; }
};

/**
 * Cancel a job application (worker withdraws or employer cancels).
 */
export const cancelApplication = async (applicationId, jobId) => {
  try {
    const batch = firestore().batch();
    batch.update(firestore().collection('applications').doc(applicationId), {
      status: 'cancelled', updatedAt: now(),
    });
    batch.update(firestore().collection('jobs').doc(jobId), {
      applicants: firestore.FieldValue.arrayRemove(uid()),
      updatedAt:  now(),
    });
    await batch.commit();
    return { success: true };
  } catch (e) { return { success: false, error: e.message }; }
};

/**
 * Real-time listener — current worker's active (pending/accepted) applications.
 * Used in HomeScreen (ongoing jobs) and ActiveJobsScreen.
 */
export const subscribeToMyApplications = (onUpdate) =>
  firestore().collection('applications')
    .where('workerId', '==', uid())
    .orderBy('appliedAt', 'desc')
    .onSnapshot(snap => {
      onUpdate(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

/**
 * Real-time listener — applications for a specific job (employer view).
 */
export const subscribeToJobApplications = (jobId, onUpdate) =>
  firestore().collection('applications')
    .where('jobId', '==', jobId)
    .orderBy('appliedAt', 'desc')
    .onSnapshot(snap => {
      onUpdate(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

/**
 * Fetch completed + cancelled applications for job history (worker).
 */
export const getMyJobHistory = async () => {
  try {
    const snap = await firestore().collection('applications')
      .where('workerId', '==', uid())
      .orderBy('appliedAt', 'desc')
      .get();
    return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
  } catch (e) { return { success: false, error: e.message }; }
};

// ─── RATINGS ─────────────────────────────────────────────────────────────────

/**
 * Worker submits a rating for an employer (or vice-versa) after a job.
 * @param {string} targetId  — uid of user being rated
 * @param {string} jobId
 * @param {number} stars     — 1-5
 * @param {string} comment
 * @param {string} jobTitle
 */
export const submitRating = async (targetId, jobId, stars, comment = '', jobTitle = '') => {
  try {
    // Write rating doc
    await firestore().collection('ratings').add({
      fromId: uid(), targetId, jobId, jobTitle,
      stars, comment, createdAt: now(),
    });

    // Recalculate target's average rating
    const snap = await firestore().collection('ratings').where('targetId', '==', targetId).get();
    const allStars = snap.docs.map(d => d.data().stars);
    const avg = allStars.reduce((a, b) => a + b, 0) / allStars.length;

    await firestore().collection('users').doc(targetId).update({
      rating: parseFloat(avg.toFixed(1)), updatedAt: now(),
    });

    return { success: true };
  } catch (e) { return { success: false, error: e.message }; }
};

/**
 * Real-time listener for ratings received by a user (ReviewScreen).
 */
export const subscribeToRatings = (targetId, onUpdate) =>
  firestore().collection('ratings')
    .where('targetId', '==', targetId)
    .orderBy('createdAt', 'desc')
    .onSnapshot(snap => {
      onUpdate(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

/** Fetch all ratings for a user (one-time). */
export const getRatingsForUser = async (targetId) => {
  try {
    const snap = await firestore().collection('ratings')
      .where('targetId', '==', targetId)
      .orderBy('createdAt', 'desc').get();
    return { success: true, data: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
  } catch (e) { return { success: false, error: e.message }; }
};

// ─── WORKER STATS ─────────────────────────────────────────────────────────────

/**
 * Fetch aggregated stats for a worker's home screen dashboard.
 * Returns { totalJobs, totalEarned, rating }
 */
export const getWorkerStats = async () => {
  try {
    const doc = await firestore().collection('users').doc(uid()).get();
    if (!doc.exists) return { success: false, error: 'User not found' };
    const data = doc.data();
    return {
      success: true,
      data: {
        totalJobs:   data.totalJobs   || 0,
        totalEarned: data.totalEarned || 0,
        rating:      data.rating      || 0,
      },
    };
  } catch (e) { return { success: false, error: e.message }; }
};