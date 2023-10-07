import Cookie from 'js-cookie'
export default{
    namespaced:true,
    actions:{

    },
    mutations:{
        //修改展开方法
        COLLAPSEMENU(state){
            state.isCollapse=!state.isCollapse

        },
        //删除指定数据
        CLOSETAG(state,val){
            //删除
            const index= state.tabsList.findIndex(item=>item.name ===val.name)
            state.tabsList.splice(index,1)
      

        },

        //设置menu数据
        SHOWMENU(state,val){
          state.menu = val
          Cookie.set('menu',JSON.stringify(val))
        },

        //动态注册路由 
        ADDMENU(state,router){
            //判断缓存是否有数据 有数据 将menu设置为数据
            if(!Cookie.get('menu')) return

            const menu = JSON.parse((Cookie.get('menu')))

            state.menu = menu

            //组装
            const menuArry = []
            menu.forEach(item => {
                if(item.children){
                    item.children=item.children.map(item=>{
                        //在menu已有的属性下面添加compotent
                        item.component=()=>import(`../views/${item.url}`)
                        return item
                    })

            menuArry.push(...item.children)
                }
                else{
                    item.component=()=>import(`../views/${item.url}`)
                    menuArry.push(item)

                }
            });
            console.log(menuArry,'menuarry')

            //路由动态添加
            menuArry.forEach(item=>{
                router.addRoute('Main',item)
            })


           
        },

        //面包屑
        SELECTMENU(state,val){
            if(val.name !='home'){
                console.log(val,'我是tabjs的val')
                //存在返回索引 不存在返回-1
              const index= state.tabsList.findIndex(item=>item.name ===val.name)
              if(index===-1){
                //不存在就把我们点击得到的val的对象传进去
                state.tabsList.push(val)
              }
            }
        
        }

    },
    state:{
        isCollapse:false, //aside里面用于控制菜单的展开与收起
        
        tabsList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'s-home',
                url:'Home/Home'
            }

        ],//面包屑
        menu:[],
   
    }
}