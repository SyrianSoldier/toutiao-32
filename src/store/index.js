import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/auth'
// #region
// vuex
//  - 本质就是仓库, 存放数据
//  - vuex的数据时响应式的

// 怎么修改vuex数据
//  - vuex的数据是自产自销
//  - vuex的数据必须在vuex里修改
//  - mutations定义方法去修改, 在外接调用这个方法
//  - mutations方法 建议是大写
//  - mutations方法可以接受到两个参数, 一个是state,第二个:payload
//  - $store.commit('方法名字')用于触发mutations里的方法
// #endregion
Vue.use(Vuex)

// tokenObj.token
//  null.token -->报错
//  {}.token --> undifined
export default new Vuex.Store({
  // JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOUKEN'))
  state: {
    tokenObj: getToken() || {}
  },
  mutations: {
    SET_TOKEN(state, payload) {
      // 1. 将token存入vuex
      state.tokenObj = payload
      // 2. token存入本地存储中
      //  - 本地存储 操作是JSON格式字符串
      // localStorage.setItem('HEIMA_TOUTIAO_TOUKEN', JSON.stringify(payload))
      // storage.set('HEIMA_TOUTIAO_TOUKEN', payload)
      setToken(payload)
    }
  }
})
