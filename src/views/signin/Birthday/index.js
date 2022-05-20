import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import colors from '../../../../assets/Colors';
import DatePicker from 'react-native-date-picker'

const SignInBirthdayView = (props) => {
    const [date, setDate] = useState(new Date());

    const onHandleNextButton = () => {
        if (date.getFullYear() < 1930 || date.getFullYear() > 2004) {
            ToastAndroid.show('Debes ser mayor de 18 años para usar la aplicación.', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else {
            props.navigation.navigate('SignInEmailView', {
                name: props.route.params.name,
                lastName: props.route.params.lastName,
                birthday: date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
            });
        };
    };

    return (
        <View style={styles.container}>
            <View style={styles.dataContainer}>
                <Text style={styles.title}>Ingresa tu fecha de nacimiento</Text>
                <DatePicker  mode={'date'} date={date} onDateChange={setDate} />
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
    title: {
        color: colors.primaryTitle,
        fontSize: 30,
        fontFamily: 'Montserrat-Bold',
        marginBottom: 20
    },
    button: {
        alignSelf: 'center',
        marginVertical: 40,
        backgroundColor: colors.primaryTitle,
        borderRadius: 30
    },
    textButton: {
        color: colors.white,
        fontFamily: 'Montserrat-SemiBold',
        marginHorizontal: 30,
        marginVertical: 15,
        fontSize: 15
    },
})

export default SignInBirthdayView;