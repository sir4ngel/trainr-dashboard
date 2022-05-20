import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeClassIndexView from '../../../views/home/class/Index';
import HomeClassSettingsView from '../../../views/home/class/Settings';
import colors from '../../../../assets/Colors';

const ClassStackNavigator = createMaterialTopTabNavigator();

export default function ClassStack(props) {
  
  function HomeClassSettingsViewWithTitle() {
    return (
      <HomeClassSettingsView name={props.route.params.name} type={props.route.params.type} code={props.route.params.code} />
    );
  };

  function HomeClassIndexViewWithParams() {
    return (
      <HomeClassIndexView id={props.route.params.id} />
    );
  };

  return (
    <ClassStackNavigator.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: colors.background,
        elevation: 0
      },
      tabBarLabelStyle: {
        color: colors.primaryTitle,
        fontFamily: 'Montserrat-Medium'
      },
      tabBarIndicatorStyle: {
        backgroundColor: colors.primaryTitle
      }
    }}>
      <ClassStackNavigator.Screen name="HomeClassIndexView" component={HomeClassIndexViewWithParams} options={{ title: 'Alumnos' }} />
      <ClassStackNavigator.Screen name="HomeClassSettingsView" component={HomeClassSettingsViewWithTitle} options={{ title: 'Ajustes' }} />
    </ClassStackNavigator.Navigator>
  );
}