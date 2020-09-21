import axios from 'axios';

let service = axios.create({
  headers: {}
});

service.defaults.baseURL = process.env.VUE_APP_API_ROOT;
service.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        'x-tianchi-token': token
      }
    }

    config.headers = Object.assign(config.headers, {
      'Accept': 'application/json',
      'x-tianchi-client': '{"role":"ADVISER","version":"v1.1.1","deviceId":"1234fads"}'
    });

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use((response) => {
  response.data.config = response.config;
  if (response.data.code === 0) {
    return response.data;
  }
  return response.data;
}, (err) => {
  return {config: err.config};
});

export default service;
