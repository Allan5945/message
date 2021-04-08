import Axios from 'axios';

/**
 * @desc 检测账号存在与否
 * @param  {string} username 用户名
 * @param  {string} password 用户密码
 * @param  {string} clientType 登录类型
 * @return {Promise} 结果回调
 * @author xxf 2020/7/7 16:49
 */
async function login (username: string, password: string, clientType: number) {
    let data = new FormData();
    // @ts-ignore
    data.append('clientType', clientType);
    data.append('password', password);
    data.append('username', username);
    return new Promise((resolve, reject) => {
        Axios.post('/bs/user/login', data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

export {login};
