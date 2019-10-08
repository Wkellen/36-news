<template>
    <div
    @click="handelClick"
     class="button">{{text}}</div>
</template>

<script>
export default {
    props:[
        "text"
    ],
    methods:{
        handelClick(event){
            this.$emit('click',event)
        }
    }
}
</script>

<style scoped lang='less'>
    .button{
        width: 100%;
        height: 48 / 320 * 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #cc3300;
        border-radius: 50px;
        color: #fff;
        font-size: 18px;
        // margin-top: 48 / 320 * 100vw
        
    }
</style>