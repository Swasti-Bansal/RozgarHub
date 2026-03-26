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
import EmployerHomeScreen  from '../screens/EmployerHomeScreen';   
import HereJobScreen       from '../screens/HereJobScreen';
import RateJobScreen       from '../screens/RateJobScreen';
import JobDetailFullScreen from '../screens/JobDetailFullScreen';
import JobHistoryScreen    from '../screens/JobHistoryScreen';
import FindWorkersScreen   from '../screens/FindWorkersScreen';   
import PostJobScreen       from '../screens/PostJobScreen';       
import ReviewScreen    from '../screens/ReviewScreen';

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

  const getInitialRoute = () => {
    if (!user) return 'Welcome';
    if (profile.role === 'employer') return 'EmployerHome';
    if (profile.role === 'worker')   return 'Home';
    return 'GetStarted';   
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
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />

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
          name="EmployerHome"
          component={EmployerHomeScreen}
          options={{ headerShown: false }}   
        />
        <Stack.Screen
          name="FindWorkers"
          component={FindWorkersScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="PostJob"
          component={PostJobScreen}
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
