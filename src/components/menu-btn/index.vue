<!-- 使用时传入i标签即可，无需设置样式，除非嵌入其他逻辑（日历） -->
<template>
  <router-link
    tag="span"
    class="menu-btn-wrapper"
    :to="path"
  >
    <span class="btn-icon">
      <slot><i class="iconfont icon-rili_fuzhi" /></slot>
    </span>
    <span
      class="btn-text"
      v-if="text"
    >{{ text }}</span>
  </router-link>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: "#"
    },
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>