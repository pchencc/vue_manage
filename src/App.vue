<template>
  <div>


  <div>
    <router-view></router-view>
  </div>
  
  </div>
</template>

<script>


import Main from './views/Main.vue'
export default {
name:'App',
components:{
  Main
}

}
</script>

<style>
html,body,h1{
  margin: 0;
  padding: 0;

}


</style>
