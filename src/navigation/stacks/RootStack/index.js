import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthContext from "../../../utils/context/AuthContext";
import AuthStack from "../AuthStack";
import HomeView from "../../../views/Home";

const RootStackNavigator = createNativeStackNavigator();
const RootStack = () => {
    const auth = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [])

    return (
        <NavigationContainer>
            <RootStackNavigator.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                    {
                        !user ?
                        <RootStackNavigator.Screen name="AuthStack" component={AuthStack} /> :
                        <RootStackNavigator.Screen name="HomeStack" component={HomeView} />
                    }
            </RootStackNavigator.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;