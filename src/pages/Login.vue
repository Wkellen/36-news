<template>
    <div>
        <!-- 关闭按钮 -->
        <div class="close">
            <span class="iconfont iconicon-test"></span>
        </div>

        <!-- 图片LOGO -->
        <div class="logo">
            <span class="iconfont iconnew"></span>
        </div>

        <!-- 用户账号密码输入框 -->
        <div>
            <input type="text">
        </div>
        <div>
            <input type="text">
        </div>

        <!-- 登录按钮 -->
        <button>登录</button>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>

    .close{
        padding: 20px;

        span{
            font-size: 27 / 320 *100vw;
        }
    }
    .logo{
        display: flex;
        justify-content: center;
        span{
            display: block;
            font-size: 126 / 320 *100vw;
            color: #D81E06
        }
    }

</style>