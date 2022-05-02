import React, { useContext, useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeAddView from "../../../views/home/Add";
import HomeIndexView from "../../../views/home/Index";
import ClassStack from "../ClassStack";
import colors from "../../../../assets/Colors";
import { ClassroomContext } from '../../../utils/context/ClassroomContext';
import firestore from '@react-native-firebase/firestore';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';

const HomeStackNavigator = createNativeStackNavigator();
const HomeStack = ({ navigation }) => {
    const [classrooms, setClassrooms] = useState([]);
    const { user, setUser } = useContext(CredentialsContext);

    useEffect(() => {
        onGetClassrooms();
        return () => {

        }
    }, []);

    const onGetClassrooms = async () => {
        // const classRooms = await firestore().collection('Classrooms').get();
        firestore()
            .collection('Classrooms')
            .where('teacher', '==', user.authData.uid)
            .get()
            .then(querySnapshot => {
                // console.log(querySnapshot._docs[0]._data.students);
                setClassrooms(querySnapshot._docs);
            })
            .catch((error) => console.log(error));
        // console.log(classRooms._docs[0]._ref._documentPath._parts);
        // setClassrooms(classRooms._docs);
    };

    return (
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
                            <Text style={{ color: colors.darkText, marginLeft: 35, fontSize: 20, fontFamily: 'Montserrat-Bold' }}>Detalles</Text>
                        </View>
                    )
                }} />
                {/* <HomeStackNavigator.Screen name="HomeClassIndexView" component={HomeClassIndexView} />
            <HomeStackNavigator.Screen name="HomeClassSettingsView" component={HomeClassSettingsView} />
            <HomeStackNavigator.Screen name="HomeClassRoutineIndexView" component={HomeClassRoutineIndexView} /> */}
            </HomeStackNavigator.Navigator>
        </ClassroomContext.Provider>
    );
};

export default HomeStack;