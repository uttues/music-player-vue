<template>
  <div>
    <Module title="不可错过的金曲">
      <div class=songs-container>
        <SongItemCard
          class="song-card"
          v-for="item in songs"
          :key="item.id"
          :song-id="item.id"
          :img-url="item.al.picUrl"
          :song-name="item.name"
          :singer-list="item.ar"
        ></SongItemCard>
      </div>
    </Module>
  </div>
</template>

<script>
import apis from "apis";
import Module from "../module";
import SongItemCard from "components/rectangle-card";
import { randomNumGenerator } from "utils";
import { filterSonglistsByTag } from "utils/find";
export default {
  components: {
    Module,
    SongItemCard
  },
  data() {
    return {
      catName: "",
      songListId: "",
      songs: []
    };
  },
  mounted() {
    this.updataRandomCatName();
  },
  methods: {
    // 随机选一个热门分类
    updataRandomCatName() {
      apis.find.getHotSonglistCategory().then(res => {
        const catData = res.data.tags;
        const randomIndex = randomNumGenerator(0, catData.length - 1);
        this.catName = catData[randomIndex].name;
        this.updateSonglistId();
      });
    },
    // 根据分类获取该热门歌单分类的歌单信息
    // 7.9 bug:接口请求到的还是cat=全部的歌单，所以选用筛选的方式来获取songLists，随机取一个songListId
    updateSonglistId() {
      apis.find.getSelectedSonglists(this.catName, 100).then(res => {
        const songLists = filterSonglistsByTag(
          res.data.playlists,
          this.catName
        );
        const randomIndex = randomNumGenerator(0, songLists.length - 1);
        this.songListId = songLists[randomIndex].id;
        this.updateSongs();
      });
    },
    updateSongs() {
      apis.find.getSonglistDetail(this.songListId).then(res => {
        this.songs = res.data.playlist.tracks;
        console.log(this.songs[1].ar);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
