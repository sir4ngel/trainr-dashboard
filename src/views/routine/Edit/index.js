import React, { useEffect, useContext, Component } from 'react';
import { View, Text, ToastAndroid, FlatList, TouchableOpacity, Image, Modal, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';
import routineHandler from '../../../utils/handlers/RoutineHandler';
import colors from '../../../../assets/Colors';
import { RoutinesContext } from '../../../utils/context/RoutinesContext';

const RoutineEditViewWithCredentials = (props) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { routines, setRoutines } = useContext(RoutinesContext);
    return (
        <RoutineEditView storedCredentials={storedCredentials} navigation={props.navigation} routines={routines} setRoutines={setRoutines} id={props.route.params.id} />
    )
};

class RoutineEditView extends Component {

    constructor() {
        super();
        this.state = {
            exercises: [],
            modalVisible: false,
            name: '',
            url: '',
            reps: 1,
            sets: 1,
            weights: [],
            exercise_id: 0,
            loading: true
        };
    };

    componentDidMount() {
        this.onGetRoutineExercises();
    };

    componentWillUnmount() {
        this.setState({
            exercises: [],
            modalVisible: false,
            name: '',
            url: '',
            reps: 1,
            sets: 1,
            weights: [],
            exercise_id: 0
        });
    };

    onGetRoutineExercises = async () => {
        const routineData = await routineHandler.onGetRoutineExercises(this.props.id, this.props.storedCredentials.token);
        if (routineData.status) {
            if (routineData.status !== 'SUCCESS') {
                ToastAndroid.show(routineData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                this.setState({
                    loading: false
                });
            } else {
                this.setState({
                    exercises: routineData.data,
                    loading: false
                });
                console.log(routineData);
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            this.setState({
                loading: false
            });
            console.log(routineData);
        }
    };

    onRenderExerciseItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            this.setState({
                modalVisible: true,
                name: item.name,
                url: item.url,
                reps: item.pivot.reps,
                sets: item.pivot.sets,
                weights: JSON.parse(item.pivot.weights),
                exercise_id: item.id
            });
        }} style={{ backgroundColor: colors.white, elevation: 2, margin: 5, padding: 10, borderRadius: 5 }}>
            <Text style={{ color: colors.primaryTitle }}>{item.name}</Text>
            {/* <Text style={{ color: colors.primaryTitle }}>{item.url}</Text>
            <Text style={{ color: colors.primaryTitle }}>{item.pivot.reps}</Text>
            <Text style={{ color: colors.primaryTitle }}>{item.pivot.sets}</Text>
            {
                JSON.parse(item.pivot.weights).map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                        <Text style={{ color: colors.primaryTitle }}>{item.weight}</Text>
                        <Text style={{ color: colors.primaryTitle }}>{item.unity}</Text>
                    </View>
                ))
            } */}
        </TouchableOpacity>
    );

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
                    const weights = this.state.weights;
                    weights.pop();
                    this.setState({ sets: this.state.sets - 1, weights: weights });
                }
            }
        } else {
            if (bType === 'reps') {
                this.setState({ reps: this.state.reps + 1 });
            } else {
                const weights = this.state.weights;
                weights.push({ weight: 0, unity: 'lb' });
                this.setState({ sets: this.state.sets + 1, weights: weights });
            }
        }
    };

    onHandleWeightQuantityButton = (type, index) => {
        const weights = this.state.weights;
        if (type === '-') {
            if (weights[index].weight === -1) {
                ToastAndroid.show('Escoge una cantidad adecuada', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            } else {
                weights[index].weight = weights[index].weight - 1;
                this.setState({
                    weights: weights
                });
            }
        } else {
            weights[index].weight = weights[index].weight + 1;
            this.setState({
                weights: weights
            });
        }
    };

    onEditRoutine = async () => {
        const data = {
            routine_id: this.props.id,
            exercise_id: this.state.exercise_id,
            routineData: {
                reps: this.state.reps,
                sets: this.state.sets,
                weights: this.state.weights
            }
        };

        const routineData = await routineHandler.onEditRoutine(data, this.props.storedCredentials.token);
        if (routineData.status) {
            if (routineData.status !== 'SUCCESS') {
                ToastAndroid.show(routineData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                this.props.navigation.goBack();
            } else {
                ToastAndroid.show(routineData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                // this.props.setRoutines(routineData.data);
                this.setState({
                    modalVisible: !this.state.modalVisible
                })
                this.onGetRoutineExercises();
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            console.log(routineData);
            this.props.navigation.goBack();
        };
    };

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator color={colors.primaryTitle} size={'large'} />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <Modal animationType="slide" transparent={true} visible={this.state.modalVisible} onRequestClose={() => this.setState({ modalVisible: !this.state.modalVisible })}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Pressable onPress={() => this.setState({ modalVisible: !this.state.modalVisible })} style={{ height: '100%', width: '100%', backgroundColor: '#000000AA', }} />
                        <View style={{ backgroundColor: colors.background, borderRadius: 5, elevation: 5, padding: 30, position: 'absolute', alignSelf: 'center', alignItems: 'center', }}>
                            <Text style={{ color: colors.primaryTitle, backgroundColor: '#F5F5F5', paddingHorizontal: 15, paddingVertical: 5, marginBottom: 10, borderRadius: 5, fontFamily: 'Montserrat-ExtraBold', maxWidth: 200 }} numberOfLines={1}>{this.state.name}</Text>
                            <Text style={{ color: colors.primaryTitle, backgroundColor: '#F5F5F5', paddingHorizontal: 15, paddingVertical: 5, marginBottom: 10, borderRadius: 5, fontFamily: 'Montserrat-Medium', maxWidth: 200 }} numberOfLines={1}>{this.state.url}</Text>
                            <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => this.onHandleQuantityButton('-', 'reps')} style={{ height: 26, width: 26, marginRight: 10, backgroundColor: 'white', elevation: 2, borderRadius: 13, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ height: '80%', width: '80%', tintColor: colors.primaryTitle }} source={require('../../../../assets/icons/minus.png')} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular', marginRight: 10 }}>{this.state.reps}</Text>
                                <TouchableOpacity onPress={() => this.onHandleQuantityButton('+', 'reps')} style={{ height: 26, width: 26, marginRight: 10, backgroundColor: 'white', elevation: 2, borderRadius: 13, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ height: '80%', width: '80%', tintColor: colors.primaryTitle }} source={require('../../../../assets/icons/add.png')} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular' }}>reps</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => this.onHandleQuantityButton('-', 'sets')} style={{ height: 26, width: 26, marginRight: 10, backgroundColor: 'white', elevation: 2, borderRadius: 13, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ height: '80%', width: '80%', tintColor: colors.primaryTitle }} source={require('../../../../assets/icons/minus.png')} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular', marginRight: 10 }}>{this.state.sets}</Text>
                                <TouchableOpacity onPress={() => this.onHandleQuantityButton('+', 'sets')} style={{ height: 26, width: 26, marginRight: 10, backgroundColor: 'white', elevation: 2, borderRadius: 13, justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ height: '80%', width: '80%', tintColor: colors.primaryTitle }} source={require('../../../../assets/icons/add.png')} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular' }}>series</Text>
                            </View>
                            <View style={{ height: 150, marginBottom: 15, backgroundColor: '#F3F3F3', borderRadius: 5, padding: 10 }}>
                                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Bold', fontSize: 16 }}>Peso</Text>
                                <ScrollView showsVerticalScrollIndicator >
                                    {this.state.weights.map((item, index) => (
                                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 5 }}>
                                            <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Bold' }}>Serie {index + 1} </Text>
                                            {
                                                item.weight !== -1 &&
                                                <TouchableOpacity onPress={() => this.onHandleWeightQuantityButton('-', index)} style={{ height: 26, width: 26, marginRight: 10, backgroundColor: 'white', elevation: 2, borderRadius: 13, justifyContent: 'center', alignItems: 'center', }}>
                                                    <Image style={{ height: '80%', width: '80%', tintColor: colors.primaryTitle }} source={require('../../../../assets/icons/minus.png')} resizeMode={'contain'} />
                                                </TouchableOpacity>
                                            }
                                            <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular', marginRight: 10 }}>{item.weight === -1 ? 'Bodyweight' : item.weight === 0 ? 'Sin peso' : item.weight + ' ' + item.unity}</Text>
                                            <TouchableOpacity onPress={() => this.onHandleWeightQuantityButton('+', index)} style={{ height: 26, width: 26, marginRight: 10, backgroundColor: 'white', elevation: 2, borderRadius: 13, justifyContent: 'center', alignItems: 'center', }}>
                                                <Image style={{ height: '80%', width: '80%', tintColor: colors.primaryTitle }} source={require('../../../../assets/icons/add.png')} resizeMode={'contain'} />
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                    }
                                </ScrollView>
                            </View>
                            <TouchableOpacity onPress={this.onEditRoutine} style={{ backgroundColor: colors.primaryTitle, borderRadius: 4, padding: 10, alignItems: 'center', }}>
                                <Text style={{ color: colors.white, fontFamily: 'Montserrat-Bold', }}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'space-between' }}>
                    <View>
                        <TouchableOpacity onPress={this.props.navigation.goBack} style={{ height: 30, width: 30, backgroundColor: colors.white, borderRadius: 15, elevation: 5, justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                            <Image style={{ height: '70%', width: '70%' }} source={require('../../../../assets/icons/close.png')} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <FlatList
                            style={{ paddingTop: 5 }}
                            showsVerticalScrollIndicator={false}
                            data={this.state.exercises}
                            renderItem={this.onRenderExerciseItem}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={{ marginBottom: 20, alignSelf: 'center' }}>
                            <Text style={{ color: 'red', fontFamily: 'Montserrat-Regular' }}>Eliminar rutina</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default RoutineEditViewWithCredentials;