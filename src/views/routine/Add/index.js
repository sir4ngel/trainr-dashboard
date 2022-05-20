import React, { Component, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal, Pressable, Alert, ToastAndroid, ScrollView } from 'react-native';
import colors from '../../../../assets/Colors';
import { Picker } from '@react-native-picker/picker';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';
import { RoutinesContext } from '../../../utils/context/RoutinesContext';
import exerciseHandler from '../../../utils/handlers/ExerciseHandler';
import routineHandler from '../../../utils/handlers/RoutineHandler';

const RoutineAddViewWithCredentials = (props) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { routines, setRoutines } = useContext(RoutinesContext);
    return (
        <RoutineAddView storedCredentials={storedCredentials} navigation={props.navigation} routines={routines} setRoutines={setRoutines} />
    )
};

class RoutineAddView extends Component {

    constructor() {
        super();
        this.state = {
            dataExercises: [],
            exercises: [],
            exercisesWeights: [],
            routine: {},
            name: '',
            exercise: 0,
            indexExercise: 0,
            modalVisible: false,
            reps: 1,
            sets: 1
        };
    }

    componentWillUnmount() {
        this.setState({
            dataExercises: [],
            exercises: [],
            exercisesWeights: [],
            routine: {},
            name: '',
            exercise: 0,
            indexExercise: 0,
            modalVisible: false,
            reps: 1,
            sets: 1
        });
    };

    componentDidMount() {
        this.onGetExercises();
    };

