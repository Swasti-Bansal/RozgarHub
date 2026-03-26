// src/styles/commonStyles.js - Complete StyleSheet
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },

  welcomeRoot: {
    flex: 1,
    backgroundColor: '#2C3E50',
  },

  // ── Hero ──
  welcomeHero: {
    backgroundColor: '#2C3E50',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 52,
    minHeight: 340,
    overflow: 'hidden',
  },

  // decorative background circles
  welcomeDecorCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#4A90E2',
    opacity: 0.15,
    right: -60,
    top: -40,
  },
  welcomeDecorCircle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#5CB85C',
    opacity: 0.18,
    right: 40,
    top: 100,
  },
  welcomeDecorCircle3: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4A90E2',
    opacity: 0.12,
    left: -20,
    bottom: 20,
  },

  welcomeLangBtn: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  welcomeLangText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // Logo
  welcomeLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  welcomeLogoIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  welcomeLogoName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  // Tagline
  welcomeTagline: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 38,
    marginBottom: 10,
  },
  welcomeTaglineSub: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.65)',
    marginBottom: 28,
  },

  // Trust badges
  welcomeBadgeRow: {
    flexDirection: 'row',
  },
  welcomeBadge: {
    backgroundColor: '#5CB85C',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 10,
  },
  welcomeBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  // ── Bottom panel ──
  welcomeBottom: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  welcomeBottomTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  welcomeBottomSub: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 24,
  },

  // Phone input
  welcomePhoneRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  welcomeCodeBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 10,
    justifyContent: 'center',
  },
  welcomeCodeText: {
    fontSize: 15,
    color: '#2C3E50',
    fontWeight: '600',
  },
  welcomePhoneInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#2C3E50',
  },

  // Picker
  welcomePickerDropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomePickerItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  welcomePickerItemText: {
    fontSize: 15,
    color: '#2C3E50',
  },

  // Error
  welcomeErrorText: {
    color: '#E74C3C',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 2,
  },

  // OTP button
  welcomeOtpBtn: {
    backgroundColor: '#4A90E2',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeOtpBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },

  // Why link
  welcomeWhyLink: {
    alignItems: 'center',
  },
  welcomeWhyLinkText: {
    color: '#4A90E2',
    fontSize: 14,
  },

  locationIcon: {
    fontSize: 60,
    marginVertical: 20,
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#4A90E2',
    textAlign: 'center',
    fontSize: 14,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  screenSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 30,
  },
  formContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 10,
    fontWeight: '600',
  },
  inputButton: {
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  inputButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  inputButtonOutline: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputButtonOutlineText: {
    color: '#2C3E50',
    fontSize: 16,
  },
  ageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ageButton: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  ageButtonActive: {
    backgroundColor: '#FFB74D',
    borderColor: '#FFB74D',
  },
  ageButtonText: {
    color: '#2C3E50',
    fontSize: 14,
  },
  ageButtonTextActive: {
    color: '#FFF',
  },
  workTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  workTypeCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  workTypeCardActive: {
    borderWidth: 3,
    borderColor: '#2C3E50',
  },
  workTypeIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  workTypeLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  skipButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFF',
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  skipButtonText: {
    color: '#7F8C8D',
    fontSize: 16,
  },
  finishButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#5CB85C',
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
  },
  locationText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2C3E50',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: 45,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  otpCheckButton: {
    width: 50,
    height: 50,
    backgroundColor: '#5CB85C',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpCheckText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  otpHelperText: {
    textAlign: 'center',
    color: '#7F8C8D',
    fontSize: 14,
    marginBottom: 30,
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subGreeting: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 5,
  },
  menuIcon: {
    fontSize: 28,
    color: '#2C3E50',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  searchIcon: {
    fontSize: 20,
    color: '#4A90E2',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  tab: {
    alignItems: 'center',
    padding: 10,
  },


  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    marginTop: 10,
  },
  subTitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 15,
  },
 
  jobCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  jobBadge: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  jobBadgeText: {
    color: '#FF6B6B',
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobLocation: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  jobSkills: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 3,
  },
  jobPayment: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5CB85C',
    marginTop: 5,
  },
  jobDuration: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 3,
  },
  jobCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  jobTiming: {
    fontSize: 13,
    color: '#7F8C8D',
  },
  acceptButton: {
    backgroundColor: '#5CB85C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  acceptButtonSmall: {
    backgroundColor: '#5CB85C',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  acceptButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusBadge: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  mapPlaceholder: {
    backgroundColor: '#E8F4F8',
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  mapIcon: {
    fontSize: 40,
    marginHorizontal: 20,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#4A90E2',
    width: 24,
  },


  tabRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },


  illustrationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  illustrationIcon: {
    fontSize: 60,
    marginHorizontal: 20,
  },
  linkButton: {
    alignItems: 'center',
    padding: 15,
  },
  linkButtonText: {
    color: '#4A90E2',
    fontSize: 14,
  },
  detailCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 8,
  },
  ratingStars: {
    marginTop: 5,
  },
  workerCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  workerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 3,
  },
  workerRole: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 3,
  },
  workerExp: {
    fontSize: 13,
    color: '#7F8C8D',
  },
  ratingBadge: {
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  shortlistButton: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  shortlistButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },

  statCardPrimary: {
    flex: 1,
    backgroundColor: '#4A90E2',
    padding: 18,
    borderRadius: 18,
    marginRight: 8,

    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  statCardSecondary: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 18,
    marginLeft: 8,

    borderWidth: 1,
    borderColor: '#eee',

    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  statLabel: {
    fontSize: 13,
    color: '#E0E7FF',
    marginTop: 6,
  },

  statNumberDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },

  statLabelDark: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
  },

  homeTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  homeTopBarLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  homeTopBarRight: {
    flexDirection: 'row',
    gap: 8,
  },
  homeAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeAvatarEmoji: { fontSize: 24 },
  homeNamaste: { fontSize: 14, color: '#7F8C8D' },
  homeWorkerName: { fontSize: 20, fontWeight: '700', color: '#2C3E50', lineHeight: 26 },
  homeLocation: { fontSize: 14, color: '#7F8C8D', marginTop: 2 },
  homeIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIconBtnText: { fontSize: 20 },
 
  // ── Stats row ──
  homeStatsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  homeStatCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    padding: 14,
  },
  homeStatCardPrimary: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  homeStatNum: { fontSize: 24, fontWeight: '700'},
  homeStatNumPrimary: { color: '#fff' },
  homeStatNumDark: { color: '#2C3E50' },
  homeStatLbl: { fontSize: 13, marginTop: 4 },
  homeStatLblPrimary: { color: '#B5D4F4' },
  homeStatLblDark: { color: '#7F8C8D'},
  homeStatSub: { fontSize: 12, marginTop: 4 },
  homeStatSubPrimary: { color: '#85B7EB' },
  homeStatSubDark: { color: '#3B6D11' },
 
  // ── Quick actions ──
  homeQaRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  homeQaCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    padding: 12,
    alignItems: 'center',
    gap: 8,
  },
  homeQaIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeQaIconText: { fontSize: 24 },
  homeQaLabel: { fontSize: 13, color: '#7F8C8D', fontWeight: '600' },
 
  // ── Section header ──
  homeSectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  homeCountBadge: {
    backgroundColor: '#E8F4FF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  homeCountBadgeText: { fontSize: 13, color: '#185FA5', fontWeight: '600' },
 
  // ── Ongoing job card ──
  ongoingJobCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  ongoingJobAccent: { width: 5 },
  ongoingJobBody: { flex: 1, padding: 15 },
  ongoingJobTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ongoingJobTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  ongoingJobTitle: { fontSize: 18, fontWeight: '700', color: '#2C3E50' },
  ongoingJobLoc: { fontSize: 14, color: '#7F8C8D' },
  ongoingJobPayCol: { alignItems: 'flex-end', marginLeft: 8 },
  ongoingJobPay: { fontSize: 18, fontWeight: '700', color: '#5CB85C' },
  ongoingJobDur: { fontSize: 13, color: '#7F8C8D', marginTop: 3 },
  ongoingJobMeta: { fontSize: 14, color: '#7F8C8D', marginBottom: 3 },
 
  // ── Status badge ──
  jobStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 5,
  },
  jobStatusDot: { width: 7, height: 7, borderRadius: 4 },
  jobStatusBadgeText: { fontSize: 13, fontWeight: '600' },
 
  // ── Job card action buttons ──
  ongoingJobActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  jobBtnGhost: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  jobBtnGhostText: { fontSize: 14, color: '#2C3E50', fontWeight: '600' },
  jobBtnDone: {
    flex: 1,
    backgroundColor: '#EAF3DE',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  jobBtnDoneText: { fontSize: 14, color: '#27500A', fontWeight: '700' },
  
   workTypeCheckBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workTypeCheckText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  otherWorkInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2C3E50',
  },



  // ── Worker Review Screen ──
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginRight: 12,
  },
 
  // Overall card
  overallCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
  },
  overallLeft: {
    alignItems: 'center',
    marginRight: 20,
    minWidth: 80,
  },
  overallScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2C3E50',
    lineHeight: 56,
  },
  overallTotal: {
    fontSize: 11,
    color: '#7F8C8D',
    marginTop: 4,
    textAlign: 'center',
  },
  overallRight: {
    flex: 1,
  },
 
  // Rating bar
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  barLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    width: 28,
  },
  barTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: 6,
    backgroundColor: '#FFC107',
    borderRadius: 3,
  },
  barCount: {
    fontSize: 12,
    color: '#7F8C8D',
    width: 16,
    textAlign: 'right',
  },
 
  // Review card
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  clientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  clientAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  clientName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 3,
  },
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobType: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
  },
  metaDot: {
    fontSize: 12,
    color: '#7F8C8D',
    marginHorizontal: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  ratingNum: {
    fontSize: 11,
    color: '#7F8C8D',
    marginTop: 2,
  },
  reviewComment: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },
  



  // ─────────────────────────────────────────────────────────────────────────────
// ADD THESE TO YOUR commonStyles.js StyleSheet.create({ ... }) block
// ─────────────────────────────────────────────────────────────────────────────

  // ── Job progress tracker ──
  rateProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rateStepCol: {
    alignItems: 'center',
  },
  rateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  rateCircleDone: {
    borderColor: '#5CB85C',
    backgroundColor: '#5CB85C',
  },
  rateCircleCheckText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  rateCircleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },
  rateStepLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  rateProgressLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 6,
    marginBottom: 22,
  },

  // ── Star rating ──
  rateStarsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  rateStar: {
    fontSize: 40,
    marginRight: 8,
  },
  rateStarActive: {
    color: '#FFC107',
  },
  rateStarInactive: {
    color: '#E0E0E0',
  },

  // ── Experience buttons ──
  rateExpRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  rateExpBtn: {
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  rateExpBtnActive: {
    borderColor: '#4A90E2',
    backgroundColor: '#EAF3FB',
  },
  rateExpBtnText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '600',
  },
  rateExpBtnTextActive: {
    color: '#4A90E2',
  },
});


export default styles;
