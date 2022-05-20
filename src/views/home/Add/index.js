import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';
import colors from '../../../../assets/Colors';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';
import { ClassroomContext } from '../../../utils/context/ClassroomContext';
import classroomHandler from '../../../utils/handlers/ClassroomHandler';

const HomeAddView = (props) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { classrooms, setClassrooms } = useContext(ClassroomContext)

    const onHandleTextInput = (type, value) => {
        if (type === 0) {
            setName(value);
        } else {
            setType(value);
        };
    };

    const onHandleCreateButton = () => {
        if (!name) {
            ToastAndroid.show('Escribe un nombre para continuar', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else if (!type) {
            ToastAndroid.show('Escribe un tipo de clase para continuar', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else {
            onCreateClassroom();
        };
    };

    const onCreateClassroom = async() => {
        const data = {
            name: name,
            type: type,
            code: Date.now() + Math.random(),
            user_id: storedCredentials.user.id
        };
        const classroomData = await classroomHandler.onCreateClassroom(data, storedCredentials.token);
        if (classroomData.status) {
            if (classroomData.status !== 'SUCCESS') {
                ToastAndroid.show(classroomData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                props.navigation.goBack();
            } else {
                ToastAndroid.show(classroomData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                setClassrooms(classroomData.classrooms);
                props.navigation.goBack();
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            console.log(classroomData);
            props.navigation.goBack();
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 }}>
                    <TouchableOpacity onPress={props.navigation.goBack} style={{ height: 30, width: 30, backgroundColor: colors.white, borderRadius: 15, elevation: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: '70%', width: '70%' }} source={require('../../../../assets/icons/close.png')} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onHandleCreateButton} style={{ backgroundColor: colors.primaryTitle, borderRadius: 5, elevation: 5, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                        <Text style={{ color: colors.white, fontFamily: 'Montserrat-ExtraBold' }}>Crear</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginBottom: 20, color: colors.primaryTitle, fontSize: 25, fontFamily: 'Montserrat-ExtraBold' }}>Crear una clase</Text>
                <TextInput onChangeText={(value) => onHandleTextInput(0, value)} style={{ borderWidth: 1, backgroundColor: '#F3F3F3', borderColor: '#F5F5F5', paddingHorizontal: 20, color: colors.primaryTitle, fontFamily: 'Montserrat-Medium' }} placeholder={'Nombre de la clase'} placeholderTextColor={'gray'} />
                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular', marginBottom: 20 }}>e.j. El nombre de tu gimnasio, Nombre del equipo, Nombre privado de tu clase.</Text>
                <TextInput onChangeText={(value) => onHandleTextInput(1, value)} style={{ borderWidth: 1, backgroundColor: '#F3F3F3', borderColor: '#F5F5F5', paddingHorizontal: 20, color: colors.primaryTitle, fontFamily: 'Montserrat-Medium' }} placeholder={'Tipo de clase'} placeholderTextColor={'gray'} />
                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular' }}>ej. Gimnasio, Calistenia, Danza, CrossFit etc...</Text>
            </View>
        </View>
    );
};

export default HomeAddView;
