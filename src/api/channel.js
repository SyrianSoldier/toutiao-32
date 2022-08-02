import request from '@/utils/request'

// 让所有请求自动添加上Authorizaiton请求头
export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
