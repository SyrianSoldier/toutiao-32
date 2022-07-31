// authorizaiton 用于操作token
import storage from './storage'

const TOKEN = 'HEIMA_TOUTIAO_TOKEN'

export const setToken = (value) => storage.set(TOKEN, value)

export const getToken = () => storage.get(TOKEN)

export const removeToken = () => storage.remove(TOKEN)
