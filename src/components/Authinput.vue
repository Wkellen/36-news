<template>
  <div>
    <!-- @input是原生事件，每次输入框有变化都会触发 -->
    <!-- 创建动态class，值可以为对象，key为类名，用值做判断，结果为true就添加key为类名，可叠加类名 -->
    <input
      class="input"
      :class="{
             success: status ==='success',
             error: status ==='error'
         }"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: ""
    };
  },
  props: ["placeholder", "name", "value", "rule", "err_message"],
  methods: {
    // 把用户输入值传给父组件事件名为input的事件
    handleInput(event) {
      // 结构赋值value
      const { value } = event.target;
      this.$emit("input", value);

      // 把值用正则做判断，如果是true赋值status为success，不是则为error
      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = "success";
        } else {
          this.status = "error";
        }
      }
    },

    handleChange() {
      if (this.err_message && this.status =="error") {
        // alert(this.err_message);
            this.$toast.fail(this.err_message)
      }
    }
  }
};
</script>

<style scoped lang='less'>
.input {
  width: 100%;
  height: 38 / 320 * 100vw;
  // padding: 20px;
  margin-bottom: 20px;
  margin-top: 8px;
  border: none;
  background: #fff;
  border-bottom: 2px #666 solid;
  box-sizing: border-box;
  outline: none;
  font-size: 18px;
}

.success {
  border-bottom: 2px blue solid;
}

.error {
  border-bottom: 2px red solid;
}
</style>