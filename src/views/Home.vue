<template>
  <div>
    <el-row>
      <!-- 整个24 左右 -->
  <el-col :span="8.5">
    
    <!-- 左边 -->
   <div >
    
     
     <!-- 左边上面 -->
     <div >
      <el-card class="box-card" shadow="hover">
  <div class="user">
    <div>
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="width: 120px; height: 120px;margin-right: 40px;"></el-avatar>
    </div>
    <div>
      <p class="name">adimin</p>
      <p class="access">超级管理员</p>
    </div>
  </div>
  <div class="user-info">
    <p>上次登录时间：<span>{{today}}</span></p>
   <p>上次登录地点：<span>武汉</span></p>
  </div>
  
</el-card>
     </div>

     <!-- 左边下面 -->
     <div class="l-down">
      <el-card class="box-card" shadow="hover">
        <el-table
      :data="tableData"
      style="width: 100%"
   
      >
      <el-table-column
        prop="name"
        label="课程"
        >
      </el-table-column>
      <el-table-column
        prop="todayBuy"
        label="今日购买"
       >
      </el-table-column>
      <el-table-column
        prop="monthBuy"
        label="本月购买">
      </el-table-column>
      <el-table-column
        prop="totalBuy"
        label="总购买">
      </el-table-column>
    </el-table>
</el-card>
     </div>


   </div></el-col>

   
  <el-col :span="15" style="margin-left:20px;">
  



<!-- 本月订单 -->



<div class="num" style="display: flex; flex-wrap: wrap; ">
  <el-card class="box-card"  shadow="hover" :body-style="{padding:'0px',display:'flex',width:'190px',}"
      v-for="item in dingdang" :key="item.name">
      <i :class="`el-icon-${item.icon}`" :style="{background: item.color}" style="height: 55px; line-height: 55px;color: #fff; text-align: center; width: 55px; font-size: 18px; "></i>
        <div class="haha">
          <div class="money">￥{{item.money}}</div>
          <div class="name">{{item.name}}订单</div>
        </div>
    </el-card>  
</div>





    <el-card class="box-card" shadow="hover" style="height: 200px; margin-bottom: 15px; margin-right: 10px;">
      <div ref="echart1" style="height: 230px; width: 635px;" ></div>
    </el-card>  

   <div class="two">
    <el-card class="box-card" shadow="hover">
      <div ref="echart2" style="height: 200px; width: 305px;">

      </div>
    </el-card> 
    <el-card class="box-card" shadow="hover">
      <div ref="echart3" style="height: 170px; width: 298px;">

</div>
    </el-card> 
   </div>
     
  </el-col>
</el-row>
  </div>
</template>
<script ></script>
<script ></script>
<script >


import {getData} from '../api/index'
import * as echarts from 'echarts'
export default {
name:'Home',
data(){
  return{
    today:'',
    data:'',
    tableData:[],
    dingdang:[
      {
        name:'今日支付',
        money:1234,
        icon:'success',
        color:'lightgreen'
      },
      {
        name:'今日收藏',
        money:210,
        icon:'star-on',
        color:'#FFE485'
      },
      {
        name:'今日未支付',
        money:1234,
        icon:'s-goods',
        color:'lightblue'
      },
      {
        name:'本月支付',
        money:1234,
        icon:'success',
        color:'lightgreen'
      },
      {
        name:'本月收藏',
        money:210,
        icon:'star-on',
        color:'#FFE485'
      },
      {
        name:'本月未支付',
        money:1234,
        icon:'s-goods',
        color:'lightblue'
      },
    ]

  }
},

methods:{
  getCurrentDate() {
        //获取当前时间并打印
       
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth()+1;
    let dd = new Date().getDate();
    // let hh = new Date().getHours();
    // let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
    // let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
    return yy+'/'+mm+'/'+dd
    
    },
}
,
mounted(){
  this.today = this.getCurrentDate()
  getData()
      .then(({data}) => {
        const {tableData}=data.data
        this.tableData=tableData
        console.log(data)

       //折线图 ref快速获取节点
  const echart1=echarts.init(this.$refs.echart1)
  var echart1Option={
  
}

const {orderData}=data.data
const xAxis1 = Object.keys(orderData.data[0])

const xAxis1Data = {
  data:xAxis1
}

echart1Option.tooltip = {
  trigger: 'axis', // 触发类型，可以是 'axis' 或 'item'
  axisPointer: {
    type: 'cross' // 十字准星指示器
  }
};
echart1Option.xAxis={
  data:orderData.date
}
echart1Option.legend=xAxis1Data
echart1Option.yAxis={
}
echart1Option.series=[]
xAxis1.forEach((key)=>{
  echart1Option.series.push({

    name:key,
    data:orderData.data.map(item=>item[key]),
    type:'line'
  })
 
  
})
echart1.setOption(echart1Option)

//图二 柱状图
//1.初始化
const echart2 = echarts.init(this.$refs.echart2)
//2.定义
var echart2Option={}
//3.准备数据
const {userData} = data.data
//x
const xAxis2=userData.map(item=>item.date)

const newData = userData.map(item=>{
  const {date, ...rest}=item
  return rest
})
const xAxis2Data = Object.keys(newData[0])
console.log(xAxis2Data)
//4.定义xy上面
echart2Option.xAxis={
  data:xAxis2
}
echart2Option.tooltip = {
    trigger: 'axis', // 触发类型为坐标轴
    
};

echart2Option.yAxis={}
echart2Option.legend={}
//5配置

echart2Option.series=[]
xAxis2Data.forEach((key)=>{
  echart2Option.series.push({
    name:key,
    data:newData.map(item=>item[key]),
    type:'bar',
    
   
  })
})
//6显示
echart2.setOption(echart2Option)

//丙图
const echart3 = echarts.init(this.$refs.echart3);
const {videoData}=data.data
var echart3Option = {
  tooltip:{
    trigger:'item',
  },

    series: [
      {
        data:videoData,
        type:'pie'
      }
    ] 
};


echart3.setOption(echart3Option);

       })

  }

}

</script>

<style lang="less" scoped>
 
  .user{
    display: flex;
    align-items: center;
    padding-bottom: 15px;
   border-bottom: 1px solid grey;
   height: 97px;
   
    .name{
      font-size: 28px;
      margin-bottom: 10px;
    }
    .access{
      color: grey;
      font-size: 16px;
      font-weight: 400;
    }
  }

.user-info{
  margin-top: 15px;
  margin-bottom: 0;
  height: 30px;

  p{
    font-size: 10px;
    color:grey;
    font-weight: 400;
  }
  span{
    margin-left: 60px;
  }
}
.l-down{
  margin-top: 20px;
  height: 400px;
  
}
.haha{
  text-align: center;
  .name{
    font-size: 6px;
    color: grey;
    font-weight: 400;
    margin-left: 10px;
    margin-bottom: 10px;
   
  }
  .money{
   top: 10px;
   font-size: 22px;
   margin-left: 10px;
   margin: 2px 0;
   font-weight: 500;
    
  }}

.num{
  .el-card{
    width: 31.45%;
    margin-bottom: 15px;
    margin-right: 10px;
    height: 55px;
   
  }
}
.two{
  display: flex; 
  justify-content: space-between;
  margin-right: 10px; 
  .el-card{
    height: 186px;
    width: 305px;
  }

}





</style>