import React, { useContext, useEffect, useState } from "react";
import { ToastAndroid } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoutineIndexView from "../../../views/routine/Index";
import RoutineAddViewWithCredentials from "../../../views/routine/Add";
import { RoutinesContext } from "../../../utils/context/RoutinesContext";
import { CredentialsContext } from "../../../utils/context/CredentialsContext";
import routineHandler from "../../../utils/handlers/RoutineHandler";
import RoutineEditView from "../../../views/routine/Edit";

const RoutineStackNavigator = createNativeStackNavigator();
const RoutineStack = ({ navigation }) => {
    const [routines, setRoutines] = useState([]);
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    useEffect(() => {
        onGetRoutines();
        return () => {

        }
    }, []);

    const onGetRoutines = async () => {
        const routineData = await routineHandler.onGetRoutines(storedCredentials.user.id, storedCredentials.token);
        if (routineData.status) {
            if (routineData.status !== 'SUCCESS') {
                ToastAndroid.show(routineData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            } else {
                setRoutines(routineData.data)
                console.log(routineData);
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            console.log(routineData);
        }
    };

    return (
        <RoutinesContext.Provider value={{routines, setRoutines}}>
        <RoutineStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <RoutineStackNavigator.Screen name="RoutineIndexView" component={RoutineIndexView} />
            <RoutineStackNavigator.Screen name="RoutineAddView" component={RoutineAddViewWithCredentials} />
            <RoutineStackNavigator.Screen name="RoutineEditView" component={RoutineEditView} />
        </RoutineStackNavigator.Navigator>
        </RoutinesContext.Provider>
    );
};

export default RoutineStack;