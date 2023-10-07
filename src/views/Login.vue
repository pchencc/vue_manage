<template>
  <div>
   <el-card shadow="hover" class="box-card" >
    <el-form :model="form" :rules="rules" ref="form">
        <h3>系统登录</h3>
 <el-form-item label="账号" prop="username">
    <el-input v-model="form.username" placeholder="请输入账号"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button @click="submit" type="primary">
        登录
    </el-button>
  </el-form-item>
  </el-form>
   </el-card>
  </div>
</template>

<script>
// import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'
export default {
    name:'Login',
    data(){
        return{
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[{required:true,message: '请输入用户名'}],

                password:[{required:true,message: '请输入密码'}]

            }

        }
    },
    methods:{
        //登录
        submit(){
        //token
        this.$refs.form.validate((valid)=>{
          // 通过校验
          if(valid){
            getMenu(this.form)
            .then(({data})=>{
                console.log(data)
                if(data.code===20000){
                  Cookie.set('token',data.data.token)
                  this.$router.push('/home')
                  this.$store.commit('tab/SHOWMENU',data.data.menu)
                  
                  
                }else{
                    this.$message.error(data.data.message)
                }
                
            })
          }})

        
        }
    }

}
</script>

<style lang="less" scoped>
.el-card{
    width: 350px;
    border: 1px #eaeaea solid;
    margin: 130px auto;
    padding:0 15px;
    border-radius:15px ;
    text-align: center;
   

}
</style>