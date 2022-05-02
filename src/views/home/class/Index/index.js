import React, { useState } from 'react';
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

const HomeClassIndexView = props => {
  const [options, setOptions] = useState(optionsData);
  const [users, setUsers] = useState(props.students);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [routine, setRoutine] = useState('');
  const [today, setToday] = useState(new Date().getFullYear() + '/' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '/' + new Date().getDate().toString().padStart(2, '0'));
  const onRefresh = () => { };

  const onRenderUsersData = ({ item }) => {
    return (
      <View
        style={{ backgroundColor: colors.whiteText, borderRadius: 15, elevation: 2, marginBottom: 15, paddingHorizontal: 25, paddingVertical: 20, marginHorizontal: 10 }}>
        <View style={{}}>
          <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center', }}>
            <Text style={{ color: colors.darkText, fontFamily: 'Montserrat-Bold', fontSize: 15, }}>{item.name} {item.lastName}{' '} </Text>
            <Text style={{ color: '#D3D3D3', fontFamily: 'Montserrat-Bold' }}> {item.birthday} </Text>
          </View>
          <Text
            style={{ color: colors.darkText, fontFamily: 'Montserrat-SemiBold', fontSize: 15, }}> Rutina: {item.routine ? item.routine : 'sin asignar' } </Text>
        </View>
        <View style={{ position: 'absolute', top: 15, right: 20 }}>
          <Menu>
            <MenuTrigger>
              <Image style={{ height: 24, width: 24, tintColor: colors.darkText }} source={require('../../../../../assets/icons/dots.png')} resizeMode={'contain'} />
            </MenuTrigger>
            <MenuOptions customStyles={{ optionWrapper: { padding: 15, }, optionText: { fontSize: 16, color: colors.darkText, }, }}>
              <MenuOption onSelect={() => setModalVisible(true)} text="Asignar rutina de hoy"
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
            <Text style={{ color: colors.darkText, fontFamily: 'Montserrat-ExtraBold', marginBottom: 15, fontSize: 16, }}> Asignar rutina de hoy
            </Text>
            <Text style={{ color: colors.darkText, alignSelf: 'center', fontFamily: 'Montserrat-SemiBold', marginBottom: 5, }}>  </Text>
            <Picker
              selectedValue={routine}
              onValueChange={(itemValue, itemIndex) => {
                setRoutine(itemValue);
                console.log(itemValue);
              }}
              prompt={'Seleccionar rutina'}
              style={{
                color: colors.darkText,
                backgroundColor: '#F5F5F5',
                marginBottom: 15,
              }}
              mode={'dropdown'}
              dropdownIconColor={colors.darkText}>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ backgroundColor: '#50C878', borderRadius: 2, padding: 10, alignItems: 'center', }}>
              <Text style={{ color: colors.whiteText, fontFamily: 'Montserrat-Bold', }}> Guardar </Text>
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
