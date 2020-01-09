<template>
    <div class="goods-list">
        <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        //data是往自己组件内部中挂载一些私有数据的
        return{
            pageindex: 1, //分页的页数
            goodslist: [] //存放商品列表的数组
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            //获取商品列表
            this.$http
            .get("api/getgoods?pageindex=" + this.pageindex)
            .then(result=>{
                if (result.data.status === 0) {
                    // this.goodslist = result.data.message
                    this.goodslist = this.goodslist.concat(result.data.message);
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        }
    }
}
</script>

<style scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 7px;
    padding-top: 0;
}
.goods-item{
    width: 49%;
    border: 1px solid #ccc;
    margin-top: 7px;
    box-shadow: 0 0 7px #ccc;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
}
.goods-item>img{
    width: 100%;
    min-height: 170px;
}
.goods-item>h1{
    font-size: 14px;
}
.info{
    background-color: #eee;
}
.info>p{
    margin: 3px;
}
.price> .now{
    color: red;
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
}
.price> .old{
    text-decoration: line-through;
    font-size: 12px;
}
.sell{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}
.mint-button{
    margin-top: 7px;
}
</style>


