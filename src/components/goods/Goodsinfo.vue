<template>
    <div class="goodsinfo-container">

    <transition
    @before-enter="beforeEnter"
    @enter="enter"
    >
    <!-- @after-enter="afterEnter" -->
        <div class="ball" v-show="ballflag" ref="ball"></div>
    </transition>


        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>



        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量：<numbox @getCount="getSelectCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>&nbsp;
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>



        <!-- 商品详情区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsinfo.add_time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
// 导入轮播图组件
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/goodsinfo_numbox.vue'

export default {
    data(){
        return{
            id:this.$route.params.id, //将路由参数上的id挂载到data,方便后期调用
            lunbotu:[],
            goodsinfo:{},
            ballflag:false,
            selectCount:1
        }
    },
    created(){
        this.getLunbotu();
        this.getGoodsinfo();
    },
    methods:{
        getLunbotu(){
            this.$http
            .get("api/getthumimages/"+this.id)
            .then(result=>{
                if (result.data.status === 0) {
                    // 先循环轮播图每一项，为item 添加img属性
                    result.data.message.forEach(item => {
                        item.img = item.src;
                    });
                    this.lunbotu=result.data.message
                }
            })
        },
        getGoodsinfo(){
            // 获取商品的信息
            this.$http.get("api/goods/getinfo/"+this.id).then(result=>{
                if (result.data.status === 0) {
                    this.goodsinfo = result.data.message[0];
                }
            })
        },
        goDesc(id){
            // 点击使用编程式导航跳转到图文详情页面
            this.$router.push({name:'goodsdesc',params:{id}});
        },
        goComment(id){
            // 点击使用编程式导航跳转到评论详情页面
            this.$router.push({name:'goodscomment',params:{id}});

        },
        addToShopCar(){
            this.ballflag = !this.ballflag;
            var goodsinfo =     //拼接出一个，要保存到store中car数组里的商品信息对象
            {id:this.id,
            count:this.selectCount,
            price:this.goodsinfo.sell_price,
            selected:true};

            this.$store.commit("addToCar",goodsinfo)
        },
        beforeEnter(el){
            // 将小球放置定位好的位置（0，0）
            el.style.transform = "translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth; 
            //设置后可出现动画？？？？？？


            // 确定小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //确定徽标（购物车中未付款的数量）位置
            const badgePosition = document.getElementById("badge").getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;



            el.style.transform = `translate(${xDist}px,${yDist}px)`;
            el.style.transition = "all 0.5s ease";
            done(); //是对afterEnter的引用 done 回调函数，直接跳过小球的出场动画


        },
        // afterEnter(el){
        //     // this.ballflag = !this.ballflag;
        //     console.log("aaaaaaaaaa");
        // }
        getSelectCount(count){
            //当子组件将选中的数量传递给父组件时，将数值保存到 data 中
            this.selectCount = count;
            // console.log("父组件拿到的数值为："+count);
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>

<style scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
}
.now_price{
    color: red;
    font-size: 16px;
    font-weight: bold;
}
.mui-card-footer{
    display: block;
}
.mui-card-footer>button{
    margin: 15px 0;
}
.ball{
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: blue;
    z-index: 99;
    top: 388px;
    left: 153px;
}
</style>
