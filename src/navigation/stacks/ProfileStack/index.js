import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileView from "../../../views/Profile";

const ProfileStackNavigator = createNativeStackNavigator();
const ProfileStack = () => {
    return (
        <ProfileStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <ProfileStackNavigator.Screen name="ProfileView" component={ProfileView} />
        </ProfileStackNavigator.Navigator>
    );
};

export default ProfileStack;