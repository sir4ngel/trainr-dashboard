import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image, FlatList, RefreshControl, ToastAndroid, ActivityIndicator } from 'react-native';
import { LoadingContext } from '../../../utils/context/LoadingContext';
import colors from '../../../../assets/Colors';
import { ClassroomContext } from '../../../utils/context/ClassroomContext';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';
import classroomHandler from '../../../utils/handlers/ClassroomHandler';


const HomeIndexView = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const { classrooms, setClassrooms } = useContext(ClassroomContext);
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { loading, setLoading } = useContext(LoadingContext);

    const onRefresh = () => {
        setRefreshing(true);
        onGetClassrooms();
    };

    const onGetClassrooms = async () => {
        const classroomData = await classroomHandler.onGetClassrooms(storedCredentials.user.id, storedCredentials.token);
        if (classroomData.status) {
            if (classroomData.status !== 'SUCCESS') {
                ToastAndroid.show(classroomData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                setRefreshing(false);
            } else {
                ToastAndroid.show(classroomData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                setClassrooms(classroomData.data)
                console.log(classroomData);
                setRefreshing(false);
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            console.log(classroomData);
            setRefreshing(false);
        }
    };

    const onRenderClassItem = ({ item, index }) => {
        return (
            <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('ClassStack', {
                    name: item.name,
                    type: item.type,
                    code: item.code,
                    id: item.id
                })} style={{ overflow: 'hidden', height: 150, width: '100%', backgroundColor: colors.primaryTitle, borderRadius: 10, elevation: 5 }}>
                    <Image style={{ height: '100%', width: '100%', position: 'absolute', opacity: 0.5 }} source={item.imagePath} />
                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%', width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <View>
                            <Text style={{ width: '90%', color: colors.white, fontFamily: 'Montserrat-SemiBold', fontSize: 20 }} numberOfLines={1}>{item.name}</Text>
                            {/* <TouchableOpacity style={{ width: '10%', }} >
                                    <Image style={{ height: 24, width: 24, tintColor: colors.whiteText }} source={require('../../../../assets/icons/dots.png')} resizeMode={'contain'} />
                                </TouchableOpacity> */}
                            {/* <View style={{ width: '10%' }}>
                                    <Menu>
                                        <MenuTrigger>
                                            <Image style={{ height: 24, width: 24, tintColor: colors.whiteText }} source={require('../../../../assets/icons/dots.png')} resizeMode={'contain'} />
                                        </MenuTrigger>
                                        <MenuOptions customStyles={{
                                            optionWrapper: {
                                                padding: 15
                                            },
                                            optionText: {
                                                fontSize: 16
                                            }
                                        }}>
                                            <MenuOption onSelect={() => props.navigation.navigate('ClassStack')} text='Ajustes' />
                                        </MenuOptions>
                                    </Menu>
                                </View> */}
                            <Text style={{ color: colors.white, fontFamily: 'Montserrat-Regular' }} numberOfLines={1}>{item.type}</Text>
                        </View>
                        {/* <Text style={{ color: colors.whiteText, fontFamily: 'Montserrat-Regular' }}>{item.students.length} / 10 alumnos</Text> */}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', }}>
                <StatusBar barStyle='dark-content' backgroundColor={colors.background} translucent={false} />
                <ActivityIndicator color={colors.primaryTitle} size={'large'} />
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.background} translucent={false} />
            <View style={{ paddingHorizontal: 20, paddingVertical: 20, marginBottom: 10, backgroundColor: colors.background, elevation: 2 }}>
                <TouchableOpacity onPress={props.navigation.openDrawer} style={{ height: 24, width: 24 }}>
                    <Image style={{ height: '100%', width: '100%' }} source={require('../../../../assets/icons/drawer.png')} resizeMode={'contain'} />
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={classrooms}
                renderItem={onRenderClassItem}
                keyExtractor={(item, index) => index}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <TouchableOpacity style={{ bottom: 25, right: 25, backgroundColor: 'white', height: 50, width: 50, elevation: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 25, position: 'absolute' }} onPress={() => props.navigation.navigate('HomeAddView')}>
                <Image style={{ height: '50%', width: '50%' }} source={require('../../../../assets/icons/add.png')} resizeMode={'contain'} />
            </TouchableOpacity>
        </View>
    );
}

export default HomeIndexView;