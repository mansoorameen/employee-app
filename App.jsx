import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import EmployeeLists from './src/screens/EmployeeLists';
import EmployeeDetails from './src/screens/EmployeeDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="EmployeeList" component={EmployeeLists} />
      <Tab.Screen
        name="EmployeeDetails"
        component={EmployeeDetails}
        listeners={{
          tabPress: e => {
            e.preventDefault(); // <-- this function blocks navigating to screen
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="BottomNav" component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
