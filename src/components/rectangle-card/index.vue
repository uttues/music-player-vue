<template>
  <div class="retangle-card-wrapper">
    <img
      v-lazy="imgUrl"
      alt
    />
    <div class="song-info-wrapper">
      <p>
        <span class="song-name">{{ songName }}</span>
        <!-- ar是一个数组，需要经过拼接处理 -->
        -
        <span class="singer-info">{{ singerList | concatArrayBySlash }}</span>
      </p>
    </div>
    <div class="btn">
      <i class="iconfont icon-bofang1" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songId: Number,
    imgUrl: String,
    songName: String,
    singerList: Array
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
