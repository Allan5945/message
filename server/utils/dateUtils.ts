import moment from 'moment';


/**
* @desc 获取当前的时间， 格式 YYYY-MM-DD HH:mm:ss
*/
function getNowDate () {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}
export {getNowDate};
