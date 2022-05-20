import React, { useContext, useState, useEffect } from "react";
import { ToastAndroid } from 'react-native'
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeAddView from "../../../views/home/Add";
import HomeIndexView from "../../../views/home/Index";
import ClassStack from "../ClassStack";
import colors from "../../../../assets/Colors";
import { ClassroomContext } from '../../../utils/context/ClassroomContext';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';
import classroomHandler from "../../../utils/handlers/ClassroomHandler";
import { LoadingContext } from "../../../utils/context/LoadingContext";

const HomeStackNavigator = createNativeStackNavigator();
const HomeStack = ({ navigation }) => {
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    useEffect(() => {
        onGetClassrooms();
        return () => {

        }
    }, []);

    const onGetClassrooms = async () => {
        const classroomData = await classroomHandler.onGetClassrooms(storedCredentials.user.id, storedCredentials.token);
        if (classroomData.status) {
            if (classroomData.status !== 'SUCCESS') {
                ToastAndroid.show(classroomData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                setLoading(false);
            } else {
                setClassrooms(classroomData.data)
                setLoading(false);
                console.log(classroomData);
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            setLoading(false);
            console.log(classroomData);
        }
    };

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            <ClassroomContext.Provider value={{ classrooms, setClassrooms }}>
                <HomeStackNavigator.Navigator
                    screenOptions={{
                        headerShown: false
                    }}>
                    <HomeStackNavigator.Screen name="HomeIndexView" component={HomeIndexView} />
                    <HomeStackNavigator.Screen name="HomeAddView" component={HomeAddView} />
                    <HomeStackNavigator.Screen name="ClassStack" component={ClassStack} options={{
                        headerShown: true,
                        header: () => (
                            <View style={{ backgroundColor: colors.background, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>
                                <TouchableOpacity onPress={navigation.goBack} style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', elevation: 5 }}>
                                    <Image style={{ height: '70%', width: '70%', tintColor: colors.darkText }} source={require('../../../../assets/icons/back.png')} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <Text style={{ color: colors.darkText, marginLeft: 12, fontSize: 20, fontFamily: 'Montserrat-Bold' }}>Detalles</Text>
                            </View>
                        )
                    }} />
                    {/* <HomeStackNavigator.Screen name="HomeClassIndexView" component={HomeClassIndexView} />
            <HomeStackNavigator.Screen name="HomeClassSettingsView" component={HomeClassSettingsView} />
            <HomeStackNavigator.Screen name="HomeClassRoutineIndexView" component={HomeClassRoutineIndexView} /> */}
                </HomeStackNavigator.Navigator>
            </ClassroomContext.Provider>
        </LoadingContext.Provider>
    );
};

export default HomeStack;