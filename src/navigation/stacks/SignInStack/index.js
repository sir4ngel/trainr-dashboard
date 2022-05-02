import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInNameView from "../../../views/signin/Name";
import SignInBirthdayView from "../../../views/signin/Birthday";
import SignInEmailView from "../../../views/signin/Email";
import SignInPasswordView from "../../../views/signin/Password";

const SignInStackNavigtor = createNativeStackNavigator();
const SignInStack = () => {
    return (
        <SignInStackNavigtor.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <SignInStackNavigtor.Screen name="SignInNameView" component={SignInNameView} />
            <SignInStackNavigtor.Screen name="SignInBirthdayView" component={SignInBirthdayView} />
            <SignInStackNavigtor.Screen name="SignInEmailView" component={SignInEmailView} />
            <SignInStackNavigtor.Screen name="SignInPasswordView" component={SignInPasswordView} />
        </SignInStackNavigtor.Navigator>
    );
}

export default SignInStack;