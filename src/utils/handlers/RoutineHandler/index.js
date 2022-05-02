import '../../../../global.js';
class RoutineHandler {
    onGetRoutines = async (user_id, token) => {
        try {
            var data = {
                "user_id": user_id
            }
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/routine/get', {
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

    onEditExercise = async (id, exerciseData, token) => {
        try {
            var data = {
                exercise_id: id,
                data: {
                    "name": exerciseData.name,
                    "url": exerciseData.url,
                    "user_id": exerciseData.user_id
                }
            }
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/exercise/edit', {
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