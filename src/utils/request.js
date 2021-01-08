/**
 * 这里做了一些处理对 axios 进行了二次封装
 */

 import axios from 'axios'
 import { Message } from 'element-ui'

 //1. 创建新的axios实例，
const service = axios.create({
  // baseURL: process.env.BASE_API,
  // 超时时间 单位是ms
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

/**
 * 请求拦截器
 */

 /**
  * 响应拦截器
  */
service.interceptors.response.use(response => {
  //接收到响应数据并成功后的一些共有的处理，关闭loading等
  return response.data
}, error => {
   /***** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        // Message.error = '错误请求'
        Message.error('错误请求')
        break;
      case 401:
        Message.message = '未授权，请重新登录'
        Message.warning('未授权，请重新登录')
        //  未登录自动跳转到登录页面并清除本地local
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        localStorage.removeItem('userIcon')
        localStorage.removeItem('flag')
        window.location.href = "#/blogger/signUp"
        break;
      case 403:
        Message.message = '拒绝访问'
        Message.error('未授权，请重新登录')
        break;
      case 404:
        //  跳转到指定错误的页面，为了友好提示不展示message
        window.location.href = "#/blogger/404"
        // Message.error('未找到该资源')
        break;
      case 405:
        Message.error('请求方法未允许')
        break;
      case 408:
        Message.error('请求超时')
        break;
      case 500:
        Message.error('服务器端出错')
        break;
      case 501:
        Message.error('网络未实现')
        break;
      case 502:
        Message.error('网络错误')
        break;
      case 503:
        Message.error('服务不可用')
        break;
      case 504:
        Message.error('网络超时')
        break;
      case 505:
        Message.error('http版本不支持该请求')
        break;
      default:
        Message.error(`连接错误${error.response.status}`)
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
      Message.error('服务器响应超时，请刷新当前页')
    }
    Message.error('连接服务器失败')
  }

  // Message.error(error.message)
  /***** 处理结束 *****/
  //如果不需要错误处理，以上的处理过程都可省略
  return Promise.resolve(error.response)
})

//  导出
export default service