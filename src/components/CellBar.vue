<template>
  <div class="cell-wrap" @click="$emit('click',$event)">
      <div class="cell">
          <span>{{label}}</span>
          <!-- 用type来做判断改变文字的显示 -->
          <i>{{ type==="password" ? "******" : text}}</i>
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
    props:["label", "text", "type" ]
}
</script>

<style scoped lang="less">

.cell-wrap{
    padding-left: 10px;

    .cell{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 10px;
        height: 60 / 320 * 100vw;
        border-bottom: 1px #eee solid;

        i{
            display: block;
            flex: 1;
            text-align: right;
            padding: 0px 10px;
            font-size: 14px;
            color: #999;
        }
    }
}

</style>