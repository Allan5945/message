import {
    login,
    createUser,
    queryUserName,
} from './../../server/dao/usercenter';

describe('user-test', () => {
    test('测试注册', async () => {
        await createUser('zs', 'asas', 'aas@qq.com', '1995');
    });
    test('查询用户存在', async () => {
        await queryUserName('zs');
    });
});
