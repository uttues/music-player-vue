<template>
  <div class="menu-btns-wrapper">
    <MenuBtn
      class="btn"
      text="每日推荐"
      path="/dailyRecommend"
    >
      <i class="iconfont icon-rili_fuzhi" />
      <span class="date">{{ new Date().getDate() }}</span>
    </MenuBtn>
    <MenuBtn
      class="btn"
      text="歌单"
      path="/songlists"
    ><i class="iconfont icon-gedan" /></MenuBtn>
    <MenuBtn
      class="btn"
      text="排行榜"
      path="/rankingList"
    ><i class="iconfont icon-paixingbang" /></MenuBtn>
    <MenuBtn
      class="btn"
      text="电台"
      path="/broadcastingStation"
    ><i class="iconfont icon-diantai" /></MenuBtn>
    <MenuBtn
      class="btn"
      text="直播"
    ><i class="iconfont icon-zhiboguankanliangbofangsheyingshexiangjimianxing" /></MenuBtn>
    <MenuBtn
      class="btn"
      text="火前留名"
    ><i class="iconfont icon-huo" /></MenuBtn>
    <MenuBtn
      class="btn"
      text="唱聊"
    ><i class="iconfont icon-zhuanji-" /></MenuBtn>
    <MenuBtn
      class="btn"
      text="线上演出"
    ><i class="iconfont icon-huatong" /></MenuBtn>
  </div>
</template>

<script>
import MenuBtn from "components/menu-btn";
export default {
  components: {
    MenuBtn
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
