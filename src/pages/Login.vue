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
            placeholder="手机号"
            :value="form.username"
            @input="handleUsername"
            :rule="/^1[0-9]{4,10}$/"
            err_message="手机格式不正确"
        ></Authinput>


        <Authinput
            type="password"
            placeholder="密码"
            v-model="form.password"
            :rule="/^[0-9a-zA-Z]{3,12}$/"
            err_message="密码格式不正确"
        ></Authinput>


        <p class="tips">没有账号？
        <router-link to="/register">去注册</router-link>
        </p>

        <!-- 登录按钮 -->
        <!-- <button @click="handelSubmit">登录</button> -->
        <AuthButton text="登录" @click="handelSubmit"></AuthButton>
    </div>
</template>

<script>

// 引入input组件
import Authinput from '@/components/AuthInput'
import AuthButton from '@/components/AuthButton'

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
            // console.log(this.form);
            this.$axios({
                url:"/login",
                method:"POST",
                data:this.form, 
            }).then( res =>{
                const {message,data} =res.data;

                if(message ==="登录成功"){
                    // 保存用户信息到本地
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("user_id",data.user.id);

                    // 判断成功跳转到首页
                    this.$router.push("/personal")

                }
                
            })
            
        }

    },
    // 注册组件
    components:{
        Authinput,
        AuthButton
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

    .tips{
        text-align: right;
        margin-bottom: 20px;

        a{
            color: #3385ff;
        }
    }

</style>