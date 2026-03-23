import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FindWorkersScreen from '../screens/FindWorkersScreen';
import PostJobScreen from '../screens/PostJobScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabIcon({ emoji, label, focused }) {
  return (
    <View style={tabStyles.icon}>
      <Text style={tabStyles.emoji}>{emoji}</Text>
      <Text style={[tabStyles.label, focused && tabStyles.labelActive]}>{label}</Text>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  icon: { alignItems: 'center', paddingTop: 6 },
  emoji: { fontSize: 22 },
  label: { fontSize: 10, marginTop: 2, color: '#9CA3AF', fontWeight: '600' },
  labelActive: { color: '#4A90E2' },
});

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopColor: '#E0E0E0',
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="FindWorkers"
        component={FindWorkersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="👷" label="Workers" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="PostJobTab"
        component={PostJobScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="📋" label="Post Job" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={MainTabs} />
      <Stack.Screen name="PostJob" component={PostJobScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}