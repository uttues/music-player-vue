<!-- 展示歌单item，可传入size来控制大小 -->
<template>
  <div
    class="songlist-card-wrapper"
    :style="{'width': size}"
  >
    <img
      :style="{'width': size, 'height': size}"
      v-lazy="imgUrl"
      alt
    />
    <p :style="{'width': size}">{{ name }}</p>
    <span class="play-count">
      <i class="iconfont icon-bofang" />
      <span>{{ playCount | showCountingUnit }}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    playCount: Number,
    name: String,
    imgUrl: String,
    size: {
      type: String,
      default: "1.5rem"
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
