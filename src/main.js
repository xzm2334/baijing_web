// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios';

axios.interceptors.request.use(config=>{
  let token ='Bearer ' + localStorage.getItem("access_token")
  if (token){
    config.headers.Authorization = token;
    console.log('interceptors config=',config)
  }
  return config
},error=>{
  return Promise.reject(error)
})

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
