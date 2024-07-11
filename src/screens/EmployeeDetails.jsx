import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import Empty from '../components/Empty';

const EmployeeDetails = ({route}) => {
  const {employeeId} = route?.params;
  console.log('employeeId', employeeId);

  const [employee, setEmployee] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  useEffect(() => {
    console.log('here');
    if (employeeId) fetchEmployeeDetails();
  }, [employeeId]);

  const fetchEmployeeDetails = useCallback(async () => {
    console.log('inside');
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
      console.log('error', error.response?.data?.message);
    }
  }, [employeeId]);

  return (
    <View style={styles.container}>
      {isDetailsLoading ? (
        <Text>Loading...</Text>
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
