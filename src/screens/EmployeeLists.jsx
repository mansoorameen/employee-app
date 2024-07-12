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
import Loading from '../components/Loading';

const EmployeeLists = ({route, navigation}) => {
  const refresh = route?.params?.refresh;
  const [employees, setEmployees] = useState([]);
  const [isListLoading, setIsListLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchEmployees(refresh);
  }, []);

  const fetchEmployees = async refresh => {
    console.log('fetch');
    // saving the api data so to remove unnecessary api calls
    const cachedEmployees = await AsyncStorage.getItem('employees');
    if (!refresh && cachedEmployees) {
      console.log('cachedEmployees', cachedEmployees);

      setEmployees(JSON.parse(cachedEmployees));
    } else {
      try {
        await AsyncStorage.removeItem('employees');
        setIsListLoading(true);
        const response = await axios.get(
          'https://dummy.restapiexample.com/api/v1/employees',
        );
        console.log('response', response.data.data);

        setEmployees(response.data.data);
        await AsyncStorage.setItem(
          'employees',
          JSON.stringify(response.data.data),
        );
        setIsListLoading(false);
      } catch (error) {
        setIsListLoading(false);
        Alert.alert(error.response.data.message);
      }
    }
  };

  const createEmployee = async () => {
    setIsCreateLoading(true);

    const dummy = {
      name: 'cena',
      age: 20,
      salary: 10000,
    };
    try {
      const response = await axios.post(
        `https://dummy.restapiexample.com/api/v1/create`,
        dummy,
      );
      console.log('response', response);
      // setEmployee(response.data.data);
      setIsCreateLoading(false);
      fetchEmployees('refresh');
    } catch (error) {
      setIsCreateLoading(false);

      Alert.alert(error.response.data.message);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    Object.values(employee).some(value =>
      String(value).toLowerCase().includes(search.toLowerCase()),
    ),
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('EmployeeDetails', {employeeId: item.id})
      }>
      <Text style={styles.txtColor}>{item.employee_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search employees..."
          value={search}
          onChangeText={setSearch}
        />
        {/* refresh button to call api and fetch data if needed*/}
        <TouchableOpacity
          style={styles.refreshBtn}
          onPress={() => fetchEmployees('refresh')}>
          <Text style={styles.refreshTxt}>Refresh</Text>
        </TouchableOpacity>
      </View>
      {isListLoading ? (
        <Loading />
      ) : (
        <>
          <TouchableOpacity style={styles.createBtn} onPress={createEmployee}>
            <Text style={styles.refreshTxt}>
              {isCreateLoading ? 'Creating...' : 'Create New'}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={filteredEmployees}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={<Empty />}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  head: {
    flexDirection: 'row',
    height: 40,
    gap: 5,
    marginBottom: 5,
  },
  refreshBtn: {
    backgroundColor: 'darkgreen',
    padding: 10,
  },
  createBtn: {
    backgroundColor: 'skyblue',
    padding: 10,
  },
  refreshTxt: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  txtColor: {
    color: 'black',
  },
});

export default EmployeeLists;
