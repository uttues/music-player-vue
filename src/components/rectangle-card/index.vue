<template>
  <div class="retangle-card-wrapper">
    <img
      :src="imgUrl"
      alt
    />
    <div class="song-info-wrapper">
      <p>
        <span class="song-name">{{ songName }}</span>
        <!-- ar是一个数组，需要经过拼接处理 -->
        <span class="singler-info"> - {{ singerList }}</span>
      </p>
      <!-- <p>
        <span>{{ label }}</span>
        <span>{{ description }}</span>
      </p> -->
    </div>
    <img src="" />
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
