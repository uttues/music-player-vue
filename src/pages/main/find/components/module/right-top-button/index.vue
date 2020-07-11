<!-- 传入参数：text，如果需要显示icon，包裹着i标签传入即可 -->
<template>
  <a
    class="right-top-btn-wrapper"
    :href="btnHref"
  >
    <span>
      <slot></slot>
      {{ btnText }}
    </span>
  </a>
</template>

<script>
export default {
  props: {
    btnText: String,
    btnHref: {
      type: String,
      default: "#"
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
