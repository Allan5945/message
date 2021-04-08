import redis, {Callback} from 'redis';
const databaseIndex: number = 5;
const client = redis.createClient(6379, '10.102.0.35', {});
client.on('ready', function (res) {
    console.log('redis连接成功');
    client.select(databaseIndex, function () {
        // eslint-disable-next-line handle-callback-err
        // client.hmget('fSmg4OFynEozeM1U0WYlwr9J66I=:3f058140-d2f4-11ea-893d-47a9d87a8521', 'token', 'clientType', function (err, res) {
        //     console.log('name:', res);
        // });
    });

});
client.on('error', function (err) {
    console.log('Redis has meet with some trouble: ' + err);
});


export default client;
