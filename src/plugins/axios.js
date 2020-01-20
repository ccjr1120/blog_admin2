import axios from 'axios';
import Qs from 'qs'; // 用来处理参数
axios.defaults.baseURL = 'http://localhost:8090/api/'; // 请求的默认域名
axios.defaults.withCredentials=true;
// 添加一个请求拦截器
axios.interceptors.request.use(config => {
  config.data = Qs.stringify(config.data); // 处理数据，可不写
  return config;
},
  err => {
    return Promise.reject(err);
  });

export default axios

