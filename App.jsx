// App.jsx
import React from 'react';
import { UserProvider }        from './src/context/UserContext';
import { TranslationProvider } from './src/context/TranslationContext';
import AppNavigator            from './src/navigation/AppNavigator';
 
const App = () => (
  <UserProvider>
    <TranslationProvider>
      <AppNavigator />
    </TranslationProvider>
  </UserProvider>
);
 
export default App;
 