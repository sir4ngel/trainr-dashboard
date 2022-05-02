import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl, ToastAndroid } from 'react-native';
import { RoutinesContext } from '../../../utils/context/RoutinesContext';
import colors from '../../../../assets/Colors';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';
import routineHandler from '../../../utils/handlers/RoutineHandler';

const RoutineIndexView = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const {routines, setRoutines} = useContext(RoutinesContext);
    const { storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    const onRenderRoutineItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('RoutineEditView')} style={{ backgroundColor: colors.background, elevation: 5, marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 15, borderRadius: 2, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: colors.darkText, fontFamily: 'Montserrat-Medium' }}>{item.name}</Text>
                    <View style={{ height: 24, width: 24, borderRadius: 12, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', }}>
                        <Image style={{ height: '70%', width: '70%' }} source={require('../../../../assets/icons/arrow.png')} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const onGetRoutines = async () => {
        const routineData = await routineHandler.onGetRoutines(storedCredentials.user.id, storedCredentials.token);
        if (routineData.status) {
            if (routineData.status !== 'SUCCESS') {
                ToastAndroid.show(routineData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                setRefreshing(false);
            } else {
                ToastAndroid.show(routineData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                setRoutines(routineData.data)
                console.log(routineData);
                setRefreshing(false);
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            console.log(routineData);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        onGetRoutines();
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 20, marginBottom: 20, backgroundColor: colors.background, elevation: 2 }}>
                <TouchableOpacity onPress={props.navigation.openDrawer} style={{ height: 24, width: 24 }}>
                    <Image style={{ height: '100%', width: '100%' }} source={require('../../../../assets/icons/drawer.png')} resizeMode={'contain'} />
                </TouchableOpacity>
            </View>
            <Text style={{ marginHorizontal: 20, color: colors.darkText, fontFamily: 'Montserrat-Bold', fontSize: 21, marginBottom: 20 }}>Rutinas</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={routines}
                renderItem={onRenderRoutineItem}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <TouchableOpacity onPress={() => props.navigation.navigate('RoutineAddView')} style={{ backgroundColor: colors.background, height: 50, width: 50, borderRadius: 25, elevation: 5, position: 'absolute', bottom: 25, right: 25, justifyContent: 'center', alignItems: 'center', }}>
                <Image style={{ height: '50%', width: '50%' }} source={require('../../../../assets/icons/add.png')} resizeMode={'contain'} />
            </TouchableOpacity>
        </View>
    );
}

export default RoutineIndexView;