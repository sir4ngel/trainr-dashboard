import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  Modal,
  Alert,
  Pressable,
  ToastAndroid
} from 'react-native';
import colors from '../../../../../assets/Colors';
import optionsData from '../../../../../assets/data/OptionsData';
import usersData from '../../../../../assets/data/UsersData';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Picker } from '@react-native-picker/picker';
import classroomHandler from '../../../../utils/handlers/ClassroomHandler';
import { CredentialsContext } from '../../../../utils/context/CredentialsContext';
import routineHandler from '../../../../utils/handlers/RoutineHandler';

const HomeClassIndexView = props => {
  const [options, setOptions] = useState(optionsData);
  const [users, setUsers] = useState(props.students);
  const [student, setStudent] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [routine, setRoutine] = useState("");
  const [today, setToday] = useState(new Date().getFullYear() + '/' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '/' + new Date().getDate().toString().padStart(2, '0'));

  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  useEffect(() => {
    onGetUsers();
    return () => {

    }
  }, []);

  const onGetUsers = async () => {
    const usersData = await classroomHandler.onGetStudents(props.id, storedCredentials.token);
    if (usersData.status) {
      if (usersData.status !== 'SUCCESS') {
        ToastAndroid.show(usersData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      } else {
        setUsers(usersData.data)
        // console.log(usersData);
      }
    } else {
      ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      console.log(usersData);
    }
  };

  const onRefresh = () => {
    onGetUsers();
  };

  const onGetRoutines = async (id) => {
    const routineData = await routineHandler.onGetRoutines(storedCredentials.user.id, storedCredentials.token);
    if (routineData.status) {
      if (routineData.status !== 'SUCCESS') {
        ToastAndroid.show(routineData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      } else {
        setRoutines(routineData.data);
        setStudent(id);
        console.log(routineData);
      }
    } else {
      ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      console.log(routineData);
    }
  };

  const onHandleSaveButton = async () => {
    if (!routine) {
      ToastAndroid.show('Selecciona una rutina', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
    } else {
      const routineData = await routineHandler.onGetRoutineExercises(routine, storedCredentials.token);
      if (routineData.status) {
        if (routineData.status !== 'SUCCESS') {
          ToastAndroid.show(routineData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
          setModalVisible(!modalVisible)
        } else {
          onSetRoutineToStudent(routineData);
          // console.log(routineData);
        }
      } else {
        ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        console.log(routineData);
        setModalVisible(!modalVisible)
      }
    }
  };

  const onSetRoutineToStudent = async (exercisesData) => {
    const data = {
      user_id: student,
      routine_id: routine,
      classroom_id: props.id,
      name: exercisesData.name,
      exercises: exercisesData.data,
      date: today
    };

    const routineData = await routineHandler.onSetRoutineToStudent(data, storedCredentials.token);
    if (routineData.status) {
      if (routineData.status !== 'SUCCESS') {
        ToastAndroid.show(routineData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        setModalVisible(!modalVisible)
      } else {
        ToastAndroid.show(routineData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        setModalVisible(!modalVisible)
      }
    } else {
      ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
      console.log(routineData);
      setModalVisible(!modalVisible)
    }
  };

  const onRenderUsersData = ({ item }) => {
    return (
      <View
        style={{ backgroundColor: colors.white, borderRadius: 15, elevation: 2, marginBottom: 15, paddingHorizontal: 25, paddingVertical: 20, marginHorizontal: 10 }}>
        <View style={{}}>
          <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center', }}>
            <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Bold', fontSize: 15, }}>{item.first_name} {item.last_name}{' '} </Text>
            <Text style={{ color: '#D3D3D3', fontFamily: 'Montserrat-Bold' }}> {item.birthday} </Text>
          </View>
        </View>
        <View style={{ position: 'absolute', top: 15, right: 20 }}>
          <Menu>
            <MenuTrigger>
              <Image style={{ height: 24, width: 24, tintColor: colors.primaryTitle }} source={require('../../../../../assets/icons/dots.png')} resizeMode={'contain'} />
            </MenuTrigger>
            <MenuOptions customStyles={{ optionWrapper: { padding: 15, }, optionText: { fontSize: 16, color: colors.primaryTitle, }, }}>
              <MenuOption onSelect={() => {
                setModalVisible(true);
                onGetRoutines(item.id);
              }} text="Asignar rutina de hoy"
              />
              <MenuOption onSelect={() => props.navigation.navigate('HomeClassSettingsView')} text="Dar de baja" />
            </MenuOptions>
          </Menu>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} translucent={false}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible); }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Pressable onPress={() => setModalVisible(!modalVisible)} style={{ height: '100%', width: '100%', backgroundColor: '#000000AA', }} />
          <View style={{ backgroundColor: colors.background, borderRadius: 5, elevation: 5, padding: 30, position: 'absolute', alignSelf: 'center', }}>
            <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-ExtraBold', marginBottom: 15, fontSize: 16, }}> Asignar rutina de hoy
            </Text>
            <Text style={{ color: colors.primaryTitle, alignSelf: 'center', fontFamily: 'Montserrat-SemiBold', marginBottom: 5, }}> {today} </Text>
            <Picker
              selectedValue={routine}
              onValueChange={(itemValue, itemIndex) => {
                setRoutine(itemValue);
                // console.log(itemValue);
              }}
              prompt={'Seleccionar rutina'}
              style={{
                color: colors.primaryTitle,
                backgroundColor: '#F5F5F5',
                marginBottom: 15,
              }}
              mode={'dropdown'}
              dropdownIconColor={colors.primaryTitle}>
              {
                routines.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.id} />
                ))
              }
            </Picker>
            <TouchableOpacity onPress={() => onHandleSaveButton()} style={{ backgroundColor: colors.primaryTitle, borderRadius: 2, padding: 10, alignItems: 'center', }}>
              <Text style={{ color: colors.white, fontFamily: 'Montserrat-Bold', }}> Guardar </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        style={{ marginTop: 20, }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        data={users}
        renderItem={onRenderUsersData}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeClassIndexView;
