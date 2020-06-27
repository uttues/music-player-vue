<template>
    <div class="nav-links">
        <a class="nav-item" @click="clickRouterForward('profile')">我的</a>
        <a class="nav-item" @click="clickRouterForward('find')">发现</a>
        <a class="nav-item" @click="clickRouterForward('community')">云村</a>
        <a class="nav-item" @click="clickRouterForward('videos')">视频</a>
    </div>
</template>

<script>
export default {
    methods: {
        clickRouterForward(path) {
            // 好像没有感觉到replace与push的区别？
            this.$router.replace(`/${path}`)
        }
    }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>