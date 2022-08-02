import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入字体图标css
import '@/assets/fonts/iconfont.css'

// 一次性引入vant所有组件
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入flexible
import 'amfe-flexible/index.min.js'
Vue.config.productionTip = false
console.log(store)

Vue.use(Vant)

// $store = store
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
