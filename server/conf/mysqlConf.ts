import mysql, {Pool} from 'mysql';


/**
* @desc 创建mysql连接数
* @param  {Data} data 字段备注
* @return {Index} sasa
* @author xxf 2020/7/8 15:26
*/
function createPool (): Pool {
    return mysql.createPool({
        connectionLimit: 5,
        host: '192.168.10.161',
        user: 'root',
        database: 'message',
        password: '12345678',
        queueLimit: 2,
    });
}
const pool = createPool();

/**
* @desc 描述
* @param  {string} sql sql
* @param  {Array} data 参数
* @return {Index} sasa
* @author xxf 2020/7/8 15:56
*/
async function execute (sql: string, data: Array<any>) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection): void => {
            if (!err) {
                connection.beginTransaction((err) => {
                    if (err) {
                        return '开启事务失败';
                    } else {
                        let query = connection.query(sql, data, (err, rows) => {
                            if (!err) {
                                connection.commit((error) => {
                                    if (error) {
                                        console.log('事务提交失败');
                                    } else {
                                        resolve(rows);
                                    }
                                });
                            } else {
                                connection.rollback(function () {
                                    reject(err);
                                });
                            }
                        });
                        console.log(query.sql);
                    }
                });
            } else {
                resolve(err);
            }
            try {
                connection.release();
            } catch (e) {
                console.log(e);
            }
        });
    });
}

export {execute};