    onGetExercises = async () => {
        const exerciseData = await exerciseHandler.onGetExercises(this.props.storedCredentials.user.id, this.props.storedCredentials.token);
        if (exerciseData.status) {
            if (exerciseData.status !== 'SUCCESS') {
                ToastAndroid.show(exerciseData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            } else {
                this.setState({
                    dataExercises: exerciseData.data,
                    exercise: exerciseData.data.length === 0 ? 0 : exerciseData.data[0].id,
                    indexExercise: exerciseData.data.length === 0 ? null : 0,
                    exercisesWeights: [
                        {
                            weight: 0,
                            unity: 'lb'
                        }
                    ]
                });
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            console.log(exerciseData);
        }
    };

    onAddExercise = () => {
        if (this.state.exercise === 0 && this.state.indexExercise === null) {
            ToastAndroid.show('Crea ejercicios para continuar', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else {
            const exercises = this.state.exercises;
            // console.log(this.state.exercisesWeights);
            exercises.push({ exercise_id: this.state.exercise, name: this.state.dataExercises[this.state.indexExercise].name, reps: this.state.reps, sets: this.state.sets, weights: this.state.exercisesWeights });
            // this.state.exercises.push({ id: this.state.exercise, name: this.state.dataExercises[this.state.indexExercise].name, reps: this.state.reps, sets: this.state.sets });
            console.log(this.state.exercise);
            this.setState({
                exercises: exercises,
                modalVisible: !this.state.modalVisible,
                reps: 1,
                sets: 1,
                exercise: this.state.dataExercises.length !== 0 ? this.state.dataExercises[0].id : 0,
                indexExercise: this.state.dataExercises.length !== 0 ? 0 : null,
                exercisesWeights: [{ weight: 0, unity: 'lb' }]
            });
        }
    };

    onHandleQuantityButton = (qType, bType) => {
        if (qType === '-') {
            if (bType === 'reps') {
                if (this.state.reps <= 1) {
                    ToastAndroid.show('La cantidad minima de repeticiones es 1', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                } else {
                    this.setState({ reps: this.state.reps - 1 });
                }
            } else {
                if (this.state.sets <= 1) {
                    ToastAndroid.show('La cantidad minima de series es 1', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                } else {
                    const weights = this.state.exercisesWeights;
                    weights.pop();
                    this.setState({ sets: this.state.sets - 1, exercisesWeights: weights });
                }
            }
        } else {
            if (bType === 'reps') {
                this.setState({ reps: this.state.reps + 1 });
            } else {
                const weights = this.state.exercisesWeights;
                weights.push({ weight: 0, unity: 'lb' });
                this.setState({ sets: this.state.sets + 1, exercisesWeights: weights });
            }
        }
    };

    onHandleWeightButtom = () => {
        if (this.state.isWeighted) {
            this.setState({
                isWeighted: false
            });
        } else {
            this.setState({
                isWeighted: true
            });
        };
    };

    onHandleWeightQuantityButton = (type, index) => {
        const weights = this.state.exercisesWeights;
        if (type === '-') {
            if (weights[index].weight === -1) {
                ToastAndroid.show('Escoge una cantidad adecuada', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            } else {
                weights[index].weight = weights[index].weight - 1;
                this.setState({
                    exercisesWeights: weights
                });
            }
        } else {
            weights[index].weight = weights[index].weight + 1;
            this.setState({
                exercisesWeights: weights
            });
        }
    };

    onHandleCreateButton = () => {
        if (!this.state.name) {
            ToastAndroid.show('Escribe un nombre para continuar', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else if (this.state.exercises.length === 0) {
            ToastAndroid.show('Agrega ejercicios para continuar', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        } else {
            this.onCreateRoutine();
        }
    };

    onCreateRoutine = async() => {
        const data = {
            routineData: {
                user_id: this.props.storedCredentials.user.id,
                name: this.state.name
            },
            exercisesData: this.state.exercises
        };

        const routineData = await routineHandler.onCreateRoutine(data.routineData, data.exercisesData, this.props.storedCredentials.token);
        if (routineData.status) {
            if (routineData.status !== 'SUCCESS') {
                ToastAndroid.show(routineData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                this.props.navigation.goBack();
            } else {
                ToastAndroid.show(routineData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                this.props.setRoutines(routineData.data);
                this.props.navigation.goBack();
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            console.log(routineData);
            this.props.navigation.goBack();
        }
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <Modal animationType="slide" transparent={true} visible={this.state.modalVisible} onRequestClose={() => { Alert.alert('Modal has been closed.'); this.setState({ modalVisible: !this.state.modalVisible }); }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Pressable onPress={() => this.setState({ modalVisible: !this.state.modalVisible })} style={{ height: '100%', width: '100%', backgroundColor: '#000000AA', }} />
                        <View style={{ backgroundColor: colors.background, borderRadius: 5, elevation: 5, padding: 30, position: 'absolute', alignSelf: 'center', }}>
                            <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-ExtraBold', marginBottom: 15, fontSize: 16, }}>Agregar ejercicio</Text>
                            <Picker selectedValue={this.state.exercise} onValueChange={(itemValue, itemIndex) => this.setState({ exercise: itemValue, indexExercise: itemIndex })} style={{ color: colors.primaryTitle, backgroundColor: '#F5F5F5', marginBottom: 15, width: 250 }} dropdownIconColor={colors.primaryTitle}>
                                {
                                    this.state.dataExercises.map((item, index) => (
                                        <Picker.Item key={index} label={item.name} value={item.id} />
                                    ))
                                }
                            </Picker>
                            <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => this.onHandleQuantityButton('-', 'reps')} style={{ height: 26, width: 26, marginRight: 10, backgroundColor: 'white', elevation: 5, borderRadius: 13, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ height: '80%', width: '80%', tintColor: colors.primaryTitle }} source={require('../../../../assets/icons/minus.png')} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular', marginRight: 10 }}>{this.state.reps}</Text>
                                <TouchableOpacity onPress={() => this.onHandleQuantityButton('+', 'reps')} style={{ height: 26, width: 26, marginRight: 10, backgroundColor: 'white', elevation: 5, borderRadius: 13, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ height: '80%', width: '80%', tintColor: colors.primaryTitle }} source={require('../../../../assets/icons/add.png')} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular' }}>reps</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => this.onHandleQuantityButton('-', 'sets')} style={{ height: 26, width: 26, marginRight: 10, backgroundColor: 'white', elevation: 5, borderRadius: 13, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ height: '80%', width: '80%', tintColor: colors.primaryTitle }} source={require('../../../../assets/icons/minus.png')} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular', marginRight: 10 }}>{this.state.sets}</Text>
                                <TouchableOpacity onPress={() => this.onHandleQuantityButton('+', 'sets')} style={{ height: 26, width: 26, marginRight: 10, backgroundColor: 'white', elevation: 5, borderRadius: 13, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ height: '80%', width: '80%', tintColor: colors.primaryTitle }} source={require('../../../../assets/icons/add.png')} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular' }}>series</Text>
                            </View>
                            <View style={{ height: 150, marginBottom: 15 }}>
                                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-ExtraBold', fontSize: 16, marginLeft: 10, marginTop: 10 }}>Peso</Text>
                                <ScrollView>
                                    {this.state.exercisesWeights.map((item, index) => (
                                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 5 }}>
                                            <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Bold' }}>Serie {index + 1} </Text>
                                            {
                                                item.weight !== -1 &&
                                                <TouchableOpacity onPress={() => this.onHandleWeightQuantityButton('-', index)} style={{ height: 26, width: 26, marginRight: 10, backgroundColor: 'white', elevation: 5, borderRadius: 13, justifyContent: 'center', alignItems: 'center', }}>
                                                    <Image style={{ height: '80%', width: '80%', tintColor: colors.primaryTitle }} source={require('../../../../assets/icons/minus.png')} resizeMode={'contain'} />
                                                </TouchableOpacity>
                                            }
                                            <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular', marginRight: 10 }}>{item.weight === -1 ? 'Bodyweight' : item.weight === 0 ? 'Sin peso' : item.weight + ' ' + item.unity}</Text>
                                            <TouchableOpacity onPress={() => this.onHandleWeightQuantityButton('+', index)} style={{ height: 26, width: 26, marginRight: 10, backgroundColor: 'white', elevation: 5, borderRadius: 13, justifyContent: 'center', alignItems: 'center', }}>
                                                <Image style={{ height: '80%', width: '80%', tintColor: colors.primaryTitle }} source={require('../../../../assets/icons/add.png')} resizeMode={'contain'} />
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                    }
                                </ScrollView>
                            </View>
                            <TouchableOpacity onPress={this.onAddExercise} style={{ backgroundColor: '#50C878', borderRadius: 2, padding: 10, alignItems: 'center', }}>
                                <Text style={{ color: colors.white, fontFamily: 'Montserrat-Bold', }}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 }}>
                            <TouchableOpacity onPress={this.props.navigation.goBack} style={{ height: 30, width: 30, backgroundColor: colors.white, borderRadius: 15, elevation: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ height: '70%', width: '70%' }} source={require('../../../../assets/icons/close.png')} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onHandleCreateButton} style={{ backgroundColor: colors.primaryTitle, borderRadius: 5, elevation: 5, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                <Text style={{ color: colors.white, fontFamily: 'Montserrat-ExtraBold' }}>Crear</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ marginBottom: 20, color: colors.primaryTitle, fontSize: 25, fontFamily: 'Montserrat-ExtraBold' }}>Crear una rutina</Text>
                        <TextInput onChangeText={(value) => this.setState({
                            name: value
                        })} style={{ borderWidth: 1, backgroundColor: '#F3F3F3', borderColor: '#F5F5F5', paddingHorizontal: 20, color: colors.primaryTitle, fontFamily: 'Montserrat-Medium' }} placeholder={'Nombre de la rutina'} placeholderTextColor={'gray'} />
                        <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular', marginBottom: 20 }}>e.j. Tren superior, tren inferior, rutina de Juan.</Text>
                        {
                            this.state.exercises.map((item, index) => (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, alignItems: 'center', }}>
                                    <View>
                                        <Text style={{ color: colors.primaryTitle }}>{item.name}</Text>
                                        <Text style={{ color: colors.primaryTitle }}>{item.reps} reps x {item.sets} series</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            {
                                                item.weights.map((item, index) => (
                                                    <View key={index} style={{ marginRight: 5 }}>
                                                        <Text style={{ color: colors.primaryTitle }}>{item.weight === -1 ? 'Bodyweight' : item.weight === 0 ? 'Sin peso' : item.weight + 'lb'}</Text>
                                                    </View>
                                                ))
                                            }
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        const splicedExercises = this.state.exercises;
                                        splicedExercises.splice(index, 1);
                                        this.setState({ exercises: splicedExercises });
                                    }} style={{ height: 24, width: 24 }}>
                                        <Image style={{ height: '100%', width: '100%', tintColor: 'red' }} source={require('../../../../assets/icons/minus.png')} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
                            <Image style={{ height: 24, width: 24, marginRight: 5 }} source={require('../../../../assets/icons/add.png')} resizeMode={'contain'} />
                            <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular' }}>Agregar ejercicio</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default RoutineAddViewWithCredentials;