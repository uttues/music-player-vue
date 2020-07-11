<!-- 后期把这个组件抽成公用的page -->
<template>
  <div class="songlists-inner-page">
    <TopSwiper
      v-if="showSongLists"
      :list="swiperSongLists"
    />
    <div class=songlists-falls-container>
      <SongListItem
        class="songlist-card"
        v-for="item in showSongLists"
        :key="item.id"
        :playCount="item.playCount"
        :name="item.name"
        :imgUrl="item.coverImgUrl"
        size="2.14rem"
      />
    </div>
  </div>
</template>

<script>
import apis from "apis";
import TopSwiper from "../_components/swiper";
import SongListItem from "components/square-card";
export default {
  data() {
    return {
      swiperSongLists: [],
      showSongLists: []
    };
  },
  computed: {
    isShowSwiper() {
      return this.$route.path.indexOf("recommend") !== -1;
    }
  },
  components: {
    TopSwiper,
    SongListItem
  },
  mounted() {
    // 一次请求多少条？
    apis.find.getSelectedSonglists().then(res => {
      // 补充洗牌算法
      if (this.isShowSwiper) {
        this.swiperSongLists = res.data.playlists.slice(0, 3);
        console.log(this.swiperSongLists);
        this.showSongLists = res.data.playlists.slice(3);
      } else {
        this.showSongLists = res.data.playlists;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
