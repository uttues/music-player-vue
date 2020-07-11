<template>
  <div>
    <div class=songlists-container>
      <SongListItem
        class="songlist-card"
        v-for="item in songLists"
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
import SongListItem from "components/square-card";
export default {
  data() {
    return {
      songLists: []
    };
  },
  components: {
    SongListItem
  },
  mounted() {
    apis.find.getSelectedSonglists().then(res => {
      // 补充洗牌算法
      this.songLists = res.data.playlists;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
