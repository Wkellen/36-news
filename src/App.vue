<template>
  <div class="colorRed">

      <div class="box"></div>
      <router-link to="/login">登录页</router-link>
      <router-view></router-view>

  </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    }
}
</script>

<style>
    /* 公共样式 */
    *{
        margin: 0;
        padding: 0;
    }

    a{
        color:inherit;
    }
    a:hover{
        text-decoration: none;
    }
    ol,ul,li{
        list-style: none;
    }
    i,em{
        font-style: normal;
    }
</style>