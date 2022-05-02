import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeClassIndexView from '../../../views/home/class/Index';
import HomeClassSettingsView from '../../../views/home/class/Settings';
import colors from '../../../../assets/Colors';

const ClassStackNavigator = createMaterialTopTabNavigator();

export default function ClassStack(props) {
  
  function HomeClassSettingsViewWithTitle() {
    return (
      <HomeClassSettingsView title={props.route.params.title} type={props.route.params.type} code={props.route.params.code} />
    );
  };

  function HomeClassIndexViewWithStudents() {
    return (
      <HomeClassIndexView students={props.route.params.students} />
    );
  };

  return (
    <ClassStackNavigator.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: colors.background,
        elevation: 0
      },
      tabBarLabelStyle: {
        color: colors.darkText,
        fontFamily: 'Montserrat-Medium'
      },
      tabBarIndicatorStyle: {
        backgroundColor: colors.darkText
      }
    }}>
      <ClassStackNavigator.Screen name="HomeClassIndexView" component={HomeClassIndexViewWithStudents} options={{ title: 'Alumnos' }} />
      <ClassStackNavigator.Screen name="HomeClassSettingsView" component={HomeClassSettingsViewWithTitle} options={{ title: 'Ajustes' }} />
    </ClassStackNavigator.Navigator>
  );
}