<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1"  @change="countChanged" ref="numbox"/>
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
            this.$emit("getCount",parseInt(this.$refs.numbox.value));
        }
    },
    props:["max"],
    watch:{
        // 属性监听
        "max":function (newVal) {
            //使用 MUI 的 JS API 设置最大值
            mui(".mui-numbox").numbox().setOption('max',newVal)
        }
    }
}
</script>

<style>
    
</style>