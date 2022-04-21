import React from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import colors from '../../../assets/Colors';

const LoginView = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={'white'} translucent={false} />
            <Text style={styles.emailText}>
                Correo electronico
            </Text>
            <TextInput style={styles.emailInput} keyboardType={'email-address'} />
            <Text style={styles.passwordText}>Contraseña</Text>
            <TextInput style={styles.passwordInput} secureTextEntry={true} />
            <TouchableOpacity style={styles.loginButton}>
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
    emailText: {
        color: colors.darkText,
        fontSize: 30,
        fontFamily: 'AlfaSlabOne-Regular',
        marginHorizontal: 20,
        marginTop: 50
    },
    emailInput: {
        backgroundColor: colors.textInput,
        color: colors.darkText,
        marginHorizontal: 20,
        paddingHorizontal: 20
    },
    passwordText: {
        color: colors.darkText,
        fontSize: 30,
        fontFamily: 'AlfaSlabOne-Regular',
        marginHorizontal: 20,
        marginTop: 20
    },
    passwordInput: {
        backgroundColor: colors.textInput,
        color: colors.darkText,
        marginHorizontal: 20,
        paddingHorizontal: 20
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