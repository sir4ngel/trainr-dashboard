import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';
import colors from '../../../../assets/Colors';
import firestore from '@react-native-firebase/firestore';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';
import { ClassroomContext } from '../../../utils/context/ClassroomContext';

const HomeAddView = (props) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const { user, setUser } = useContext(CredentialsContext);
    const { classrooms, setClassrooms } = useContext(ClassroomContext)

    const onHandleTextInput = (type, value) => {
        if (type === 0) {
            setName(value);
        } else {
            setType(value);
        };
    };

    const onCreateClassroom = () => {
        if (!name) {
            ToastAndroid.show('Escribe un nombre para continuar', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else if (!type) {
            ToastAndroid.show('Escribe un tipo de clase para continuar', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else {
            firestore()
                .collection('Classrooms')
                .add({
                    name: name,
                    type: type,
                    teacher: user.authData.uid,
                    students: []
                })
                .then(() => {
                    ToastAndroid.show('Clase creada correctamente', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                    onGetClassRooms()
                    props.navigation.goBack();
                })
                .catch((error) => {
                    console.log(error);
                    props.navigation.goBack();
                });
        };
    };

    const onGetClassRooms = () => {
        firestore()
            .collection('Classrooms')
            .where('teacher', '==', user.authData.uid)
            .get()
            .then(querySnapshot => {
                // console.log(querySnapshot._docs[0]._data.students);
                setClassrooms(querySnapshot._docs);
            })
            .catch((error) => console.log(error));
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 }}>
                    <TouchableOpacity onPress={props.navigation.goBack} style={{ height: 30, width: 30, backgroundColor: colors.whiteText, borderRadius: 15, elevation: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: '70%', width: '70%' }} source={require('../../../../assets/icons/close.png')} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onCreateClassroom} style={{ backgroundColor: '#50C878', borderRadius: 5, elevation: 5, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                        <Text style={{ color: colors.whiteText, fontFamily: 'Montserrat-ExtraBold' }}>Crear</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginBottom: 20, color: colors.darkText, fontSize: 25, fontFamily: 'Montserrat-ExtraBold' }}>Crear una clase</Text>
                <TextInput onChangeText={(value) => onHandleTextInput(0, value)} style={{ borderWidth: 1, backgroundColor: '#F3F3F3', borderColor: '#F5F5F5', paddingHorizontal: 20, color: colors.darkText, fontFamily: 'Montserrat-Medium' }} placeholder={'Nombre de la clase'} placeholderTextColor={'gray'} />
                <Text style={{ color: colors.darkText, fontFamily: 'Montserrat-Regular', marginBottom: 20 }}>e.j. El nombre de tu gimnasio, Nombre del equipo, Nombre privado de tu clase.</Text>
                <TextInput onChangeText={(value) => onHandleTextInput(1, value)} style={{ borderWidth: 1, backgroundColor: '#F3F3F3', borderColor: '#F5F5F5', paddingHorizontal: 20, color: colors.darkText, fontFamily: 'Montserrat-Medium' }} placeholder={'Tipo de clase'} placeholderTextColor={'gray'} />
                <Text style={{ color: colors.darkText, fontFamily: 'Montserrat-Regular' }}>ej. Gimnasio, Calistenia, Danza, CrossFit etc...</Text>
            </View>
        </View>
    );
};

export default HomeAddView;
