import Vue from "vue";
//引入vant-ui组件
import Vant from "vant"
import {Toast} from "vant"
// 引入axios
import axios from 'axios'

// 路由：1.导入路由构造函数
import VueRouter from "vue-router";

// 导入组件
import App from "@/App";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Personal from "@/pages/Personal";

// 在.vue文件中要使用router-link或者router-view.需要注册下插件
Vue.use(VueRouter);
Vue.use(Vant)

// 把axios方法绑定到原型
Vue.prototype.$axios = axios;

// 设置基础路径
axios.defaults.baseURL = "http://localhost:3000"

// 路由：2.创建路由配置
const routes = [
    { path: "/login", component: Login},
    { path: "/register", component: Register},
    { path: "/personal", component: Personal},
]

// 路由：3.创建对象
const router = new VueRouter({
    routes
});


// 路由守卫
// to是跳转之后的页面，到哪去
// from是跳转之前的页面，从哪来
// next（）必须要调用才会进行路径跳转，输入路径参数可以重定向
router.beforeEach((to,from,next) => {
    // 取得token数据做是否有token的判断
    const hastoken = localStorage.getItem("token");
    // console.log(to);
    
    // 如果跳转这个页面才进行判断，其他页面next
    if(to.path =="/personal"){
        // 判断是否有token，有的话继续跳转，没有跳转到登录页
        if(hastoken){
            next()
        }else{
            next("/login")
        }
    }else{
        next()
    }
})


// axios统一拦截器，拦截响应，如果用户名之类的错误进行提示，卸载路由对象后面
axios.interceptors.response.use(res => {
    // console.log(res);
    const {message,statusCode} = res.data;
    
    if(statusCode === 401){
        Toast.fail(message)
    };

    // 如果本地token信息删除，修改，过期等失效，会导致用户信息失败，要重新登录
    if(message ==="用户信息验证失败"){
        router.push('/login')
    }

    return res;
})

new Vue({
    el: "#app",

    // 路由：4.挂载到根实例
    router,

    // 指定一个组件渲染根实例，这个组件可以成为最底层的组件
    render(createElement){
        // render函数使用固定的写法，只有App是可变；
        return createElement(App);
    }
})