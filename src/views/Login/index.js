import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, TextInput, ActivityIndicator, ToastAndroid } from 'react-native';
import colors from '../../../assets/Colors';
import { CredentialsContext } from '../../utils/context/CredentialsContext';
import authHandler from '../../utils/handlers/AuthHandler';

const LoginView = (props) => {
    const [isLogining, setIsLogining] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    const onHandleLoginButton = async () => {
        if (!email) {
            ToastAndroid.show('Escribe un email', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else if (!password) {
            ToastAndroid.show('Escribe una contraseña', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else {
            setIsLogining(true);
            const authData = await authHandler.onLogin(email, password);
            if (authData.status) {
                if (authData.status !== 'SUCCESS') {
                    ToastAndroid.show(authData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                    setIsLogining(false);
                } else {
                    ToastAndroid.show(authData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                    persistLogin(authData);
                }
            } else {
                ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                console.log(authData);
                setIsLogining(false);
            }
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
        setIsLogining(false);
    };

    const onHandleTextInput = (type, value) => {
        if (type === 1) {
            setEmail(value);
        } else {
            setPassword(value);
        }
    };

    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} translucent={false} />
            <View style={{ marginHorizontal: 20, marginTop: 40, height: '30%' }}>
                <Image style={{ height: '100%', width: '100%' }} source={require('../../../assets/images/tracker.png')} />
            </View>
            <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Bold', fontSize: 22, marginHorizontal: 20, marginBottom: 10 }}>Iniciar sesión</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 }}>
                <Image style={{ height: 24, width: '10%' }} source={require('../../../assets/icons/at.png')} resizeMode={'contain'} />
                <TextInput onChangeText={(value) => onHandleTextInput(1, value)} selectionColor={colors.primaryTitle} underlineColorAndroid={colors.input} style={{ width: '90%', color: colors.primaryTitle }} placeholder={'Correo electronico'} placeholderTextColor={colors.secondaryTitle} keyboardType={'email-address'} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <Image style={{ height: 24, width: '10%' }} source={require('../../../assets/icons/lock.png')} resizeMode={'contain'} />
                <TextInput onChangeText={(value) => onHandleTextInput(2, value)} selectionColor={colors.primaryTitle} underlineColorAndroid={colors.input} style={{ width: '90%', color: colors.primaryTitle }} placeholder={'Contraseña'} placeholderTextColor={colors.secondaryTitle} secureTextEntry />
            </View>
            <View style={{ alignItems: 'flex-end', padding: 20, }}>
                <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                    <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-SemiBold' }}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onHandleLoginButton} style={{ marginHorizontal: 20, height: 50, backgroundColor: colors.primaryTitle, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }} disabled={isLogining && true} >
                {
                    isLogining ?
                        <ActivityIndicator color={colors.white} /> :
                        <Text style={{ color: colors.white, fontFamily: 'Montserrat-Bold' }}>Entrar</Text>

                }
            </TouchableOpacity>
            <Text style={{ color: colors.primaryTitle, alignSelf: 'center', marginVertical: 20, fontFamily: 'Montserrat-Regular' }}>o</Text>
            <TouchableOpacity style={{ borderWidth: 2, borderColor: colors.primaryTitle, flexDirection: 'row', marginHorizontal: 20, marginBottom: 20, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                <Image style={{ height: 24, width: 24, marginRight: 10 }} source={require('../../../assets/icons/google.png')} />
                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Bold' }}>Continuar con google</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
                <Text style={{ color: colors.secondaryTitle, fontFamily: 'Montserrat-Bold', marginRight: 5 }}>¿Nuevo en Trainr?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('SignInStack')}>
                    <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Bold' }}>Registrate</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default LoginView;