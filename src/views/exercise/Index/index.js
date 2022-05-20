import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl, ToastAndroid, ActivityIndicator } from 'react-native';
import exerciseHandler from '../../../utils/handlers/ExerciseHandler';
import colors from '../../../../assets/Colors';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';
import { ExercisesContext } from '../../../utils/context/ExercisesContext';
import { LoadingContext } from '../../../utils/context/LoadingContext';

const ExerciseIndexView = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const { exercises, setExercises } = useContext(ExercisesContext)
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { loading, setLoading } = useContext(LoadingContext)

    const onGetExercises = async () => {
        const exerciseData = await exerciseHandler.onGetExercises(storedCredentials.user.id, storedCredentials.token);
        if (exerciseData.status) {
            if (exerciseData.status !== 'SUCCESS') {
                ToastAndroid.show(exerciseData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                setRefreshing(false);
            } else {
                ToastAndroid.show(exerciseData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                setExercises(exerciseData.data)
                console.log(exerciseData);
                setRefreshing(false);
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            console.log(exerciseData);
            setRefreshing(false);
        }
    };

    const onRenderExerciseItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('ExerciseEditView', {
                id: item.id,
                name: item.name,
                url: item.url
            })} style={{ backgroundColor: colors.background, elevation: 1, marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 15, borderRadius: 5, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Medium' }}>{item.name}</Text>
                    <View style={{ height: 24, width: 24, borderRadius: 12, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', }}>
                        <Image style={{ height: '70%', width: '70%' }} source={require('../../../../assets/icons/arrow.png')} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const onRefresh = () => {
        setRefreshing(true);
        onGetExercises();
    };
    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator color={colors.primaryTitle} size={'large'} />
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 20, marginBottom: 20, backgroundColor: colors.background, elevation: 2 }}>
                <TouchableOpacity onPress={props.navigation.openDrawer} style={{ height: 24, width: 24 }}>
                    <Image style={{ height: '100%', width: '100%' }} source={require('../../../../assets/icons/drawer.png')} resizeMode={'contain'} />
                </TouchableOpacity>
            </View>
            <Text style={{ marginHorizontal: 20, color: colors.primaryTitle, fontFamily: 'Montserrat-Bold', fontSize: 21, marginBottom: 20 }}>Ejercicios</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={exercises}
                renderItem={onRenderExerciseItem}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <TouchableOpacity onPress={() => props.navigation.navigate('ExerciseAddView')} style={{ backgroundColor: colors.background, height: 50, width: 50, borderRadius: 25, elevation: 5, position: 'absolute', bottom: 25, right: 25, justifyContent: 'center', alignItems: 'center', }}>
                <Image style={{ height: '50%', width: '50%' }} source={require('../../../../assets/icons/add.png')} resizeMode={'contain'} />
            </TouchableOpacity>
        </View>
    );
}

export default ExerciseIndexView;