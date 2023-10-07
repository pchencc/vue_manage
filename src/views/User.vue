<template>

<div class="manage">
  <!-- 表格 -->
  <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  :before-close="handleClose"
  width="60%">
 <!-- 用户表单信息 -->
 <el-form ref="form" :model="form" label-width="80px" :inline="true" :rules="rules">

  <el-form-item label="姓名" prop="name">
    <el-input placeholder="请输入姓名" v-model="form.name"></el-input> 
  </el-form-item>

  <el-form-item label="年龄" prop="age">
    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
  </el-form-item>

  <el-form-item label="性别" prop="sex">
    <el-select v-model="form.sex" placeholder="请选择">
      <el-option label="男" :value="1"></el-option>
      <el-option label="女" :value="0"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="出生日期" prop="birth">
      <el-date-picker type="date" placeholder="选择日期" 
      value-format="yyyy-mm-dd"
      v-model="form.birth" style="width: 100%;"></el-date-picker>
  </el-form-item>

  <el-form-item label="地址" prop="addr">
    <el-input placeholder="请输入地址" v-model="form.addr"></el-input> 
  </el-form-item>

</el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
</el-dialog>

<div class="header" >

  
<!-- 增加按钮 -->
<div>
  <el-button  size="mini" type="primary" @click="handleAdd">
  +新增
</el-button>

</div>
<div >
  <!-- 搜索 -->
<el-form size="mini" :model="formUser" style="display: flex;">
<el-form-item>
<el-input placeholder="搜索" v-model="formUser.name">
</el-input>
</el-form-item>

<el-form-item>
  <el-button type="primary" @click="onsubmit">
    搜索
  </el-button>
</el-form-item>
</el-form>
</div>

</div>

<div class="table">
  <div class="block" >
    <el-table
      :data="tableData"
      :stripe='stripe'
      style="width: 100% ;max-height:470px;">

      <el-table-column
        prop="name"
        label="姓名"
        >
      </el-table-column>

      <el-table-column
        prop="age"
        label="年龄"
        >
      </el-table-column>

      <el-table-column
        prop="sex"
        label="性别"
        >
        <template slot-scope="scope">
        <span>{{ scope.row.sex==1?'男':'女' }}</span>
      </template>
      </el-table-column>

      <el-table-column
        prop="birth"
        label="出生日期"
        width="180">
      </el-table-column>

      <el-table-column
        prop="addr"
        label="地址">
      </el-table-column>

      
    <el-table-column
      
      label="操作">
      <template slot-scope="scope">
      <el-button size="mini" @click="handleEdit(scope.row)">
      编辑
      </el-button>
      <el-button type="danger" size="mini" @click="handleDelete(scope.row)">
         删除
      </el-button>
    </template>
    </el-table-column>

    </el-table>

    <div class="page">
      <el-pagination
    layout="prev, pager, next"
    :total="total"
    @current-change="handlepage">
  </el-pagination>
    </div>
</div>
  
</div>

</div>




 
</template>

<script>
import {getUser ,addUser,editUser,delUser} from '../api'
export default {
name:'User',
data() {
      return {
        stripe:true,
        pageData:{
          page:1,
          limit:7
        },
        dialogVisible: false,
        total:0,
        formUser:{
          name:''
        },
        form:{
          name:'',
          age:'',
          sex:'',
          birth:'',
          addr:''
        },
        modalType:0,//0 新增弹窗 1编辑
        tableData:[],

        rules:{
          name:[
               { required: true, message: '请输入姓名'}
          ],
          age:[
               { required: true, message: '请输入年龄'}
          ],
          sex:[
               { required: true, message: '请选择性别'}
          ],
          birth:[
               { required: true, message: '请输入出生日期'}
          ],
          addr:[
               { required: true, message: '请输入地址'}
          ]
        }
       
      };
    },

    methods:{
      //提交用户表单
      submit(){
        this.$refs.form.validate((valid)=>{
          // 通过校验
          if(valid){
            if(this.modalType===0){
             addUser(this.form)
             .then(()=>{
              this.getList()

             })
            }else{
              editUser(this.form)
             .then(()=>{
              this.getList()

             })

            }
           
            this.handleClose()
          }

        })

      },
      handleClose(){
        // 弹窗消失前清空数据
        this.$refs.form.resetFields()
        this.dialogVisible=false

      },
      handleAdd(){
        this.dialogVisible=true
        this.modalType=0
      },
      cancel(){
        this.handleClose()
      },

      handleDelete(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({id:row.id})
          .then(()=>{
            
               
            this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
          })
          
          ;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });


      },
      handleEdit(row){
        this.modalType=1
        this.dialogVisible=true
        //不能直接传入 要深拷贝
        this.form =JSON.parse(JSON.stringify(row))
        


      },
      handlepage(val){
        //val是当前页面号
        this.pageData.page=val
        this.getList()

      },
      getList(){
        // 获取列表数据
      getUser({params:{...this.formUser,...this.pageData}})
      .then(({data})=>{
    
       this.tableData=data.list
       this.total = data.count||0
      })
      
      },

      //搜索
      onsubmit(){
        console.log(this.formUser.name)
        this.getList()
      }

    },
    mounted(){
      //页面首次加载
      // 获取列表数据
      this.getList()
      
      
    }
    
  };


</script>

<style scoped lang="less">
.manage{
 .header{
  display: flex;
  justify-content: space-between;

 }
 .table{
  max-height: 570px;
  position: relative;
  .page{
  position: absolute;
  right: 20px;
  bottom: -40px;
  }


 }

}

</style>