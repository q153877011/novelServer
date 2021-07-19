import axios from 'axios';
// 最终使用，axios本身就是Promise
export function request(config) {
  const instance = axios.create({
    // baseURL: "http://42.193.188.159:8090",
    baseURL: 'http://www.imayitxt.com',
    timeout: 8000,
  });

  //   axios拦截器;
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      // console.log(err);
      Promise.reject(err);
    },
  );

  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      // console.log(err);
      Promise.reject(err);
    },
  );

  return instance(config);
}
