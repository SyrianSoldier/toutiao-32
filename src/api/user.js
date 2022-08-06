import request from '@/utils/request'

// axios做了封装, post请求 自动加Content-Type application/json

// params 查询参数传参: 'baseUrl+/v1_0/authorizations?name=张三'

// data请求体传参: 请求体当中携带

/**
 * 登录API
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const getCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户个人信息
 * @returns Promise
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 如果传的是对象, axios默认将对象转成json并且加上content-type=application/json
// 如果传的是formDate表单, 那么axios会将表单提交给后端, 并且默认的加上content-type=mutipart/form-data
// 如果后端要的是表单(form-data)
// const fm = new FormData()
// fm.append(表单的name,表单项)

/**
 * 上传头像的
 * @param {*} file 图片的file对象
 * @returns Promise
 */
export const uploadAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
