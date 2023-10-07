import Mock from 'mockjs'
//图表数据
let List = []

export default{
    getSatisticalData:()=>{

        for(let i = 0;i<7;i++){
            List.push(
                Mock.mock({
                    oppo:Mock.Random.float(100,8000,0,0),
                    vivo:Mock.Random.float(100,8000,0,0),
                    小米:Mock.Random.float(100,8000,0,0),
                    苹果:Mock.Random.float(100,8000,0,0),
                    华为:Mock.Random.float(100,8000,0,0),

                })
            )
        }

        return{
            code:20000,
            data:{
                //饼 
                videoData:[
                    {
                        name:'小米',
                        value:1666
                    },
                    {
                        name:'苹果',
                        value:5999
                    },
                    {
                        name:'华为',
                        value:3666
                    },
                    {
                        name:'oppo',
                        value:1999
                    },
                    {
                        name:'vivo',
                        value:2999
                    },
                ],
                userData:[
                    {
                        date:'周一',
                        new:15,
                        active:200
                    },
                    {
                        date:'周二',
                        new:60,
                        active:100
                    },
                    {
                        date:'周三',
                        new:75,
                        active:1200
                    },
                    {
                        date:'周四',
                        new:85,
                        active:290
                    },
                    {
                        date:'周五',
                        new:59,
                        active:210
                    },
                    {
                        date:'周六',
                        new:51,
                        active:1200
                    },
                    {
                        date:'周天',
                        new:90,
                        active:2100
                    },
                ],
                //折线图
                orderData:{
                    date:['20230101','20230102','20230103','20230104','20230105','20230106','20230107',],
                    data:List
                },
                tableData:[
                    {
                        name:'oppo',
                        todayBuy:100,
                        monthBuy:300,
                        totalBuy:800
                      },
                      {
                        name:'vivo',
                        todayBuy:100,
                        monthBuy:200,
                        totalBuy:300
                      },{
                        name:'小米',
                        todayBuy:200,
                        monthBuy:300,
                        totalBuy:900
                      },{
                        name:'苹果',
                        todayBuy:150,
                        monthBuy:250,
                        totalBuy:700
                      },{
                        name:'华为',
                        todayBuy:400,
                        monthBuy:500,
                        totalBuy:1000
                      }
                ]
            }
        }
    }
}