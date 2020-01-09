<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max' style="height:25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount"  @change="countChanged" ref="numbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../hello-mui/js/mui.js'

export default {
    mounted(){
        mui(".mui-numbox").numbox();
    },
    methods: {
        countChanged(){
            // 数量发生改变，把最新的数量同步到 购物车的 store 中，覆盖之前的数量值
            this.$store.commit("updateGoodsInfo",{id:this.goodsid,count:this.$refs.numbox.value})
        }
    },
    props:["initcount","goodsid"]
}
</script>

<style>
    
</style>