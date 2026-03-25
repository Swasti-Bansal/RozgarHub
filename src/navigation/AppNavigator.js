// src/navigation/AppNavigator.js
import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { useUser } from '../context/UserContext';

import WelcomeScreen       from '../screens/WelcomeScreen';
import OTPVerifyScreen     from '../screens/OTPVerifyScreen';
import GetStartedScreen    from '../screens/GetStartedScreen';
import AboutWorkScreen     from '../screens/AboutWorkScreen';
import LoginScreen         from '../screens/LoginScreen';
import HomeScreen          from '../screens/HomeScreen';
import EmployerHomeScreen  from '../screens/EmployerHomeScreen';   // ← NEW
import HereJobScreen       from '../screens/HereJobScreen';
import RateJobScreen       from '../screens/RateJobScreen';
import ActiveJobsScreen    from '../screens/ActiveJobsScreen';
import JobDetailScreen     from '../screens/JobDetailScreen';
import JobDetailFullScreen from '../screens/JobDetailFullScreen';
import JobHistoryScreen    from '../screens/JobHistoryScreen';
import FindWorkersScreen   from '../screens/FindWorkersScreen';    // ← registered (was missing)

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user,         setUser]         = useState(null);
  const { profile }                     = useUser();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F6FF' }}>
        <ActivityIndicator size="large" color="#1A6BCC" />
      </View>
    );
  }

  // ── After login, route to the correct home based on role ─────────
  // If profile.role is already set (returning user), go straight to the
  // right home. Otherwise start the onboarding flow.
  const getInitialRoute = () => {
    if (!user) return 'Welcome';
    if (profile.role === 'employer') return 'EmployerHome';
    if (profile.role === 'worker')   return 'Home';
    return 'GetStarted';   // logged in but hasn't completed onboarding yet
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6FF" />
      <Stack.Navigator
        initialRouteName={getInitialRoute()}
        screenOptions={{
          headerStyle:      { backgroundColor: '#1A6BCC' },
          headerTintColor:  '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* ── Auth ── */}
        <Stack.Screen name="Welcome"   component={WelcomeScreen}   options={{ headerShown: false }} />
        <Stack.Screen name="OTPVerify" component={OTPVerifyScreen} options={{ headerShown: false }} />

        {/* ── Onboarding ── */}
        <Stack.Screen name="GetStarted" component={GetStartedScreen} options={{ title: "Let's Get Started" }} />
        <Stack.Screen name="AboutWork"  component={AboutWorkScreen}  options={{ title: 'About Your Work' }} />

        {/* ── Legacy (keep until fully removed) ── */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />

        {/* ── Worker home & screens ── */}
        <Stack.Screen name="Home"       component={HomeScreen}       options={{ headerShown: false }} />
        <Stack.Screen name="HereJob"    component={HereJobScreen}    options={{ title: 'Available Jobs' }} />
        <Stack.Screen name="RateJob"    component={RateJobScreen}    options={{ title: 'Rate the Job' }} />
        <Stack.Screen name="ActiveJobs" component={ActiveJobsScreen} options={{ title: 'My Active Jobs' }} />
        <Stack.Screen name="JobDetail"  component={JobDetailScreen}  options={{ title: 'Job Details' }} />
        <Stack.Screen name="JobDetailFull" component={JobDetailFullScreen} options={{ headerShown: false }} />
        <Stack.Screen name="JobHistory"    component={JobHistoryScreen}    options={{ headerShown: false }} />

        {/* ── Employer home & screens ── */}
        <Stack.Screen
          name="EmployerHome"
          component={EmployerHomeScreen}
          options={{ headerShown: false }}     // screen has its own top bar
        />
        <Stack.Screen
          name="FindWorkers"
          component={FindWorkersScreen}
          options={{ title: 'Find Workers' }}  // ← was missing before, now registered
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;