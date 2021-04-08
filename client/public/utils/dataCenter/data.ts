import axios from 'axios';

function getTid (): string {
    return localStorage.getItem('tid');
}

function setTid (tid: string): void {
    localStorage.setItem('tid', tid);
}

function getUserMes (): string {
    let data = localStorage.getItem('user');
    return data && JSON.parse(data);
}

function setUserMes (data: any): void {
    localStorage.setItem('user', JSON.stringify(data));
}
function initUserMes () {
    let tid = getTid();
    if (tid) {
        axios.defaults.headers.common['tid'] = tid;
        return true;
    } else {
        console.log('信息失效');
        return false;
    }
}


export {
    getTid,
    setTid,
    getUserMes,
    setUserMes,
    initUserMes,
};

