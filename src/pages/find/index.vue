<template>
  <div>
    <BannerSwiper />
    <SelectedSongLists />
    <SelectedSongs />
  </div>
</template>

<script>
import SelectedSongLists from "./components/selected-songlists";
import BannerSwiper from "./components/banner-swiper";
import SelectedSongs from "./components/selected-songs";
export default {
  components: {
    SelectedSongLists,
    BannerSwiper,
    SelectedSongs
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>