//入口文件
Vue.config.productionTip = false; // 设置为 false 以关闭生产模式提示

//引入vue
import Vue from 'vue'

//引入App组件，他是所有组件的父组件
import App from './App.vue'

//全局引入ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)//注入

//按需引入
// import {Button} from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(Button)//注入

import Cookie from 'js-cookie'
import router from './router/index';
//添加全局前置导航守卫
router.beforeEach((to,from,next)=>{
 //判断token存在不存在

  const token = Cookie.get('token')
  //不存在 没登录且跳转的页面不是登录
  if(!token&&to.name!=='login'){
    next({name:'login'})
  }else if(token&&to.name==='login'){
    next({name:'home'})
  }else{
    next()
  }
})


import store from './store';

import './api/mock'



Vue.config.productionTip = false

//创建vue实例对象vm
new Vue({
  render: h => h(App),
  //render(createElement){ return createElement('h2','你好')}
  //render：c=>c('h2','你好')
  store,
  router,
  beforeCreate(){
    Vue.prototype.$bus = this//按照全局事件总线 $bus就是当前应用的vm
  },
  created(){
    store.commit('tab/ADDMENU',router)
  }
}).$mount('#app')
