<template>
    <div>
     

     <el-container>
  <el-aside width="auto"><common-aside/></el-aside>
  <el-container>
    <el-header style="height: 50px;"><common-header></common-header></el-header>
    <CommonTag/>
    <el-main style="padding-top: 10px;">
        <h1>
      <router-view></router-view>
     </h1>

    </el-main>
  </el-container>
</el-container>
    </div>
  </template>
  
  <script>

  import CommonAside from '../components/CommonAside'
  import CommonHeader from '../components/CommonHeader'
  import CommonTag from '../components/CommonTag'


  export default {
  name:'Main',
  components:{
   CommonAside,
   CommonHeader,
   CommonTag

   
}
  }
  </script>
  
  <style scoped>

.el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-header{
    padding: 0;
   
  }
  
  
  </style>