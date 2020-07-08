<template>
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
    >sss</SwiperItem>
    <!-- <SwiperItem
      v-for="(item, index) in banners"
      :key="`banner-item-${index}`"
    >
      <div class="banner-item">
        {{ index }}
      </div>
    </SwiperItem> -->

  </Swiper>
</template>

<script>
import apis from "apis";
import { Swiper, SwiperItem } from "components/swiper";
export default {
  data() {
    return {
      banners: [],
      arr: [12, 2]
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  mounted() {
    apis.find.getBannerSwiperList().then(res => {
      this.banners = res.data.banners;
      console.log(this.banners);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>