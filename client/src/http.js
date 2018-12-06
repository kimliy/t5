import axios from 'axios'
import { Loading,Message } from 'element-ui'
import router from './router';

let loading;
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: "正在加载中，请稍后...",
        background: "rgba(0,0,0,0.7)"
    })
}

function endLoading() {
    loading.close()
}

//请求拦截(配置发送请求的信息)
axios.interceptors.request.use(config => {
    //处理请求之前的配置:加载动画
    startLoading()
    if(localStorage.eleToken) {
        //设置统一的请求头
        config.headers.Authorization = localStorage.eleToken
    }
    return config
},error => {
    //请求失败的处理
    return Promise.reject(error)
})

//响应拦截(配置请求回来的信息)
axios.interceptors.response.use(response => {
    //处理响应数据:结束加载动画,返回数据
    endLoading()
    return response
},error => {
    //处理响应失败:结束动画后,提示错误信息
    endLoading()
    Message.error(error.response.data)

    //获取错误状态码
    const {status} = error.response
    if(status == 401) {
        Message.error('token失效,请重新登录')
        //清除token
        localStorage.removeItem('eleToken')
        //跳转到登录页面
        router.push('/login')
    }

    return Promise.reject(error)
})








export default axios