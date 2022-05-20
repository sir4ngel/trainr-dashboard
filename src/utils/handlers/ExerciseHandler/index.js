import '../../../../global.js';
class ExerciseHandler {
    onGetExercises = async (user_id, token) => {
        try {
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/exercise/get?user_id=' + user_id, {
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

    onCreateExercise = async (exerciseData, token) => {
        try {
            var data = {
                data: {
                    "name": exerciseData.name,
                    "url": exerciseData.url,
                    "user_id": exerciseData.user_id
                }
            }
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/exercise/create', {
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

const exerciseHandler = new ExerciseHandler();

export default exerciseHandler;