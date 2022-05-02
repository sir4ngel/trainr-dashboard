import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import colors from '../../../../assets/Colors';
import authHandler from '../../../utils/handlers/AuthHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';

const SignInPasswordView = (props) => {
    const [isAccepted, setIsAccepted] = useState(false);
    const [password, setPassword] = useState("");
    const [rPassword, setRPassword] = useState("");
    const [isEditable, setIsEditable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)

    const onHandleSendButton = () => {
        if (!password) {
            ToastAndroid.show('Por favor ingresa tu contraseña.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else if (!rPassword) {
            ToastAndroid.show('Por favor repite tu contraseña.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else if (password.length < 8) {
            ToastAndroid.show('La contraseña debe contener al menos 8 caracteres.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else if (password !== rPassword) {
            ToastAndroid.show('Las contraseñas deben de coincidir.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else {
            setIsDisabled(true);
            setIsEditable(false);
            onHandleRegister();
        }

    };

    const onHandleRegister = async () => {
        const data = {
           first_name: props.route.params.name,
           last_name: props.route.params.lastName,
           email: props.route.params.email,
           password: password,
           password_confirmation: rPassword
        };
        const authData = await authHandler.onRegister(data);
        if (authData.status) {
            if (authData.status !== 'SUCCESS') {
                ToastAndroid.show(authData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                setIsDisabled(false);
            setIsEditable(true);
            } else {
                ToastAndroid.show(authData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                persistLogin(authData);
                setIsDisabled(false);
            setIsEditable(true);
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            console.log(authData);
            setIsDisabled(false);
            setIsEditable(true);
        }
    };

    const persistLogin = (authData) => {
        var credentialsData = {
            user: authData.user,
            token: authData.token
        }
        AsyncStorage.setItem('credentials', JSON.stringify(credentialsData))
            .then(() => {
                setStoredCredentials(credentialsData)
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const onHandleInputText = (type, value) => {
        if (type === 1) {
            setPassword(value);
        } else {
            setRPassword(value);
        };
    };

    return (
        <View style={styles.container}>
            <View style={styles.dataContainer}>
                <Text style={styles.title}>Escribe tu contraseña</Text>
                <TextInput style={styles.input} secureTextEntry onChangeText={(value) => onHandleInputText(1, value)} editable={isEditable}></TextInput>
                <Text style={[styles.title, { marginTop: 25 }]}>Repite tu contraseña</Text>
                <TextInput style={styles.input} secureTextEntry onChangeText={(value) => onHandleInputText(2, value)} editable={isEditable}></TextInput>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity style={{ backgroundColor: colors.textInput, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={isAccepted ? () => setIsAccepted(false) : () => setIsAccepted(true)} disabled={isDisabled}>
                        {
                            isAccepted ?
                                <View style={{ height: 15, width: 15, borderRadius: 25, backgroundColor: colors.primary, margin: 5 }} /> :
                                <View style={{ height: 15, width: 15, borderRadius: 25, backgroundColor: colors.textInput, margin: 5 }} />
                        }
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Text style={{ color: colors.darkText, fontFamily: 'RobotoSlab-SemiBold' }}>Acepto los </Text>
                        <TouchableOpacity disabled={isDisabled}>
                            <Text style={{ color: colors.link, fontFamily: 'RobotoSlab-SemiBold' }}>terminos y condiciones.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={isAccepted ? styles.button : [styles.button, { opacity: 0.5 }]} onPress={onHandleSendButton} disabled={isAccepted === false || isDisabled === true ? true : false}>
                    <Text style={styles.textButton}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    dataContainer: {
        marginHorizontal: 20,
        marginTop: 50
    },
    input: {
        backgroundColor: colors.textInput,
        color: colors.darkText,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    title: {
        color: colors.darkText,
        fontSize: 30,
        fontFamily: 'AlfaSlabOne-Regular'
    },
    button: {
        alignSelf: 'center',
        marginVertical: 40,
        backgroundColor: colors.primary,
        borderRadius: 30
    },
    textButton: {
        color: colors.whiteText,
        fontFamily: 'RobotoSlab-SemiBold',
        marginHorizontal: 30,
        marginVertical: 15,
        fontSize: 15
    },
})

export default SignInPasswordView;