// 统一封装 axios 请求配置
import { toast } from '@/components/Toast';
import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    // 写一个自己处理好的代理地址
    baseURL: "/api",
    // .. 别的配置    
})

// 定义一个数组，里面写上 需要修改 content-type 的 url
const URLS = ['/sendSMS', '/phoneRegin', '/wechatUsers/PCLogin', '/wechatUsers/binding', '/shop/carts/add']

// 拦截器
// 在进入一个特定的阶段之前的函数 --- 拦截器
// 希望在请求之前统一把token或者别的什么处理一下
instance.interceptors.request.use((config) => {
    // config 是什么?
    // config 就是 请求的所有的信息对象
    // 如果现在想要带token 到请求头里面
    // config.headers['Authorization'] = 'adsfaslkdfjasdlfjaslkfjadsklfajsdf'
    // 如果已经登录，就有token，在请求的时候一般都会带上
    let token = localStorage.getItem('token');
    if (token) {
        // 这个token的请求头的键，要跟后端给的要一致
        config.headers['x-auth-token'] = token;
    }

    // 有部分接口的数据格式，是要修改成 application/x-www-form-urlencoded
    // 每次都在 api 里面写 不友好
    // 可以在这处理一下
    // 判断指定的url，然后把 content-type 修改成指定的
    if (URLS.includes(config.url)) {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        config.data = qs.stringify(config.data)
    }

    return config;
}, (err) => {
    return Promise.reject(err)
})
// 如果在数据请求成功后，交给组件之前，需要处理一些东西，就在响应拦截器里面实现
instance.interceptors.response.use((response) => {
    // 统一处理 响应出错的情况：
    if (response.data.code !== 0) {
        // 一般来说做客户端，不会直接把报错 给 用户看，而提示用户 
        toast('刚才出问题了，请联系管理员', 'error');
        // 然后把错误手动收集起来
        // 方式1： 自己发个请求，把错误信息和用户相关的数据发到服务器
        // 方式2:  把错误写到 localStorage 

        // 这里不return false 了，不建议
        // return false;
    }


    // 这个返回的 数据 ， 会给到 .then 的回调函数的参数，
    // 如果直接返回， 会在使用的时候比较麻烦
    // 所以这里先进行一下处理，返回 response.data 就可以在  .then 的 res 里面少一步操作
    return response.data;
}, (err) => {
    return Promise.reject(err)
})

export default instance;