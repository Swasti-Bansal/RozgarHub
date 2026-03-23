// src/screens/GetStartedScreen.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/commonStyles';

const GetStartedScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({ age: '' });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Let's get started</Text>
        <Text style={styles.screenSubtitle}>Fill in your details</Text>

        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Where do you work from?</Text>
          <TouchableOpacity style={styles.inputButton}>
            <Text style={styles.inputButtonText}>📍 Use current location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputButtonOutline}>
            <Text style={styles.inputButtonOutlineText}>📍 Select your area</Text>
          </TouchableOpacity>

          <Text style={[styles.inputLabel, { marginTop: 20 }]}>How old are you?</Text>
          <View style={styles.ageButtonContainer}>
            {['18-25', '26-40', '41+'].map((age) => (
              <TouchableOpacity
                key={age}
                style={[
                  styles.ageButton,
                  userData.age === age && styles.ageButtonActive,
                ]}
                onPress={() => setUserData({ ...userData, age })}
              >
                <Text style={[
                  styles.ageButtonText,
                  userData.age === age && styles.ageButtonTextActive,
                ]}>{age}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('AboutWork')}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GetStartedScreen;
