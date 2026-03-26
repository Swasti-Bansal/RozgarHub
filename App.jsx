// App.js
import React from 'react';
import { TranslationProvider } from './src/context/TranslationContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => (
  <TranslationProvider>
    <AppNavigator />
  </TranslationProvider>
);

export default App;
