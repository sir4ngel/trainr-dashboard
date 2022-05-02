import React from 'react';
import { View, Image } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import colors from '../../../assets/Colors';
import HomeStack from '../stacks/HomeStack'
import { DrawerContent } from '../../views/DrawerContent';
import ProfileStack from '../stacks/ProfileStack';
import RoutineStack from '../stacks/RoutineStack';
import ExerciseStack from '../stacks/ExerciseStack';


const DrawerNavigator = createDrawerNavigator();
function DrawerScreen() {
    return (
        <DrawerNavigator.Navigator drawerContent={(props) => <DrawerContent {...props} />} screenOptions={{
            headerShown: false, drawerActiveBackgroundColor: colors.primary, drawerActiveTintColor: colors.whiteText, drawerInactiveTintColor: colors.textDark, drawerLabelStyle: {
                marginLeft: -25, fontFamily: 'RobotoSlab-Medium', fontSize: 15
            }
        }} >
            <DrawerNavigator.Screen name='HomeStack' component={HomeStack} options={{
                title: 'Inicio', drawerIcon: ({ color }) => (
                    <View style={{ height: 22, width: 22, marginRight: 5 }}>
                        <Image style={{ height: '100%', width: '100%', tintColor: color }} source={require('../../../assets/icons/house.png')} resizeMode='contain'></Image>
                    </View>
                )
            }} />
            <DrawerNavigator.Screen name='RoutineStack' component={RoutineStack} options={{
                title: 'Rutinas', drawerIcon: ({ color }) => (
                    <View style={{ height: 22, width: 22, marginRight: 5 }}>
                        <Image style={{ height: '100%', width: '100%', tintColor: color }} source={require('../../../assets/icons/exercise.png')} resizeMode='contain'></Image>
                    </View>
                )
            }} />
            <DrawerNavigator.Screen name='ExerciseStack' component={ExerciseStack} options={{
                title: 'Ejercicios', drawerIcon: ({ color }) => (
                    <View style={{ height: 22, width: 22, marginRight: 5 }}>
                        <Image style={{ height: '100%', width: '100%', tintColor: color }} source={require('../../../assets/icons/dumbbell.png')} resizeMode='contain'></Image>
                    </View>
                )
            }} />
            <DrawerNavigator.Screen name='ProfileStack' component={ProfileStack} options={{
                title: 'Mi perfil', drawerIcon: ({ color }) => (
                    <View style={{ height: 22, width: 22, marginRight: 5 }}>
                        <Image style={{ height: '100%', width: '100%', tintColor: color }} source={require('../../../assets/icons/user2.png')} resizeMode='contain'></Image>
                    </View>
                )
            }} />
        </DrawerNavigator.Navigator>
    );
}

export default DrawerScreen;