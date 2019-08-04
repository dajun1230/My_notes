# 基本写法

## 快捷键
> Vs code快捷键：scaffold;

``` js
<template>
    <div class="wel">
        <button @:click="clickFunc">点击</button>
        <cart-item :carts="carts"></cart-item> // 组件写法
    </div>
</template>

<script>
import { BIND_MAC } from "@/config/api";
import CartItem from "@/components/CartItem"; // 引用CartItem组件

export default {
    name: 'welcome',
    components: {
        CartItem
    },
    data () {
        return {
            list: []
        }
    },
    computed: {

    },
    method: {
        async reqData() { //接口请求
            try {
                let res = await this.$requset();
                if (res.data.status === 200) {
                    console.log('请求成功')
                } else {
                    console.log('请求失败')
                }
            } catch (error) {
                console.log(error)
            }
        },
        clickFunc () { // 第一种写法
            console.log('点击事件')
        },
        mouseFunc: function () { // 第二种写法
            console.log('移动事件')
        }
    }
}
</script>

<style  lang="scss" scoped>
@import "./style"; // 引用当前目录下的style.scss文件
</style>
```

## 基本配置
> src/main.js
``` js
import Vue from 'vue'
import App from './App'
import {
  $Toast,
  $Message
} from '../static/iView/base/index'
import config from '@/config/index';    //全局参数
import * as wxApi from '@/utils/wxApi'; //统一封装的微信api;
import wxRequest from '@/utils/request';


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
app.$mount();

Vue.prototype.$Toast = $Toast;
Vue.prototype.$Message = $Message;
Vue.prototype.$config = config;
Vue.prototype.$wxApi = wxApi;
Vue.prototype.$request = wxRequest;
```