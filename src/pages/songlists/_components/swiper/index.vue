<template>
  <div class="banner-swiper-container">
    <Swiper
      height='5rem'
      show-arrow-type="never"
      handle-indication-type="hover"
      :drag-ratio-min-limit="0.5"
      :loop="true"
      :autoplay="true"
      mode-type="card"
    >
      <SwiperItem
        v-for="(item, index) in list"
        :key="index"
      >
        <a class="banner-item">
          <SwiperSonglistCard
            class="songlist-card"
            :key="item.id"
            :playCount="item.playCount"
            :name="item.name"
            :imgUrl="item.coverImgUrl"
            size="3.36rem"
          />
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import apis from "apis";
import SwiperSonglistCard from "../swiper-songlist-card";
import { Swiper, SwiperItem } from "components/swiper-card";
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      banners: []
    };
  },
  components: {
    Swiper,
    SwiperItem,
    SwiperSonglistCard
  },
  methods: {
    MarkBgColor(color) {
      switch (color) {
        case "blue":
          return "rgb(50, 147, 221, .95)";
        case "red":
          return "rgb(231, 67, 67, .95)";
        default:
          return "rgb(255, 255, 255, .95)";
      }
    }
  },
  mounted() {
    apis.find.getBannerSwiperList().then(res => {
      this.banners = res.data.banners;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>