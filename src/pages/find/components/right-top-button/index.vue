<!-- 传入参数：text，如果需要显示icon，包裹着i标签传入即可 -->
<template>
    <a class="right-top-btn-wrapper"
       href="#">
        <span>
            <slot></slot>
            {{ text }}
        </span>
    </a>
</template>

<script>
export default {
    props: {
        text: String
    }
};
</script>

<style lang="scss" scope>
@import "./style.scss";
</style>
