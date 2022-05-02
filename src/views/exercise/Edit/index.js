import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';
import { ExercisesContext } from '../../../utils/context/ExercisesContext';
import colors from '../../../../assets/Colors';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';
import exerciseHandler from '../../../utils/handlers/ExerciseHandler';

const ExerciseEditView = (props) => {
    const [name, setName] = useState(props.route.params.name);
    const [url, setUrl] = useState(props.route.params.url);
    const { exercises, setExercises } = useContext(ExercisesContext);
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    
    const onHandleEditButton = () => {
        if (!name) {
            ToastAndroid.show('Escribe un nombre para continuar', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else if (!url) {
            ToastAndroid.show('Escribe un url para continuar', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else {
            onEditExercise();
        }
    };
    
    const onEditExercise = async () => {
        const data = {
            name: name,
            url: url,
            user_id: storedCredentials.user.id
        };
        
        const exerciseData = await exerciseHandler.onEditExercise(props.route.params.id, data, storedCredentials.token);
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
            <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'space-between' }}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 }}>
                        <TouchableOpacity onPress={props.navigation.goBack} style={{ height: 30, width: 30, backgroundColor: colors.whiteText, borderRadius: 15, elevation: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: '70%', width: '70%' }} source={require('../../../../assets/icons/close.png')} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onHandleEditButton} style={{ backgroundColor: '#50C878', borderRadius: 5, elevation: 5, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ color: colors.whiteText, fontFamily: 'Montserrat-ExtraBold' }}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: colors.darkText, fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5 }}>Nombre del ejercicio</Text>
                    <TextInput onChangeText={(value) => onHandleTextInput(1, value)} value={name} selectTextOnFocus style={{ borderWidth: 1, backgroundColor: '#F3F3F3', borderColor: '#F5F5F5', paddingHorizontal: 20, color: colors.darkText, fontFamily: 'Montserrat-Medium', marginBottom: 10 }} placeholder={props.route.params.name} placeholderTextColor={'gray'} />
                    <Text style={{ color: colors.darkText, fontFamily: 'Montserrat-Bold', fontSize: 16, marginBottom: 5 }}>URL del video</Text>
                    <TextInput onChangeText={(value) => onHandleTextInput(2, value)} value={url} selectTextOnFocus style={{ borderWidth: 1, backgroundColor: '#F3F3F3', borderColor: '#F5F5F5', paddingHorizontal: 20, color: colors.darkText, fontFamily: 'Montserrat-Medium' }} placeholder={props.route.params.url} placeholderTextColor={'gray'} />
                </View>
                {/* <Text style={{ color: colors.darkText, fontFamily: 'Montserrat-Medium' }}>{props.route.params.name}</Text>
                <Text style={{ color: colors.darkText, fontFamily: 'Montserrat-Medium' }}>{props.route.params.url}</Text> */}
                <View>
                    <TouchableOpacity style={{ marginBottom: 20, alignSelf: 'center' }}>
                        <Text style={{ color: 'red', fontFamily: 'Montserrat-Regular' }}>Eliminar ejercicio</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ExerciseEditView;