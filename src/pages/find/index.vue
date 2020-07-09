<template>
  <div>
    <BannerSwiper />
    <SelectedSongList />
  </div>
</template>

<script>
import SelectedSongList from "./components/selected-songlist";
import BannerSwiper from "./components/banner-swiper";
export default {
  components: {
    SelectedSongList,
    BannerSwiper
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>