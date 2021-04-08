import Axios from 'axios';

Axios.defaults.method = 'post';
Axios.defaults.withCredentials = true;

/**
* @desc 请求开始拦截器
* @author xxf 2020/7/7 15:38
*/
Axios.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
    };
    return config;
}, function (error) {
    return Promise.reject(error);
});

/**
* @desc 请求完成拦截器
* @author xxf 2020/7/7 15:38
*/
Axios.interceptors.response.use(
    (data) => data.data,
    (error) => Promise.reject(error)
);

export default Axios;
