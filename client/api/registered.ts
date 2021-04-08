import Axios from 'axios';

async function getCode (email: string) {
    let data = new FormData();
    data.append('email', email);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/reg/emailCode', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

async function registered (username: string, password: string, email: string, emailCode: string) {
    let data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('email', email);
    data.append('emailCode', emailCode);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/reg/registered', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}


export {getCode, registered};
