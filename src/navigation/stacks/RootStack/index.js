import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "../AuthStack";
import DrawerScreen from "../../Drawer";
import { CredentialsContext } from "../../../utils/context/CredentialsContext";

const RootStackNavigator = createNativeStackNavigator();
const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
            <NavigationContainer>
                <RootStackNavigator.Navigator
                    screenOptions={{
                        headerShown: false
                    }}>
                    {
                        !storedCredentials ?
                            <RootStackNavigator.Screen name="AuthStack" component={AuthStack} /> :
                            <RootStackNavigator.Screen name="DrawerScreen" component={DrawerScreen} />
                    }
                </RootStackNavigator.Navigator>
            </NavigationContainer>
            )}
            </CredentialsContext.Consumer>
    );
};

export default RootStack;