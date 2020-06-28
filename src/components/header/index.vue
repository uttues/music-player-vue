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
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>