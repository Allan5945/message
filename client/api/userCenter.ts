import Axios from 'axios';

async function getFriends () {
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/getFriends')
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
async function getUser (id ? : number) {
    let data = new FormData();
    // @ts-ignore
    data.append('id', id);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/getUser', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
async function getUserByCode (code : number) {
    let data = new FormData();
    // @ts-ignore
    data.append('code', code);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/getUserByCode', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
async function addFriend (id : number) {
    let data = new FormData();
    // @ts-ignore
    data.append('applyId', id);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/addFriend', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

async function getApplyFriendsList () {
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/getApplyFriendsList')
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

async function refusedAdd (id: number) {
    let data = new FormData();
    // @ts-ignore
    data.append('id', id);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/refusedAdd', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
async function ignoreAdd (id: number) {
    let data = new FormData();
    // @ts-ignore
    data.append('id', id);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/ignoreAdd', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
async function agreeFriend (id: number) {
    let data = new FormData();
    // @ts-ignore
    data.append('id', id);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/agreeFriend', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
async function getUserAndRelation (id: number) {
    let data = new FormData();
    // @ts-ignore
    data.append('id', id);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/getUserAndRelation', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
async function block (id: number) {
    let data = new FormData();
    // @ts-ignore
    data.append('id', id);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/block', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
async function unBlock (id: number) {
    let data = new FormData();
    // @ts-ignore
    data.append('id', id);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/unBlock', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
async function deleteFriend (applyId: number) {
    let data = new FormData();
    // @ts-ignore
    data.append('applyId', applyId);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/deleteFriend', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
export {
    getFriends,
    getUser,
    addFriend,
    getUserByCode,
    getApplyFriendsList,
    ignoreAdd,
    agreeFriend,
    refusedAdd,
    getUserAndRelation,
    block,
    unBlock,
    deleteFriend,
};
