<template>
    <div class="header-wrapper">
        <a class="btn-menu">
            <i class="iconfont icon-caidan" />
        </a>
        <Nav />
        <a class="btn-search">
            <i class="iconfont icon-fangdajing" />
        </a>
    </div>
</template>

<script>
import Nav from './sub-comps/nav'

export default {
    components: {
        Nav
    }
};
// light
// bg #ffffff
// #4f4f4f active
// #828282

// dark
// bg #1a1e21
// #898989 active
// #27262b
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>