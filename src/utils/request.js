// 引入axios
import axios from 'axios'
import store from '@/store'
// 克隆一个
// request.defaults.baseURL = 'http://toutiao.itheima.net'
// request.defaults.timeout = 3000
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // config是本次请求的配置
    // 在发送请求之前做些什么
    const token = store.state.tokenObj.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    // conifg一定要返回
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
