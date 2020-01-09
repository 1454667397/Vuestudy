import VueRouter from 'vue-router'


import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'

import NewsList from './components/news/NewsList.vue'


import GoodsList from './components/goods/GoodsList.vue'
import Goodsinfo from './components/goods/Goodsinfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

var router = new VueRouter({
    routes:[//配置路由规则的
        {path:'/', redirect:'/home'},
        {path:'/home', component: HomeContainer},
        {path:'/member', component: MemberContainer},
        {path:'/shopcar', component: ShopcarContainer},
        {path:'/search', component: SearchContainer},
        {path:'/home/newslist', component: NewsList},
        {path:'/home/goodslist', component: GoodsList},
        {path:'/home/goodsinfo/:id',component:Goodsinfo},
        {path:'/home/goodsdesc/:id',component:GoodsDesc,name:"goodsdesc"},
        {path:'/home/goodscomment/:id',component:GoodsComment,name:"goodscomment"}
    ],
    linkActiveClass:'mui-active'
})


export default router