import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import colors from '../../../assets/Colors';
import auth from '@react-native-firebase/auth';
import AuthContext from '../../utils/context/AuthContext';


const LoginView = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginButtonIsPressable, setLoginButtonIsPressable] = useState(false);
    const auth = useContext(AuthContext);

    function logIn() {
        if (email) {
            if (password) {
                auth().signInWithEmailAndPassword(email, password)
                .then(() => console.log('Usuario logeado.'))
                .catch((error) => console.log(error));
            } else {
                ToastAndroid.show('El campo contraseña está vacío.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            }
        } else {
            ToastAndroid.show('El campo correo electronico está vacío.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        }
    }

    const onHandleInputText = (type, value) => {
        if (type === 1) {
            setEmail(value);
        } else {
            setPassword(value);
            if (value.length >= 6) {
                setLoginButtonIsPressable(true);
                console.log('Entre');
            }
        }

    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={'white'} translucent={false} />
            <Text style={[styles.inputTitle, { marginTop: 50 }]}>
                Correo electronico o nombre de usuario
            </Text>
            <TextInput style={styles.input} keyboardType={'email-address'} onChangeText={(value) => onHandleInputText(1, value)} />
            <Text style={[styles.inputTitle, { marginTop: 30 }]}>Contraseña</Text>
            <TextInput style={styles.input} secureTextEntry={true} onChangeText={(value) => onHandleInputText(2, value)} />
            <TouchableOpacity style={loginButtonIsPressable ? styles.loginButton : [styles.loginButton, { opacity: 0.5 }]} onPress={logIn} disabled={loginButtonIsPressable ? false : true}>
                <Text style={styles.loginButtonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <View style={styles.separatorTextContainer}>
                    <Text style={{ color: colors.darkText }}>O</Text>
                </View>
                <View style={styles.separatorLine} />
            </View>
            <TouchableOpacity style={styles.signupButton}>
                <Text style={styles.signupButtonText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    inputTitle: {
        color: colors.darkText,
        fontSize: 30,
        fontFamily: 'AlfaSlabOne-Regular',
        marginHorizontal: 20
    },
    input: {
        backgroundColor: colors.textInput,
        color: colors.darkText,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    loginButton: {
        alignSelf: 'center',
        marginVertical: 40,
        backgroundColor: colors.primary,
        borderRadius: 30
    },
    loginButtonText: {
        color: colors.whiteText,
        fontFamily: 'RobotoSlab-SemiBold',
        marginHorizontal: 30,
        marginVertical: 15,
        fontSize: 15
    },
    separatorContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 35
    },
    separatorLine: {
        width: '40%',
        height: 0,
        borderBottomWidth: 1
    },
    separatorTextContainer: {
        width: '20%',
        alignItems: 'center',
    },
    signupButton: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.darkText,
        borderRadius: 10
    },
    signupButtonText: {
        color: colors.darkText,
        fontFamily: 'RobotoSlab-Regular',
        marginHorizontal: 12,
        marginVertical: 1,
        fontSize: 12
    }
})

export default LoginView;