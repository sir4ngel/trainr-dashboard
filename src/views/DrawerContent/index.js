import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Share } from 'react-native';
import colors from '../../../assets/Colors';
import { CredentialsContext } from '../../utils/context/CredentialsContext';

export function DrawerContent(props) {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    const logOut = async () => {
        AsyncStorage.removeItem('credentials')
            .then(() => {
                setStoredCredentials("");
            }).catch(error => console.log(error))
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={{
            }}>
                <View style={{ padding: 20, alignItems: 'center', }}>
                    <Image source={require('../../../assets/icons/user2.png')} style={{ height: 70, width: 70, marginBottom: 10, tintColor: colors.primaryTitle }} resizeMode={'contain'}></Image>
                    <Text style={{ color: colors.primaryTitle, fontSize: 18, fontFamily: 'Montserrat-Medium' }}>{storedCredentials.user.first_name} {storedCredentials.user.last_name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ height: 22, width: 22, marginRight: 5 }}>
                            <Image style={{ height: '100%', width: '100%' }} source={require('../../../assets/icons/email.png')} resizeMode='contain'></Image>
                        </View>
                        <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular', alignSelf: 'center', }}>{storedCredentials.user.email}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: colors.white, paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <Text style={{ alignSelf: 'center', fontFamily: 'Montserrat-Medium', color: colors.primaryTitle, marginBottom: 5 }}>Version 1.0.0</Text>
            <View style={{ padding: 20, borderTopWidth: 0.5, borderTopColor: '#ccc' }}>
                <TouchableOpacity style={{ paddingVertical: 15 }} onPress={onShare}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ height: 22, width: 22, marginRight: 5 }}>
                            <Image style={{ height: '100%', width: '100%' }} source={require('../../../assets/icons/share.png')} resizeMode='contain'></Image>
                        </View>
                        <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Medium', color: colors.primaryTitle, marginLeft: 5 }}>Compartir</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 15 }} onPress={logOut}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ height: 22, width: 22, marginRight: 5 }}>
                            <Image style={{ height: '100%', width: '100%' }} source={require('../../../assets/icons/logout.png')} resizeMode='contain'></Image>
                        </View>
                        <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Medium', color: colors.primaryTitle, marginLeft: 5 }}>Cerrar sesión</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});