import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../../../../../assets/Colors';
import firestore from '@react-native-firebase/firestore';

const HomeClassSettingsView = (props) => {

    const onAddStudent = () => {
        firestore()
        .collection('Classrooms')
        .doc('nHJ24AfPVwyA29V2dZkD')
        .update({
          students: firestore.FieldValue.arrayUnion({
              name: 'Angel',
              lastName: 'Garcia',
              birthday: '1999-05-24',
              routine: '',
              id: 'mUYTqrog23OAiVeytXUNPZUuMig1'
          })
        })
        .then(() => {
          console.log('User updated!');
        })
        .catch((error) => console.log(error));
        
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ height: '100%', width: '100%', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', marginVertical: 20, alignItems: 'center', }}>
                    <Text style={{ color: colors.darkText, fontSize: 20, fontFamily: 'Montserrat-Bold', marginRight: 10 }}>{props.title}</Text>
                    <TouchableOpacity>
                        <Image style={{ height: 20, width: 20 }} source={require('../../../../../assets/icons/edit.png')} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                    <Text style={{ color: colors.darkText, fontSize: 16, fontFamily: 'Montserrat-Medium', marginRight: 10 }}>{props.type}</Text>
                    <TouchableOpacity>
                        <Image style={{ height: 20, width: 20 }} source={require('../../../../../assets/icons/edit.png')} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                    <Text style={{ color: colors.darkText, fontSize: 16, fontFamily: 'Montserrat-Medium', marginRight: 10 }}>Codigo: {props.code[1]}</Text>
                    <TouchableOpacity>
                        <Image style={{ height: 20, width: 20 }} source={require('../../../../../assets/icons/copy.png')} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                {/* <Text style={{ color: colors.darkText, fontFamily: 'Montserrat-Medium' }}>Codigo: {props.code[1]}</Text> */}
                <TouchableOpacity onPress={onAddStudent} style={{ position: 'absolute', alignSelf: 'center', bottom: 25 }}>
                    <Text style={{ color: colors.darkText, fontSize: 14, fontFamily: 'Montserrat-Regular', color: 'red' }}>Eliminar clase</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeClassSettingsView;