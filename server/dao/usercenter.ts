import {execute} from '../conf/mysqlConf';
import {User} from '../entity/user';

/**
* @desc 登录
*/
async function login (username ? : string, password ? : string) {
    return await execute('select username, id,nickname, head_portrait_url as headPortraitUrl  from user where username = ? and password = ?', [username, password]);
}

/**
 * @desc 创建用户
 */
async function createUser (username ? : string, password ? : string, email ? : string, createDate? : string, headPortraitUrl ? : string, uCode ? : string) {
    return await execute('insert into user(username, password, email,create_date, head_portrait_url, uCode) values(?,?,?,?,?,?)', [username, password, email, createDate, headPortraitUrl, uCode]);
}

/**
 * @desc 查看用户名是否存在
 */
async function queryUserName (username : string) {
    return await execute('select username from user where username = ?', [username]);
}

/**
 * @desc 通过id查询用户
 */
async function queryUserById (id : number) {
    return new Promise((resolve, reject) => {
        execute('select *, head_portrait_url as headPortraitUrl from user where id = ?', [id]).then((data: Array<any>) => {
            data = data.map((item: any) => ({
                ...item,
                ...{
                    // eslint-disable-next-line camelcase
                    frend_ids: item.frend_ids ? item.frend_ids : '',
                    // eslint-disable-next-line camelcase
                    black_list: item.black_list ? item.black_list : '',
                },
            }));
            if (data.length > 0) {
                data = data[0];
            } else {
                data = null;
            }
            resolve(data);
        });
    });
}

/**
 * @desc 通过id数组查询用户
 */
async function queryUserByIds (ids : any) {
    return new Promise((resolve, reject) => {
        execute('select *, head_portrait_url as headPortraitUrl from user where id in (?)', [ids]).then((data: Array<any>) => {
            resolve(data.map((item: any) => ({
                ...item,
                ...{
                    // eslint-disable-next-line camelcase
                    frend_ids: item.frend_ids ? item.frend_ids : '',
                    // eslint-disable-next-line camelcase
                    black_list: item.black_list ? item.black_list : '',
                },
            })));
        });
    });
    // return await execute('select *, head_portrait_url as headPortraitUrl from user where id in (?)', [ids]);
}

/**
 * @desc 通过user_code查询用户
 */
async function queryUserByCode (code : string) {
    return await execute('select *, head_portrait_url as headPortraitUrl from user where user_code = ?', [code]);
}

/**
 * @desc 修改密码
 */
async function changePas (password: string, username : string) {
    return await execute('update user set password = ? where username = ?', [password, username]);
}

/**
 * @desc 修改邮箱
 */
async function changeEmail (email: string, username : string) {
    return await execute('update user set email = ? where username = ?', [email, username]);
}

/**
 * @desc 添加/删除好友
 */
async function updateFrends (id: number, frends: string) {
    return await execute('update user set frend_ids = ? where id = ?', [frends, id]);
}

/**
 * @desc 添加/删除黑名单
 */
async function updateBlackList (id: number, blackList : string) {
    return await execute('update user set black_list = ? where id = ?', [blackList, id]);
}

/**
 * @desc 获取好友列表
 */
async function getFriendsDao (ids: any) {
    return await execute('select *, head_portrait_url as headPortraitUrl from user where id in (?)', [ids]);
}

/**
 * @desc 查看邮箱是否存在
 */
async function selectEmail (email: any) {
    return await execute('select * from user, head_portrait_url as headPortraitUrl where email = ?', [email]);
}

export {
    login,
    createUser,
    queryUserName,
    changePas,
    changeEmail,
    queryUserById,
    queryUserByIds,
    updateFrends,
    updateBlackList,
    getFriendsDao,
    selectEmail,
    queryUserByCode,
};
