<template>
  <div class="nav-row-wrapper">
    <div class="nav-links">
      <router-link
        class="nav-item"
        to="recommend"
        replace
      >推荐</router-link>
      <router-link
        class="nav-item"
        to="official"
        replace
      >官方</router-link>
      <router-link
        class="nav-item"
        to="quality"
        replace
      >精品</router-link>
      <router-link
        class="nav-item"
        to="Chinese"
        replace
      >华语</router-link>
      <router-link
        class="nav-item"
        to="lightMusic"
        replace
      >轻音乐</router-link>
      <router-link
        class="nav-item"
        to="popMusic"
        replace
      >流行</router-link>
      <router-link
        class="nav-item"
        to="rock"
        replace
      >摇滚</router-link>
      <router-link
        class="nav-item"
        to="ballad"
        replace
      >民谣</router-link>
    </div>
    <router-link
      tag="span"
      class="btn-tags"
      to="/songlistTags"
    ><i class="iconfont icon-yingyong1" /></router-link>
  </div>

</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
