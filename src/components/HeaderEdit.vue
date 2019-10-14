<template>
  <div class="header">
      <!-- 添加图标和事件返回上一页 -->
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <h4>{{title}}</h4>
      <!-- 把用于占位置的图标隐藏 -->
      <span class="iconfont iconjiantou2"></span>
  </div>
</template>

<script>
export default {
    props:[ "title"]
}
</script>

<style scoped lang="less">
    .header{
        height: 60 / 320 * 100vw;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span{
            display: block;
            padding: 0 10px;
        }

        span:last-child{
            opacity: 0;
        }
    }
</style>