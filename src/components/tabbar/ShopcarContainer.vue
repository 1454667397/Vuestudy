<template>
  <div class="shopcar-container">
    <div class="goods-list">
      
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch 
            v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <a href="#" @click="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价 <span class="red">￥ {{$store.getters.getGoodsCountAndAmount.amount}}</span> </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

      <p>{{$store.getters.getGoodsSelected}}</p>

  </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue';

export default{
  data() {
    return {
      goodslist:[]
    }
  },
  created(){
    this.getGoodsList();
  },
  methods:{
    getGoodsList(){
      // 获取到 store 中所有的商品的Id,然后拼接出一个 用逗号分隔的 字符串
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      // 没有商品直接返回，否则报错
      if (idArr.length<=0) {
        return;
      }
      // 获取购物车商品列表
      this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then(result=>{
        if (result.data.status === 0) {
          this.goodslist = result.data.message;
        }
      });
    },
    remove(id,index){
      // 点击删除，把商品从store中根据传递的Id删除，同时，把当前组件中的 goodsList 中，对应删除的那个商品，使用index 来删除
      this.goodslist.splice(index,1);
      this.$store.commit("removeFromCar",id);
    },
    selectChanged(id,val){
      this.$store.commit('updateGoodsSelected',{id,selected:val})
    }
  },
  components:{
    numbox
  }
}
</script>

<style  scoped>
.shopcar-container{
  background-color: #eee;
  overflow: hidden;
}
.goods-list img{
  height: 60px;
  width: 60px;
}
.goods-list h1{
  font-size: 13px;
}
.price{
  color: red;
  font-weight: bold;
}
.mui-card-content-inner{
  display: flex;
  align-items: center;
}
.info{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.info>p{
  display: flex;
  justify-content: space-between;
}
.jiesuan{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.red{
  color: red;
  font-weight: bold;
  font-size: 16px;
}
</style>







