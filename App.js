import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import NoteAdd from './screens/NoteAdd';
import Details from './screens/Details';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar hidden />

      <Stack.Navigator
        screenOptions={{
          headerShown: true, // Show the header by default for all screens
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false, // Hide the header for the Home screen
          }}
        />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="NoteAdd" component={NoteAdd} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
