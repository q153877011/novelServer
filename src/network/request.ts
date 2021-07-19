import axios from 'axios';

export function request(config: Object): any {
  const instance = axios.create({
    // baseURL: "http://42.193.188.159:8090",
    baseURL: 'http://www.imayitxt.com',
    timeout: 8000,
  });

  //   axios拦截器;
  //   instance.interceptors.request.use(
  //     (config) => {
  //       let storage = window.localStorage;
  //       if (storage.getItem("token")) {
  //         config.headers["token"] = storage.getItem("token");
  //       }
  //       return config;
  //     },
  //     (err) => {
  //       // console.log(err);
  //       Promise.reject(err);
  //     }
  //   );

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
