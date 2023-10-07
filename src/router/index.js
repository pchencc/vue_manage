import VueRouter from "vue-router"
import Vue from "vue"

import Main from '../views/Main'
import Home from '../views/Home'
import User from '../views/User'
import Login from '../views/Login'


import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'

Vue.use(VueRouter)
export default new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/home',//重定向
            name:'Main',

            component:Main,

            children:[

        ]
        },
        //login
        {

         
            
            path:'/login',
            name:'login',

            component:Login
        }
        
    ],
    
})