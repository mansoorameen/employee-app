import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import Empty from '../components/Empty';
import Loading from '../components/Loading';
import {useFocusEffect} from '@react-navigation/native';

const EmployeeDetails = ({route, navigation}) => {
  const {employeeId} = route?.params;

  const [employee, setEmployee] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [updateForm, setUpdateForm] = useState({});

  useFocusEffect(
    useCallback(() => {
      fetchEmployeeDetails();

      return () => {
        setUpdateForm({});
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
      setUpdateForm({
        name: response.data.data.employee_name,
        age: response.data.data.employee_age,
        salary: response.data.data.employee_salary,
      });
      setIsDetailsLoading(false);
    } catch (error) {
      console.log('error', error);

      setIsDetailsLoading(false);

      Alert.alert(error.response.data.message);
    }
  };

  const updateEmployee = async () => {
    setIsUpdateLoading(true);
    try {
      const response = await axios.put(
        `https://dummy.restapiexample.com/api/v1/update/${employeeId}`,
        updateForm,
      );
      console.log('response', response);
      setEmployee(response.data.data);
      setIsUpdateLoading(false);
    } catch (error) {
      setIsUpdateLoading(false);
      console.log('error', error);

      Alert.alert(error.response.data.message);
    }
  };

  const deleteEmployee = async () => {
    setIsUpdateLoading(true);
    try {
      const response = await axios.delete(
        `https://dummy.restapiexample.com/api/v1/delete/${employeeId}`,
      );
      console.log('response', response);

      setIsUpdateLoading(false);
      navigation.navigate('EmployeeList', {refresh: true});
    } catch (error) {
      console.log('error', error);

      setIsUpdateLoading(false);

      Alert.alert(error.response.data.message);
    }
  };

  const handleEdit = (key, e) => {
    setUpdateForm({...updateForm, [key]: e});
  };

  return (
    <View style={styles.container}>
      {isDetailsLoading ? (
        <Loading />
      ) : employee?.id ? (
        <View style={styles.body}>
          <View>
            <Text style={styles.txtColor}>Name</Text>
            <TextInput
              style={styles.input}
              value={updateForm?.name}
              onChangeText={e => handleEdit('name', e)}
            />
            <Text style={styles.txtColor}>Age</Text>
            <TextInput
              style={styles.input}
              value={updateForm?.age?.toString()}
              keyboardType="numeric"
              onChangeText={e => handleEdit('age', e)}
            />
            <Text style={styles.txtColor}>Salary</Text>
            <TextInput
              style={styles.input}
              value={updateForm.salary?.toString()}
              keyboardType="numeric"
              onChangeText={e => handleEdit('salary', e)}
            />
          </View>
          {isUpdateLoading ? <Loading /> : null}
          <View style={styles.crudBtns}>
            <TouchableOpacity style={styles.editBtn} onPress={updateEmployee}>
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={deleteEmployee}>
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  body: {
    justifyContent: 'space-between',
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },

  crudBtns: {
    gap: 10,
    flexDirection: 'row',
  },
  editBtn: {
    padding: 10,
    backgroundColor: 'lightblue',
    flex: 1,
  },
  deleteBtn: {
    padding: 10,
    backgroundColor: 'red',
    flex: 1,
  },
  btnText: {
    textAlign: 'center',
    fontWeight: '700',
  },
  txtColor: {
    color: 'black',
  },
});

export default EmployeeDetails;
