<template>
  <div>
        <!-- @input是原生事件，每次输入框有变化都会触发 -->
      <input 
        :placeholder="placeholder"
        :value="value"
        @input="handleInput"
      class="input">
  </div>
</template>

<script>
export default {

    props:[
        'placeholder',
        'name',
        'value',
        'rule'
    ],
    methods:{
        // 把用户输入值传给父组件事件名为input的事件
        handleInput(event){
            this.$emit("input",event.target.value)
        }
    }
    
}
</script>

<style scoped lang='less'>
    .input{
        width: 100%;
        height: 38 / 320 * 100vw;
        padding: 20px;
        border: none;
        background: #fff;
        border-bottom: 1px #666 solid;
        box-sizing: border-box;
        outline: none
    }
</style>