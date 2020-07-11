<template>
  <div>
    <Header title="歌单广场" />
    <router-view />
  </div>
</template>

<script>
import Header from "components/header";
export default {
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
