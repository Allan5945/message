// 用户名规则
const regUserName = /^[a-zA-Z0-9_-]{6,16}$/;
// 邮箱规则
const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
// 密码规则
const regPas = /^.{6,20}/;

export {
    regUserName,
    regEmail,
    regPas,
};
