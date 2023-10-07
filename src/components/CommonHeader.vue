<template>
  <div class="header-container" style="height: 50px;">
    <div class="l-content">
        <!-- 折叠与展开 -->
        <el-button icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
         <!-- 面包屑？？？ -->
       
        <el-breadcrumb separator="/" style="margin-left: 15px;">
          <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
        <el-dropdown @command="exit">
  <span class="el-dropdown-link">
    <!-- 头像 -->
    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>个人中心</el-dropdown-item>
    <el-dropdown-item command="logout">退出</el-dropdown-item>

  </el-dropdown-menu>
</el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import { mapState } from 'vuex';
export default {
name:'CommonHeader',
methods:{
    collapseMenu(){
        this.$store.commit('tab/COLLAPSEMENU')
        console.log(this.$store)

    },
    exit(command){
      //清空token
      if(command==='logout'){
        Cookie.remove('token')
        Cookie.remove('menu')
        this.$router.push('/login')
      }

      
    }
},
computed:{


  ...mapState({
    tags:state=>state.tab.tabsList
  })
},


}
</script>

<style scoped lang="less">
.header-container{
    display: flex;
    justify-content: space-between;
    height: 60px;
    background-color:lightblue;
    align-items: center;
    padding:0 20px;
    span{
    color: grey;
    font-size: 14px;
    margin-left: 10px;
}
}

.el-dropdown-link {
    cursor: pointer;
    color: grey;
    
  }
  .el-icon-arrow-down {
    font-size: 12px;
    display: none;
    /* 向下小箭头 */

  }
  .l-content{
    display: flex;
    .el-breadcrumb{
      margin-top: 5px;

    }
    /deep/.el-breadcrumb__item{
      .el-breadcrumb__inner{
        font-weight: 400;
        &.is-link{
          color:grey
        }
      }
      &:last-child{
        .el-breadcrumb__inner{
          color: white;
        }
      }
    }
  }

</style>