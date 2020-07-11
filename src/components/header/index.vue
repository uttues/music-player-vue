<template>
  <div class="header-wrapper">
    <a
      class="btn-return iconfont icon-forward"
      @click="HandleRouterBackward"
    />
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    HandleRouterBackward() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
