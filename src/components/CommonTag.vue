<template>
  <div class="tabs">
    <div class="tag-group">
 
  <el-tag
  size="small"
  @close="handleClose(item, index)"
  @click="changeMenu(item)"
    v-for="(item, index) in tags"
    :key="item.label"
    :closable="item.name!=='home'"
    :effect="$route.name===item.name?'dark':'plain'">
    {{ item.label }}
  </el-tag>
</div>

</div>

</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
name:'CommonTag',
data(){
    return{

    }
},
computed:{
    ...mapState('tab',{tags:'tabsList'})
},
methods:{
    //点击tag跳转
    changeMenu(item){
    // this.$router.push(item.path)
    this.$router.push({name:item.name})
    },

    //点击tag删除
    handleClose(item,index){
    
    this.closeTag(item)

    //删除之后的跳转
    //如果删中间一项 不跳转
    if(item.name!==this.$route.name){
        return   
            }
            
    //最后一项
    if(index===this.tags.length){
    this.$router.push({
        name:this.tags[index-1].name
    })

    }else{
        //删除中间想后面跳
        this.$router.push({
        name:this.tags[index].name
    })
    }
    },
   ...mapMutations('tab',{closeTag:'CLOSETAG'})
}

}
</script>

<style scoped lang="less">
.tabs{
    padding: 10px;
    padding-bottom: 0px;
    margin-left: 10px;
    
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>