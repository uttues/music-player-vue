<template>
  <div>
    <Header title="歌单广场" />
    <NavRow />
    <router-view />
  </div>
</template>

<script>
import Header from "components/header";
import NavRow from "./_components/nav-row";
export default {
  components: {
    Header,
    NavRow
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
