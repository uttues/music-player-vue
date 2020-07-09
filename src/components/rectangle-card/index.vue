<template>
  <div class="retangle-card-wrapper">
    <img
      :src="imgUrl"
      alt
    />
    <div class="song-info-wrapper">
      <p>
        <span>{{ songName }}</span>
        <span> - {{ singer }}</span>
      </p>
      <p>
        <span>{{ label }}</span>
        <span>{{ description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: String,
    songName: String,
    singer: String,
    label: String,
    description: String
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
