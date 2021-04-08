import { getUser} from '../dao/redisCache';


async function getUserData (tid: string) {
    return await getUser(tid);
}
function idFormatToNumber (id: any) {
    return Number(id);
}
function idListFormatToNumber (idList: Array<any>) {
    return idList.map((id: any) => Number(id));
}
function randomString (len : number) {
    len = len || 6;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZ2345678#$%&!()';
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

export {
    getUserData,
    idListFormatToNumber,
    idFormatToNumber,
    randomString,
};

