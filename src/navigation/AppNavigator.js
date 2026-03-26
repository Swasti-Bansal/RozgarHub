// src/navigation/AppNavigator.js
// Updated — adds OTPVerifyScreen and checks auth state on launch

import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import WelcomeScreen    from '../screens/WelcomeScreen';
import OTPVerifyScreen  from '../screens/OTPVerifyScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import AboutWorkScreen  from '../screens/AboutWorkScreen';
import LoginScreen      from '../screens/LoginScreen';
import HomeScreen       from '../screens/HomeScreen';
import HereJobScreen    from '../screens/HereJobScreen';
import RateJobScreen    from '../screens/RateJobScreen';
import JobDetailFullScreen from '../screens/JobDetailFullScreen';
import JobHistoryScreen    from '../screens/JobHistoryScreen';
import ReviewScreen    from '../screens/ReviewScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      if (initializing) setInitializing(false);
    });
    return unsubscribe; // cleanup on unmount
  }, []);

  // Show spinner while Firebase resolves the auth state
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F7FA' }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />
      <Stack.Navigator
        // If user is already logged in, go straight to Home
        initialRouteName={user ? 'Home' : 'Welcome'}
        screenOptions={{
          headerStyle: { backgroundColor: '#4A90E2' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* ── Auth Screens ── */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPVerify"
          component={OTPVerifyScreen}
          options={{ headerShown: false }}
        />

        {/* ── Onboarding Screens (shown once after first login) ── */}
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutWork"
          component={AboutWorkScreen}
          options={{ headerShown: false }}
        />

        {/* ── Legacy Login (keep if still needed, or remove) ── */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* ── Main App Screens ── */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HereJob"
          component={HereJobScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RateJob"
          component={RateJobScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="JobDetailFull" 
          component={JobDetailFullScreen}
          options={{ headerShown: false }}
          />
        <Stack.Screen
          name="JobHistory"    
          component={JobHistoryScreen}    
          options={{ headerShown: false }} 
         />
         <Stack.Screen
          name="Review"    
          component={ReviewScreen}    
          options={{ headerShown: false }} 
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
