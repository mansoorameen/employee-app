import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Empty from '../components/Empty';

const EmployeeList = ({navigation}) => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    console.log('fetch');
    try {
      const cachedEmployees = await AsyncStorage.getItem('employees');
      if (cachedEmployees) {
        console.log('cachedEmployees', cachedEmployees);

        setEmployees(JSON.parse(cachedEmployees));
      } else {
        const response = await axios.get(
          'https://dummy.restapiexample.com/api/v1/employees',
        );
        console.log('response', response.data.data);

        setEmployees(response.data.data);
        await AsyncStorage.setItem(
          'employees',
          JSON.stringify(response.data.data),
        );
      }
    } catch (error) {
      Alert.alert('Oops, some error occured. Please try again');
      console.log('error', error.response?.data?.message);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    Object.values(employee).some(value =>
      String(value).toLowerCase().includes(search.toLowerCase()),
    ),
  );

  const renderItem = ({item}) => {
    // console.log('item', item);
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('EmployeeDetails', {employeeId: item.id})
        }>
        <Text>{item.employee_name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search employees..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredEmployees}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Empty />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default EmployeeList;
