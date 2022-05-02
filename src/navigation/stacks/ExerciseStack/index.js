import React, { useState, useContext, useEffect } from "react";
import { ToastAndroid } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExerciseIndexView from '../../../views/exercise/Index';
import ExerciseAddView from "../../../views/exercise/Add";
import { ExercisesContext } from "../../../utils/context/ExercisesContext";
import { CredentialsContext } from "../../../utils/context/CredentialsContext";
import ExerciseEditView from "../../../views/exercise/Edit";
import exerciseHandler from "../../../utils/handlers/ExerciseHandler";

const ExerciseStackNavigator = createNativeStackNavigator();
const ExerciseStack = ({ navigation }) => {
    const [exercises, setExercises] = useState([]);
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    useEffect(() => {
        onGetExercises();
        return () => {

        }
    }, []);

    const onGetExercises = async () => {
        const exerciseData = await exerciseHandler.onGetExercises(storedCredentials.user.id, storedCredentials.token);
        if (exerciseData.status) {
            if (exerciseData.status !== 'SUCCESS') {
                ToastAndroid.show(exerciseData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            } else {
                setExercises(exerciseData.data)
                console.log(exerciseData);
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            console.log(exerciseData);
        }
    };

    return (
        <ExercisesContext.Provider value={{ exercises, setExercises }}>
            <ExerciseStackNavigator.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <ExerciseStackNavigator.Screen name="ExerciseIndexView" component={ExerciseIndexView} />
                <ExerciseStackNavigator.Screen name="ExerciseAddView" component={ExerciseAddView} />
                <ExerciseStackNavigator.Screen name="ExerciseEditView" component={ExerciseEditView} />
            </ExerciseStackNavigator.Navigator>
        </ExercisesContext.Provider>
    );
};

export default ExerciseStack;