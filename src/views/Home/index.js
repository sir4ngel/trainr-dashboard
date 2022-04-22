import React, {useContext} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AuthContext from '../../utils/context/AuthContext';

const HomeView = () => {
    const auth = useContext(AuthContext)
    const logOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Text>Home view</Text>
            <TouchableOpacity onPress={logOut}>
                <Text>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HomeView;