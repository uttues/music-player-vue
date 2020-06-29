/**
 * @Author: uttues（雷欣）
 * @todo: 封装axios，返回axios实例
 */

import axios from 'axios'

/** 
 * 跳转登录页
 * 携带当前页面路由，以便在登陆页面完成登录后返回当前页面
 */
// const toLogin = () => {
//     router.replace({
//         path: '/login',
//         query: {
//             redirect: router.currentRoute.fullPath
//         }
//     });
// }

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandler = (status, other) => {
    switch (status) {
        case 401:
            // tip：跳转到登陆页面（携带当前页面路由，以便在登陆页面完成登录后返回当前页面）
            break
        case 403:
            // tip：
            // 1.toast提示登录状态过期，需重新登录
            // 2.本地清除token（localStorage|cookie）
            // 3.清除vuex中保存的token
            // 4.延迟登录页跳转
            // toast('登录过期，请重新登录');
            // localStorage.removeItem('token');
            // store.commit('loginSuccess', null);
            // setTimeout(() => {
            //     toLogin();
            // }, 1000);
            break
        case 404:
            // tip: 提示请求资源不存在
            // toast('请求的资源不存在');
            break
        default:
            // tip: 控制台打印信息
            console.log(other);
    }
}

// 创建axios实例
const instance = axios.create({ timeout: 5000 })
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // tip:
        // 拦截请求，每次发送请求之前判断是否存在token
        // 如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加
        // const token = store.state.token;
        // token && (config.headers.Authorization = token); 
        return config
    },
    error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    // 请求失败
    err => {
        const { response } = err;
        if (response) {
            // 有错误信息，请求已发出，但是不在2xx的范围
            errorHandler(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 没有返回response，可能是 请求超时或断网？
            // tip:
            // 请求超时或断网时，更新state的network状态
            // network状态用于控制一个全局的断网提示组件的显示隐藏
            // 断网组件中包含刷新重新获取数据的逻辑
            // if (!window.navigator.onLine) {
            //     store.commit('changeNetwork', false);
            // } else {
            //     return Promise.reject(error);
            // }
        }
    }
)

export default instance