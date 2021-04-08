// @ts-ignore
import {execute} from '../conf/mysqlConf';

/**
 * @desc 修改头像
 */
async function updatePh (headPortraitUrl: string, id: number) {
    return await execute('update user set head_portrait_url = ? where id = ?', [headPortraitUrl, id]);
}

export {
    updatePh,
};
