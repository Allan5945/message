
let star: Date, end: Date;
function startTime () {
    star = new Date();
}

function endTime () {
    end = new Date();
    console.log(`应用启动时间为： ${end.getTime() - star.getTime()}`);
}


export {
    startTime,
    endTime,
};
