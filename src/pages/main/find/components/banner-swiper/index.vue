<template>
  <div class="banner-swiper-container">
    <Swiper
      height='2.58rem'
      show-arrow-type="never"
      handle-indication-type="hover"
      :drag-ratio-min-limit="0.33"
      :loop="true"
      :autoplay="true"
    >
      <SwiperItem
        v-for="(item, index) in banners"
        :key="index"
      >
        <a class="banner-item">
          <img
            :src="item.imageUrl"
            alt
          />
          <span
            class="banner-item-mark"
            :style="{'background-color': MarkBgColor(item.titleColor)}"
          >{{ item.typeTitle }}</span>
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import apis from "apis";
import { Swiper, SwiperItem } from "components/swiper";
export default {
  data() {
    return {
      banners: []
    };
  },
  components: {
    Swiper,
    SwiperItem
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