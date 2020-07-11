<template>
  <div>
    <Module title="人气榜单推荐">
      <!-- <template v-slot:module-header-content>
            </template> -->
      <template v-slot:module-btn-icon>
        <i class="iconfont icon-bofang1" />
      </template>
      <div class=songlists-container>
        <SongListItem
          class="songlist-card"
          v-for="item in songLists"
          :key="item.id"
          :playCount="item.playCount"
          :name="item.name"
          :imgUrl="item.coverImgUrl"
          size="2.08rem"
        />
      </div>
    </Module>
  </div>
</template>

<script>
import apis from "apis";
import Module from "../module";
import SongListItem from "components/square-card";
export default {
  data() {
    return {
      randomModuleTitle: [
        "人气榜单推荐",
        "发现好歌单",
        "你的歌单精选站",
        "人气歌单推荐"
      ],
      songLists: []
    };
  },
  components: {
    Module,
    SongListItem
  },
  mounted() {
    apis.find.getSelectedSonglists("全部", 6).then(res => {
      // 补充洗牌算法
      this.songLists = res.data.playlists.slice(0, 6);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
