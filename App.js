import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import RootStack from './src/navigation/stacks/RootStack';
import auth from '@react-native-firebase/auth';
import AuthContext from './src/utils/context/AuthContext';

const App = () => {
  return (
    <AuthContext.Provider value={auth}>
      <RootStack />
    </AuthContext.Provider>
  );
};

export default App;