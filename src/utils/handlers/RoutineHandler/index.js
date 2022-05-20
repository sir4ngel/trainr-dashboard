import '../../../../global.js';
class RoutineHandler {
    onGetRoutines = async (user_id, token) => {
        try {
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/routine/get?user_id=' + user_id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => res.json())
                .then(resData => {
                    return resData
                });
        } catch (error) {
            console.log(error);
        }
        return fetchedData;
    }

    onCreateRoutine = async (routineData, exercisesData, token) => {
        try {
            var data = {
                "routineData": routineData,
                "exercisesData": exercisesData
            }
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/routine/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(resData => {
                    return resData
                });
        } catch (error) {
            console.log(error);
        }
        return fetchedData;
    }

    onGetRoutineExercises = async (id, token) => {
        try {
            var data = {
                routine_id: id
            }
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/routine/exercises', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(resData => {
                    return resData
                });
        } catch (error) {
            console.log(error);
        }
        return fetchedData;
    }

    onEditRoutine = async (routineData, token) => {
        try {
            var data = {
                "routine_id": routineData.routine_id,
                "exercise_id": routineData.exercise_id,
                "data": routineData.routineData
            }
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/routine/edit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(resData => {
                    return resData
                });
        } catch (error) {
            console.log(error);
        }
        return fetchedData;
    }

    onSetRoutineToStudent = async (routineData, token) => {
        try {
            var data = {
                "user_id": routineData.user_id,
                "routine_id": routineData.routine_id,
                "classroom_id": routineData.classroom_id,
                "name": routineData.name,
                "exercises": routineData.exercises,
                "date": routineData.date
            }
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/routine/student/set', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(resData => {
                    return resData
                });
        } catch (error) {
            console.log(error);
        }
        return fetchedData;
    }
}

const routineHandler = new RoutineHandler();

export default routineHandler;