// src/context/UserContext.js
// Holds the profile the user fills in during onboarding (GetStartedScreen).
// Wrap your app with <UserProvider> (already done in App.jsx via the example below).
// Any screen can call useUser() to read or update the profile.
//
// Usage in App.jsx:
//   import { UserProvider } from './src/context/UserContext';
//   const App = () => (
//     <UserProvider>
//       <TranslationProvider>
//         <AppNavigator />
//       </TranslationProvider>
//     </UserProvider>
//   );

import React, { createContext, useContext, useState, useCallback } from 'react';

const DEFAULT_PROFILE = {
  name:          '',           // "Rajan Kumar" — used everywhere
  role:          '',           // 'worker' | 'employer'
  age:           '',           // '18-25' | '26-40' | '41+'
  location:      null,         // { lat: number, lng: number } | null
  locationLabel: '',           // human-readable address / coords string
};

const UserContext = createContext({
  profile: DEFAULT_PROFILE,
  setProfile: () => {},
  updateProfile: () => {},
});

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  // Merge a partial update — call like: updateProfile({ name: 'Rajan' })
  const updateProfile = useCallback((patch) => {
    setProfile(prev => ({ ...prev, ...patch }));
  }, []);

  return (
    <UserContext.Provider value={{ profile, setProfile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
