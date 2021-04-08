import {getUser} from '../dao/redisCache';

async function validation (tid: string) {
    return await getUser(tid);
}
function num () {
    let mm = Math.random();
    let six = 0;
    if (mm > 0.1) {
        six = Math.round(mm * 1000000);
    } else {
        mm += 0.1;
        six = Math.round(mm * 1000000);
    }
    return six;
}

export {
    validation,
    num,
};
