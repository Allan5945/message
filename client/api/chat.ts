import Axios from 'axios';

/**
 * @desc 查询新对话消息
 */
async function getMes (otherId: number, pageIndex?: number, listCount?: number) {
    let data = new FormData();
    // @ts-ignore
    data.append('receiveId', otherId);
    // @ts-ignore
    pageIndex && data.append('pageIndex', pageIndex);
    // @ts-ignore
    listCount && data.append('listCount', listCount);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/chat/getMesById', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

/**
 * @desc 给某人发送消息
 */
async function sendSBMes (receiveId: number, text: string, mesType: number, blob ?: any) {
    let data = new FormData();
    // @ts-ignore
    data.append('receiveId', receiveId);
    data.append('msg', text);
    data.append('mesType', mesType.toString());
    data.append('blob', blob);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/chat/send', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}


/**
 * @desc 给某人发送消息
 */
async function initChat () {
    return new Promise((resolve, reject) => {
        Axios.post('/bs/chat/initChat')
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

/**
 * @desc 给某人发送消息
 */
async function viewMes (sendId: number) {
    let data = new FormData();
    // @ts-ignore
    data.append('sendId', sendId);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/chat/viewMes', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

/**
 * @desc 添加联系人
 */
async function addNearestContact (contactId: number) {
    let data = new FormData();
    // @ts-ignore
    data.append('contactId', contactId);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/chat/addNearestContact', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
/**
 * @desc 添加联系人
 */
async function deleteNearestContact (id: number) {
    let data = new FormData();
    // @ts-ignore
    data.append('id', id);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/chat/deleteNearestContact', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
/**
 * @desc 添加联系人
 */
async function videoChatApi (sendId: number, acceptId: number, step: number, con?: any) {
    let data = new FormData();
    // @ts-ignore
    data.append('sendId', sendId);
    // @ts-ignore
    data.append('acceptId', acceptId);
    // @ts-ignore
    data.append('step', step);
    data.append('con', JSON.stringify(con));
    return new Promise((resolve, reject) => {
        Axios.post('/bs/chat/videoChat', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
export {getMes, sendSBMes, initChat, viewMes, addNearestContact, deleteNearestContact, videoChatApi};
