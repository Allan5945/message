import redisClient from './../conf/redis';

/**
 * @desc 设置验证码
 * @param  {string} prefix 前缀
 * @param  {string} suffix 后缀
 * @param  {number} iTime 验证码间隔时间
 * @param  {number} overdueTime 验证码过期时间
 * @param  {string} state 验证码状态
 * @param  {string} code 验证码
 * @return {boolean}
 * @author allan 2020/8/14 10:17
 */

function setVCode (prefix: string, suffix: string, iTime: number, overdueTime: number, state: any = true, code : string,) {
    try {
        let verificationCode = `${prefix}:${suffix}verificationCode`;
        let intervalTime = `${prefix}:${suffix}intervalTime`;
        redisClient.hmset(verificationCode, 'code', code, 'state', state);
        redisClient.expire(verificationCode, overdueTime);
        redisClient.hmset(intervalTime, 'state', state);
        redisClient.expire(intervalTime, iTime);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * @desc 查询验证码是否存在
 */
function queryVCode (prefix: string, suffix: string) {
    let verificationCode = `${prefix}:${suffix}verificationCode`;
    return new Promise((resolve, reject) => {
        redisClient.hmget(verificationCode, 'code', function (err, res) {
            if (err || !res[0]) {
                resolve(null);
            } else {
                resolve(res[0]);
            }
        });
    });
}

/**
 * @desc 查询是否频繁发送
 */
function queryFrequentSend (prefix: string, suffix: string) {
    let intervalTime = `${prefix}:${suffix}intervalTime`;
    return new Promise((resolve, reject) => {
        redisClient.keys(intervalTime, (err, res) => {
            if (err || !res[0]) {
                resolve(null);
            } else {
                resolve(res);
            }
        });
    });
}

/**
 * @desc 删除验证码
 */
function delVCode (prefix: string, suffix: string) {
    let verificationCode = `${prefix}:${suffix}verificationCode`;
    let intervalTime = `${prefix}:${suffix}intervalTime`;
    redisClient.del(verificationCode);
    redisClient.del(intervalTime);
}


export {
    queryFrequentSend,
    queryVCode,
    delVCode,
    setVCode,
};
