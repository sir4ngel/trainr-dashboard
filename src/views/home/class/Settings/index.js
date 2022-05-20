import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';
import { ClassroomContext } from '../../../../utils/context/ClassroomContext';
import classroomHandler from '../../../../utils/handlers/ClassroomHandler';
import colors from '../../../../../assets/Colors';
import { CredentialsContext } from '../../../../utils/context/CredentialsContext';
import Clipboard from '@react-native-clipboard/clipboard';

const HomeClassSettingsView = (props) => {
    const [name, setName] = useState(props.name);
    const [type, setType] = useState(props.type);
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const {classrooms, setClassrooms} = useContext(ClassroomContext)

    const onHandleTextInput = (type, value) => {
        if (type === 1) {
            setName(value);
        } else {
            setType(value);
        };
    };

    const onHandleEditButton = () => {
        if (!name) {
            ToastAndroid.show('Escribe un nombre para continuar', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else if (!type) {
            ToastAndroid.show('Escribe un tipo de clase para continuar', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else {
            onEditClassroom();
        }
    };

    const onEditClassroom = async () => {
        const data = {
            name: name,
            type: type,
            user_id: storedCredentials.user.id
        };

        const classroomData = await classroomHandler.onEditClassroom(props.route.params.id, data, storedCredentials.token);
        if (classroomData.status) {
            if (classroomData.status !== 'SUCCESS') {
                ToastAndroid.show(classroomData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                props.navigation.goBack();
            } else {
                ToastAndroid.show(classroomData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                // setClassrooms(classroomData.exercises);
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
            <View style={{ height: '100%', width: '100%', paddingHorizontal: 20 }}>
                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5, marginTop: 30 }}>Nombre de la clase</Text>
                <TextInput onChangeText={(value) => onHandleTextInput(1, value)} value={name} selectTextOnFocus style={{ borderWidth: 1, backgroundColor: '#F3F3F3', borderColor: '#F5F5F5', paddingHorizontal: 20, color: colors.primaryTitle, fontFamily: 'Montserrat-Medium', marginBottom: 20, borderRadius: 3 }} placeholder={props.name} placeholderTextColor={'gray'} />
                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5 }}>Tipo de clase</Text>
                <TextInput onChangeText={(value) => onHandleTextInput(2, value)} value={type} selectTextOnFocus style={{ borderWidth: 1, backgroundColor: '#F3F3F3', borderColor: '#F5F5F5', paddingHorizontal: 20, color: colors.primaryTitle, fontFamily: 'Montserrat-Medium', borderRadius: 3, marginBottom: 25 }} placeholder={props.type} placeholderTextColor={'gray'} />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                    <Text style={{ color: colors.primaryTitle, fontSize: 16, fontFamily: 'Montserrat-Medium', marginRight: 10 }}>Código: {props.code}</Text>
                    <TouchableOpacity onPress={() => {
                        try {
                            Clipboard.setString(props.code);
                            ToastAndroid.show('Código copiado exitosamente', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                        } catch (error) {
                            ToastAndroid.show('Ocurrió un error copiando el código', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                            console.log(error);
                        }
                    }}>
                        <Image style={{ height: 20, width: 20 }} source={require('../../../../../assets/icons/copy.png')} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ backgroundColor: colors.primaryTitle, padding: 15, justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Bold', color: colors.white }}>Guardar</Text>
                </TouchableOpacity>
                {/* <View style={{ flexDirection: 'row', marginVertical: 20, alignItems: 'center', }}>
                    <Text style={{ color: colors.primaryTitle, fontSize: 20, fontFamily: 'Montserrat-Bold', marginRight: 10 }}>{props.title}</Text>
                    <TouchableOpacity>
                        <Image style={{ height: 20, width: 20 }} source={require('../../../../../assets/icons/edit.png')} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                    <Text style={{ color: colors.primaryTitle, fontSize: 16, fontFamily: 'Montserrat-Medium', marginRight: 10 }}>{props.type}</Text>
                    <TouchableOpacity>
                        <Image style={{ height: 20, width: 20 }} source={require('../../../../../assets/icons/edit.png')} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                    <Text style={{ color: colors.primaryTitle, fontSize: 16, fontFamily: 'Montserrat-Medium', marginRight: 10 }}>Codigo: {props.code[1]}</Text>
                    <TouchableOpacity>
                        <Image style={{ height: 20, width: 20 }} source={require('../../../../../assets/icons/copy.png')} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View> */}
                {/* <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Medium' }}>Codigo: {props.code[1]}</Text> */}
                <TouchableOpacity  style={{ position: 'absolute', alignSelf: 'center', bottom: 25 }}>
                    <Text style={{ color: colors.primaryTitle, fontSize: 14, fontFamily: 'Montserrat-Regular', color: 'red' }}>Eliminar clase</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeClassSettingsView;