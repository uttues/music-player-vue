<!-- 展示歌单item，可传入size来控制大小 -->
<template>
  <div
    class="square-card-wrapper"
    :style="{'width': size}"
  >
    <img
      :style="{'width': size, 'height': size}"
      :src="imgUrl"
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
    id: Number,
    size: {
      type: String,
      default: "150px"
    }
  }
};
</script>

<style lang="scss" scope>
@import "./style.scss";
</style>
