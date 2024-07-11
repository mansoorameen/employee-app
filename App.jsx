import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import EmployeeList from './src/screens/EmployeeLists';
import EmployeeDetails from './src/screens/EmployeeDetails';
import {Text, TouchableOpacity} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="EmployeeList" component={EmployeeList} />
      <Tab.Screen
        name="EmployeeDetails"
        component={EmployeeDetails}
        listeners={{
          tabPress: e => {
            // add your conditions here
            e.preventDefault(); // <-- this function blocks navigating to screen
          },
        }}
        // options={{
        //   tabBarButton: props => (
        //     <TouchableOpacity
        //       {...props}
        //       onPress={() => {
        //         if (isDetailsTabAccessible) {
        //           props.onPress();
        //         } else {
        //           alert('Please select an employee from the list first.');
        //         }
        //       }}
        //       style={{opacity: isDetailsTabAccessible ? 1 : 0.5}}>
        //       <Text>EmployeeDetails</Text>
        //     </TouchableOpacity>
        //   ),
        // }}
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
        {/* <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
