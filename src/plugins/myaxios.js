import axios from 'axios';

const myaxios = {};

myaxios.install = function (Vue) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8/oldbooktrading/public/index.php',

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}

  })
  // 设置Vue实例的属性
  Vue.prototype.$axios = instance

};

export default myaxios;
