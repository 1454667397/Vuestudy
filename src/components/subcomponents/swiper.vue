<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 谁用轮播图组件，谁为我们提供 lunbotuList -->
            <!-- 此时，lunbotuList 应该是父组件给子组件传值来设置 -->
        <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
            <img :src="item.img" alt="" :class={full:isfull}>
        </mt-swipe-item>
        </mt-swipe>
    </div>
</template>


<script>
export default {
    props:["lunbotuList","isfull"]
}
</script>


<style scoped>
.mint-swipe{
    text-align: center;
    height: 200px;
}
img{
    /* width: 100%; */
    height: 100%;
}
.full{
    width: 100%;
}
</style>
