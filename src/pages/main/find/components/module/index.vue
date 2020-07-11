<template>
  <div class="module-wrapper">
    <div class="module-header">
      <h2 class="module-title">
        <!-- 可以在这个具名插槽里放入 tab 页的标签，否则默认显示 文字title -->
        <slot name="module-header-content">{{ title }}</slot>
      </h2>
      <RightTopButton
        btn-text="播放全部"
        btn-href="#"
      >
        <!-- 可以在这个具名插槽里放入按钮中的小图标（i标签），无需更新特定样式 -->
        <slot name="module-btn-icon"></slot>
      </RightTopButton>
    </div>
    <!-- 默认插槽，放置模块主体内容 -->
    <slot></slot>
  </div>
</template>

<script>
import RightTopButton from "./right-top-button";
export default {
  props: {
    title: String
  },
  components: {
    RightTopButton
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
