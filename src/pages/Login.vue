<template>
    <div class="container">
        <!-- 关闭按钮 -->
        <div class="close" >
            <span class="iconfont iconicon-test"></span>
        </div>

        <!-- 图片LOGO -->
        <div class="logo">
            <span class="iconfont iconnew"></span>
        </div>

        <!-- 用户账号密码输入框 -->
        <!-- 渲染组件 -->
        <!-- input事件接收到子组件传值后触发handleusername事件 -->
        <Authinput
            placeholder="请输入手机号码"
            :value="form.username"
            @input="handleUsername"
        ></Authinput>


        <!-- 登录按钮 -->
        <button @click="handelSubmit">登录</button>
    </div>
</template>

<script>
// 引入input组件
import Authinput from '@/components/Authinput'

export default {
    data(){
        return{
            form:{
                username:"",
                password:""
            }
        }
    },

    methods:{
        // 把子组件传来的值赋值给data里的username实现双向绑定
        handleUsername(value){
            this.form.username=value
        },
        handelSubmit(){
            console.log(this.form);
            
        }

    },
    // 注册组件
    components:{
        Authinput
    }
}
</script>

<style scoped lang='less'>
    .container{
        padding: 20px
    }
    .close{
        span{
            font-size: 27 / 320 *100vw;
        }
    }
    .logo{
        display: flex;
        // 水平居中
        justify-content: center;
        span{
            display: block;
            font-size: 126 / 320 *100vw;
            color: #D81E06
        }
    }

</style>