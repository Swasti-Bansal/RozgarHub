import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/commonStyles';
import Header from '../components/Header';
 
// ── Sample data — replace with real DB data later ──
const reviewData = {
  overallRating: 4.8,
  totalReviews: 24,
  breakdown: [
    { stars: 5, count: 18 },
    { stars: 4, count: 4 },
    { stars: 3, count: 1 },
    { stars: 2, count: 1 },
    { stars: 1, count: 0 },
  ],
  reviews: [
    {
      id: '1',
      clientName: 'Rajesh Mehta',
      rating: 5,
      comment: 'Excellent work! Very professional and completed the job on time. Will definitely hire again.',
      jobType: 'Painting',
      date: '12 Mar 2025',
    },
    {
      id: '2',
      clientName: 'C3 Construction',
      rating: 5,
      comment: 'Great mason, very skilled and hardworking. Finished ahead of schedule.',
      jobType: 'Construction',
      date: '28 Feb 2025',
    },
    {
      id: '3',
      clientName: 'Sunita Sharma',
      rating: 4,
      comment: 'Good work overall. Minor touch-ups were needed but he handled it well.',
      jobType: 'Painting',
      date: '10 Feb 2025',
    },
    {
      id: '4',
      clientName: 'Anand Builders',
      rating: 5,
      comment: 'Very reliable and clean work. Would recommend to others.',
      jobType: 'Plumbing',
      date: '22 Jan 2025',
    },
    {
      id: '5',
      clientName: 'Priya Nair',
      rating: 3,
      comment: 'Work was okay but took longer than expected.',
      jobType: 'Electrical',
      date: '5 Jan 2025',
    },
  ],
};
 
const STAR_COLOR  = '#FFC107';
const EMPTY_STAR  = '#E0E0E0';
 
const renderStars = (rating, size = 16) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text
          key={i}
          style={{ fontSize: size, color: i <= rating ? STAR_COLOR : EMPTY_STAR }}
        >
          ★
        </Text>
      ))}
    </View>
  );
};
 
const RatingBar = ({ stars, count, total }) => {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <View style={styles.barRow}>
      <Text style={styles.barLabel}>{stars} ★</Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${pct}%` }]} />
      </View>
      <Text style={styles.barCount}>{count}</Text>
    </View>
  );
};
 
const ReviewCard = ({ review }) => (
  <View style={styles.reviewCard}>
    <View style={styles.reviewHeader}>
      <View style={styles.clientAvatar}>
        <Text style={styles.clientAvatarText}>
          {review.clientName.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.clientName}>{review.clientName}</Text>
        <View style={styles.reviewMeta}>
          <Text style={styles.jobType}>{review.jobType}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.reviewDate}>{review.date}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        {renderStars(review.rating, 14)}
        <Text style={styles.ratingNum}>{review.rating}.0</Text>
      </View>
    </View>
    <Text style={styles.reviewComment}>{review.comment}</Text>
  </View>
);
 
const ReviewScreen = ({ navigation }) => {
  const { overallRating, totalReviews, breakdown, reviews } = reviewData;
 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.screenContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <Header title="My Reviews" navigation={navigation} />
 
        {/* ── Overall rating card ── */}
        <View style={styles.overallCard}>
          <View style={styles.overallLeft}>
            <Text style={styles.overallScore}>{overallRating}</Text>
            {renderStars(Math.round(overallRating), 22)}
            <Text style={styles.overallTotal}>Based on {totalReviews} reviews</Text>
          </View>
          <View style={styles.overallRight}>
            {breakdown.map((item) => (
              <RatingBar
                key={item.stars}
                stars={item.stars}
                count={item.count}
                total={totalReviews}
              />
            ))}
          </View>
        </View>
 
        {/* ── Reviews list ── */}
        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>
          Client Reviews
        </Text>
 
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
 
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewScreen;