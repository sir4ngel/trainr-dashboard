import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginView from "../../../views/Login";

const AuthStackNavigator = createNativeStackNavigator();
const AuthStack = () => {
    return (
        <AuthStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <AuthStackNavigator.Screen name="LoginView" component={LoginView} />
        </AuthStackNavigator.Navigator>
    );
};

export default AuthStack;