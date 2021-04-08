import {getUserData} from '../utils/userUtils';

/**
 * @desc 拦截验证ws
 */
async function wsFilter (tid: any) {
    let data = await getUserData(tid);
    if (data) {
        return data;
    } else {
        return false;
    }
}

export default wsFilter;
