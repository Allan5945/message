import Axios from 'axios';

async function getCode (email: string) {
    let data = new FormData();
    data.append('email', email);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/rep/repCode', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

async function retrievePassword (email: string, password: string, repCode: string) {
    let data = new FormData();
    data.append('password', password);
    data.append('email', email);
    data.append('repCode', repCode);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/rep/retrievePassword', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}


export {getCode, retrievePassword};
