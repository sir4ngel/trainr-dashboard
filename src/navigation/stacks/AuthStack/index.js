import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginView from "../../../views/Login";
import SignInStack from "../SignInStack";

const AuthStackNavigator = createNativeStackNavigator();
const AuthStack = () => {
    return (
        <AuthStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <AuthStackNavigator.Screen name="LoginView" component={LoginView} />
            <AuthStackNavigator.Screen name="SignInStack" component={SignInStack} />
        </AuthStackNavigator.Navigator>
    );
};

export default AuthStack;