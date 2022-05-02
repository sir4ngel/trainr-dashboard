import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import colors from '../../../../assets/Colors';

const SignInEmailView = (props) => {
    const [email, setEmail] = useState("");

    const onHandleNextButton = () => {
        if (!email) {
            ToastAndroid.show('Por favor escribe tu correo electronico.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else {
            props.navigation.navigate('SignInPasswordView', {
                name: props.route.params.name,
                lastName: props.route.params.lastName,
                birthday: props.route.params.birthday,
                email: email
            });
        };
    };

    return (
        <View style={styles.container}>
            <View style={styles.dataContainer}>
                <Text style={styles.title}>Escribe tu correo electronico</Text>
                <TextInput style={styles.input} keyboardType={'email-address'} onChangeText={setEmail}></TextInput>
                <TouchableOpacity style={styles.button} onPress={onHandleNextButton}>
                    <Text style={styles.textButton}>Siguiente</Text>
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

export default SignInEmailView;