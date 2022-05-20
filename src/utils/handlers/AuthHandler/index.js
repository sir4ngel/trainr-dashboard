import '../../../../global.js';
class AuthHandler{
    onLogin = async(email, password) => {
        try {
            var data ={
                "email": email,
                "password": password
            }
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/login/trainer', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }) .then(res => res.json())
            .then(resData => {
                return resData
            });
        } catch (error) {
            console.log(error);
        }
        return fetchedData;
    }

    onRegister = async(authData) => {
        try {
            var data ={
                "first_name": authData.first_name,
                "last_name": authData.last_name,
                "role": 1,
                "email": authData.email,
                "password": authData.password,
                "password_confirmation": authData.password_confirmation
            }
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }) .then(res => res.json())
            .then(resData => {
                return resData
            });
        } catch (error) {
            console.log(error);
        }
        return fetchedData;
    }
}

const authHandler = new AuthHandler();

export default authHandler;