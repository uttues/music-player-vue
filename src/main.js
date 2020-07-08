import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import store from 'store'
import filters from 'utils/filters'
import 'base/rem.js'

Vue.config.productionTip = false

// 注册filters.js中的所有过滤器
for (let key in filters) {
    Vue.filter(key, filters[key])
}

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
