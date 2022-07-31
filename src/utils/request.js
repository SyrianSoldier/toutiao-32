// 引入axios
import axios from 'axios'
// 克隆一个
// request.defaults.baseURL = 'http://toutiao.itheima.net'
// request.defaults.timeout = 3000
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

export default request
