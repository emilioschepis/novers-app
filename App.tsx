import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import HomeScreen from './src/screens/home/HomeScreen';
import PackagesContext from './src/state/PackagesContext';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);

  async function addName(name: string) {
    await AsyncStorage.setItem('saved_packages', [...names, name].join(','));
    setNames((current) => [...current, name]);
  }

  async function removeName(name: string) {
    await AsyncStorage.setItem('saved_packages', names.filter((n) => n !== name).join(','));
    setNames((current) => current.filter((n) => n !== name));
  }

  async function loadPackages() {
    const packages = await AsyncStorage.getItem('saved_packages');
    if (packages === null) {
      return;
    }

    setNames(packages.split(','));
  }

  useEffect(() => {
    loadPackages();
  }, []);

  return (
    <PackagesContext.Provider value={{ names, addName, removeName }}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PackagesContext.Provider>
  );
};

export default App;
