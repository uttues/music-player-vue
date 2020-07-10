<template>
  <div>
    <BannerSwiper class="banner-swiper" />
    <SelectedSonglists class="selected-songlists" />
    <SelectedSongs class="selected-song" />
  </div>
</template>

<script>
import SelectedSonglists from "./components/selected-songlists";
import BannerSwiper from "./components/banner-swiper";
import SelectedSongs from "./components/selected-songs";
export default {
  components: {
    SelectedSonglists,
    BannerSwiper,
    SelectedSongs
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>