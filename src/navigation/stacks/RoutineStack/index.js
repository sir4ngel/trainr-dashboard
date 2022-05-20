import React, { useContext, useEffect, useState } from "react";
import { ToastAndroid } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoutineIndexView from "../../../views/routine/Index";
import RoutineAddViewWithCredentials from "../../../views/routine/Add";
import { RoutinesContext } from "../../../utils/context/RoutinesContext";
import { CredentialsContext } from "../../../utils/context/CredentialsContext";
import routineHandler from "../../../utils/handlers/RoutineHandler";
import RoutineEditViewWithCredentials from "../../../views/routine/Edit";
import { LoadingContext } from "../../../utils/context/LoadingContext";

const RoutineStackNavigator = createNativeStackNavigator();
const RoutineStack = ({ navigation }) => {
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
            } else {
                setRoutines(routineData.data)
                setLoading(false);
                console.log(routineData);
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            setLoading(false);
            console.log(routineData);
        }
    };

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            <RoutinesContext.Provider value={{ routines, setRoutines }}>
                <RoutineStackNavigator.Navigator
                    screenOptions={{
                        headerShown: false
                    }}>
                    <RoutineStackNavigator.Screen name="RoutineIndexView" component={RoutineIndexView} />
                    <RoutineStackNavigator.Screen name="RoutineAddView" component={RoutineAddViewWithCredentials} />
                    <RoutineStackNavigator.Screen name="RoutineEditView" component={RoutineEditViewWithCredentials} />
                </RoutineStackNavigator.Navigator>
            </RoutinesContext.Provider>
        </LoadingContext.Provider>
    );
};

export default RoutineStack;