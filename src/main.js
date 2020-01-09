import Vue from 'vue'
import {Header,Swipe, SwipeItem,Button,Switch} from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'


import './hello-mui/css/mui.min.css'
import './hello-mui/css/icons-extra.css'

//ajax请求
import axios from 'axios'
// 错误方式：Vue.use(axios) xios并不是vue插件，所以不能 使用Vue.use()
// 正确方式 将 axios 改写为 Vue 的原型属性
Vue.prototype.$http= axios
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';



import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from './router'


// 阻止浏览器启动生产消息，常用作指令。
Vue.config.productionTip = false

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);


// 注册vue
import Vuex from 'vuex';
Vue.use(Vuex);

var car =  JSON.parse(localStorage.getItem('car') || '[]');


var store = new Vuex.Store({
  state:{
    car:car  //在car数组中，存储一些商品的对象
    // 商品对象的设计
    // {id:商品的id,
    // count:要购买的数量，
    // price:商品的单价,
    // selected:flase}
  },
  mutations:{
    addToCar(state,goodsinfo){
      // 点击加入购物车，把商品信息，保存到 store 中的 car上

      // 假设 在购物车中，没有找到对应的商品
      var flag = false;

      state.car.some(item=>{
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      if (flag === false) {
        state.car.push(goodsinfo)
      }
      // console.log(state.car) 
      
      // 当更新car之后，把car数组，存储到本地的 localStoreage 中
      localStorage.setItem('car',JSON.stringify(state.car)) 
    },
    updateGoodsInfo(state,goodsinfo){
      // 修改购物车中商品的数量
      state.car.some(item=>{
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })

      // 当修改完商品的数量，把最新的购物车数据 保存到 本地存储中
      localStorage.setItem('car',JSON.stringify(state.car)) 
    },
    removeFromCar(state,id){
      // 根据Id,从store 中的购物车中删除对应的那条商品数据
      state.car.some((item,i)=>{
        if (item.id == id) {
          state.car.splice(i,1)
          return true;
        }
      })

     // 当修改完商品的数量，把最新的购物车数据 保存到 本地存储中
     localStorage.setItem('car',JSON.stringify(state.car)) 
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })

      localStorage.setItem('car',JSON.stringify(state.car)) 
    }
  },
  getters:{
    getAllCount(state){
      var c = 0
      state.car.forEach(item =>{
        c += item.count
      })
      return c
    },
    getGoodsCount(state){
      var o = {}
      state.car.forEach(item =>{
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state){
      var o = {}
      state.car.forEach(item =>{
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state){
      var o = {
        count : 0, // 商品的总数量
        amount : 0 // 商品的总价
      }
      state.car.some(item=>{
        if (item.selected) {
          o.count += item.count
          o.amount += item.count*item.price
        }
      })
      return o
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
