<template>
  <el-menu default-active="" class="el-menu-vertical-demo"  @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="lightblue"
      text-color="grey"

      active-text-color="#fff">
      
  <!-- <h1 v-if="!isCollapse">后台管理系统</h1>
  <h1 v-if="isCollapse">后台</h1> -->
  <h1 style="height: 50px;margin-bottom: 5px; line-height: 60px; text-align: center;">{{isCollapse?'后台':'后台管理系统'}}</h1>

  

  <el-menu-item 
  
  :index="item.name" v-for="item in noChildren" :key="item.name" @click="clickMenu(item)">
    <i :class="`el-icon-${item.icon}`"  >
       <span class="slo" >{{item.label}}</span>
    
    </i>
   
  </el-menu-item>
 

  <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.label" >
    <template slot="title" >
      
        <i :class="`el-icon-${item.icon}`" >
       <span class="slo" >{{item.label}}</span>
    
    </i>
   
    </template>
    <el-menu-item-group >
     
      <el-menu-item @click="clickMenu(subitem)" :index="subitem.name" v-for="subitem in item.children" :key="subitem.name">
        {{subitem.label}}</el-menu-item>
      
    </el-menu-item-group>
    
    
  </el-submenu>
</el-menu>
</template>

<script>
   import Home from '../views/Home'
  import User from '../views/User.vue'
  import Mall from '../views/Mall.vue'
  import PageTwo from '../views/PageTwo.vue'
  import PageOne from '../views/PageOne.vue'

  import Cookie from 'js-cookie'

 export default {
    name:'CommonAside',
    components:{
    Home,
   User,
   Mall,
   PageOne,
  PageTwo
    },
    data() {
      return {
        
 
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      //跳转
      clickMenu(item){
     
      if(this.$route.path!==item.path&& !(this.$route.path==='/home' &&(item.path === '/'))){
        this.$router.push(item.path) 
      }

      this.$store.commit('tab/SELECTMENU',item)
      
      }
      
    },
    computed:{
        //没有子菜单
        noChildren(){
            return this.menuData.filter((item)=>{
               return !item.children
            })
        },
        //有子菜单

        hasChildren(){
           return this.menuData.filter(item=>item.children )
        },
        isCollapse(){
          return this.$store.state.tab.isCollapse
        },

        //菜单
        menuData(){
          //缓存里面没有去store
          return JSON.parse(Cookie.get('menu'))||this.$store.state.tab.menu
        }
    }
  }
</script>

<style scoped lang="less">

 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 678px;

    
  }
.el-menu{
    height: 100vh;
    border-right: none;
    
    h1{
        color: grey;
        text-align: center;
        line-height: 48px;
        font-size: 24px;
        font-weight: 400;
    }
}


</style>