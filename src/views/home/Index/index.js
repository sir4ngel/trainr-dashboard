import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image, FlatList, RefreshControl } from 'react-native';
import colors from '../../../../assets/Colors';
import { ClassroomContext } from '../../../utils/context/ClassroomContext';
import firestore from '@react-native-firebase/firestore';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';


const HomeIndexView = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const {classrooms, setClassrooms} = useContext(ClassroomContext);
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    useEffect(() => {
        console.log(storedCredentials);
    
      return () => {
        
      }
    }, [])
    

    const onRefresh = () => {
        setRefreshing(true);
        onGetClassrooms();
    };

    const onGetClassrooms = () => {
        firestore()
            .collection('Classrooms')
            .where('teacher', '==', user.authData.uid)
            .get()
            .then(querySnapshot => {
                // console.log(querySnapshot._docs[0]._data.students);
                setClassrooms(querySnapshot._docs);
                setRefreshing(false);
            })
            .catch((error) => console.log(error));
    };

    const onRenderClassItem = ({ item, index }) => {
        return (
            <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('ClassStack', {
                    title: item._data.name,
                    type: item._data.type,
                    code: item._ref._documentPath._parts,
                    students: item._data.students
                    // students: item.students
                })} style={{ overflow: 'hidden', height: 150, width: '100%', backgroundColor: colors.darkText, borderRadius: 10, elevation: 5 }}>
                    <Image style={{ height: '100%', width: '100%', position: 'absolute', opacity: 0.5 }} source={item.imagePath} />
                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', height: '100%', width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <View>
                            <Text style={{ width: '90%', color: colors.whiteText, fontFamily: 'Montserrat-SemiBold', fontSize: 20 }} numberOfLines={1}>{item._data.name}</Text>
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
                            <Text style={{ color: colors.whiteText, fontFamily: 'Montserrat-Regular' }} numberOfLines={1}>{item._data.type}</Text>
                        </View>
                        {/* <Text style={{ color: colors.whiteText, fontFamily: 'Montserrat-Regular' }}>{item.students.length} / 10 alumnos</Text> */}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
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