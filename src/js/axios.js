// axios.js

import axios from 'axios';

// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: 'http://localhost:8080', // 设置后端API的基本URL
  // baseURL: 'http://1.14.102.11:8080', // 设置后端API的基本URL
});

// 在请求头中添加token
instance.interceptors.request.use((config) => {
  // 默认情况下需要token
  config.requiresToken = true;
  // 如果请求不需要token，将requiresToken设置为false
  if (config.url === '/user/login' || config.url === '/user/register'||config.url.startsWith('/admin/train/')) { 
    config.requiresToken = false;
  } else {
    if(JSON.parse(localStorage.getItem('userInfo'))!=null){
      var token = JSON.parse(localStorage.getItem('userInfo')).token; // 从本地存储中获取token
    }
  }

  // 如果请求需要token，添加token到请求头
  if (token && config.requiresToken) {
    config.headers['token'] = token;
  }
  return config;
});
export default instance;
