import axios from 'axios';

const myaxios = {};

myaxios.install = function (Vue) {
    const instance = axios.create({
        baseURL: 'https://localhost:8/',
        timeout: 1000,
        // headers: {'X-Custom-Header': 'foobar'}
    })
    // 设置Vue实例的属性
    Vue.prototype.$axios = instance

};

export default myaxios;