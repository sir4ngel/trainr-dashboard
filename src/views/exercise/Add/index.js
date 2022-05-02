import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';
import colors from '../../../../assets/Colors';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';
import { ExercisesContext } from '../../../utils/context/ExercisesContext';
import exerciseHandler from '../../../utils/handlers/ExerciseHandler';

const ExerciseAddView = (props) => {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {exercises, setExercises} = useContext(ExercisesContext);

    const onHandleCreateButton = () => {
        if (!name) {
            ToastAndroid.show('Escribe un nombre para continuar', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else if (!url) {
            ToastAndroid.show('Escribe un url para continuar', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else {
            onCreateExercise();
        }
    };

    const onCreateExercise = async() => {
        const data = {
            name: name,
            url: url,
            user_id: storedCredentials.user.id
        };
        const exerciseData = await exerciseHandler.onCreateExercise(data, storedCredentials.token);
        if (exerciseData.status) {
            if (exerciseData.status !== 'SUCCESS') {
                ToastAndroid.show(exerciseData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                props.navigation.goBack();
            } else {
                ToastAndroid.show(exerciseData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                setExercises(exerciseData.exercises);
                props.navigation.goBack();
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            console.log(exerciseData);
            props.navigation.goBack();
        }
    };
    
    const onHandleTextInput = (type, value) => {
        if (type === 1) {
            setName(value);
        } else {
            setUrl(value);
        };
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 }}>
                    <TouchableOpacity onPress={props.navigation.goBack} style={{ height: 30, width: 30, backgroundColor: colors.whiteText, borderRadius: 15, elevation: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: '70%', width: '70%' }} source={require('../../../../assets/icons/close.png')} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onHandleCreateButton} style={{ backgroundColor: '#50C878', borderRadius: 5, elevation: 5, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                        <Text style={{ color: colors.whiteText, fontFamily: 'Montserrat-ExtraBold' }}>Crear</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginBottom: 20, color: colors.darkText, fontSize: 25, fontFamily: 'Montserrat-ExtraBold' }}>Crear un ejercicio</Text>
                <TextInput onChangeText={(value) => onHandleTextInput(1, value)} style={{ borderWidth: 1, backgroundColor: '#F3F3F3', borderColor: '#F5F5F5', paddingHorizontal: 20, color: colors.darkText, fontFamily: 'Montserrat-Medium' }} placeholder={'Nombre del ejercicio'} placeholderTextColor={'gray'} />
                <Text style={{ color: colors.darkText, fontFamily: 'Montserrat-Regular', marginBottom: 20 }}>e.j. Dominadas, lagartijas, bicep curl.</Text>
                <TextInput onChangeText={(value) => onHandleTextInput(2, value)} style={{ borderWidth: 1, backgroundColor: '#F3F3F3', borderColor: '#F5F5F5', paddingHorizontal: 20, color: colors.darkText, fontFamily: 'Montserrat-Medium' }} placeholder={'URL del video'} placeholderTextColor={'gray'} />
            </View>
        </View>
    );
}

export default ExerciseAddView;