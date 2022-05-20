import '../../../../global.js';
class ClassroomHandler {
    onGetClassrooms = async (user_id, token) => {
        try {
            var data = {
                "user_id": user_id
            }
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/classroom/get?user_id=' + user_id, {
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

    onCreateClassroom = async (classroomData, token) => {
        try {
            var data = {
                data: {
                    "name": classroomData.name,
                    "type": classroomData.type,
                    "code": classroomData.code,
                    "user_id": classroomData.user_id
                }
            }
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/classroom/create', {
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

    onEditClassroom = async (classroomData, token) => {
        try {
            var data = {
                classroom_id: classroomData.id,
                data: {
                    "name": classroomData.name,
                    "type": classroomData.type,
                    "user_id": classroomData.user_id
                }
            }
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/classroom/edit', {
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

    onGetStudents = async (classroom_id, token) => {
        try {
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/classroom/students/get?classroom_id=' + classroom_id, {
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
}

const classroomHandler = new ClassroomHandler();

export default classroomHandler;