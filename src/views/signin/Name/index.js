import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import colors from '../../../../assets/Colors';

const SignInNameView = (props) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");

    const onHandleNextButton = () => {
        if (!name) {
            ToastAndroid.show('Por favor escribe tu nombre.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else if (!lastName) {
            ToastAndroid.show('Por favor escribe tus apellidos.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else {
            props.navigation.navigate('SignInBirthdayView', {
                name: name,
                lastName: lastName
            });
        };
    };

    const onHandleInputText = (type, value) => {
        if (type === 1) {
            setName(value);
        } else {
            setLastName(value);
        };
    };

    return (
        <View style={styles.container}>
            <View style={styles.dataContainer}>
                <Text style={styles.title}>Escribe tu nombre</Text>
                <TextInput style={styles.input} onChangeText={(value) => onHandleInputText(1, value)} ></TextInput>
                <Text style={[styles.title, { marginTop: 25 }]}>Escribe tus apellidos</Text>
                <TextInput style={styles.input} onChangeText={(value) => onHandleInputText(2, value)} ></TextInput>
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

export default SignInNameView;