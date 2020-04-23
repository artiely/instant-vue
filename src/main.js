import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
import UI from '../packages/index'
Vue.use(UI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
