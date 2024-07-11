import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import Empty from '../components/Empty';
import Loading from '../components/Loading';
import {useFocusEffect} from '@react-navigation/native';

const EmployeeDetails = ({route}) => {
  const {employeeId} = route?.params;

  const [employee, setEmployee] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchEmployeeDetails();

      return () => {
        setEmployee(null);
      };
    }, []),
  );

  const fetchEmployeeDetails = async () => {
    setIsDetailsLoading(true);
    try {
      const response = await axios.get(
        `https://dummy.restapiexample.com/api/v1/employee/${employeeId}`,
      );
      console.log('response', response);
      setEmployee(response.data.data);
      setIsDetailsLoading(false);
    } catch (error) {
      setIsDetailsLoading(false);

      Alert.alert('Oops, some error occured. Please try again');
    }
  };

  return (
    <View style={styles.container}>
      {isDetailsLoading ? (
        <Loading />
      ) : employee?.id ? (
        <>
          <Text>Name: {employee.employee_name}</Text>
          <Text>Age: {employee.employee_age}</Text>
          <Text>Salary: {employee.employee_salary}</Text>
        </>
      ) : (
        <Empty />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default EmployeeDetails;
