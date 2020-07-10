<template>
  <div>
    <BannerSwiper class="banner-swiper" />
    <MenuBtnsRow class="menu-btns-row" />
    <SelectedSonglists class="selected-songlists" />
    <SelectedSongs class="selected-song" />
  </div>
</template>

<script>
import SelectedSonglists from "./components/selected-songlists";
import MenuBtnsRow from './components/menu-btns-row'
import BannerSwiper from "./components/banner-swiper";
import SelectedSongs from "./components/selected-songs";
export default {
  components: {
    SelectedSonglists,
    MenuBtnsRow,
    BannerSwiper,
    SelectedSongs,
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>