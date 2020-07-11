<template>
  <div>
    <Header />
    <router-view />
    <button
      class="btn-transfer"
      @click="testTransferTheme"
    >主题切换</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { TOGGLE_THEME } from "store/mutation-types";
import Header from "./_components/header";

export default {
  components: {
    Header
  },
  methods: {
    ...mapMutations([TOGGLE_THEME]),

    testTransferTheme() {
      this.$store.commit(TOGGLE_THEME);
      document.documentElement.setAttribute(
        "data-theme",
        this.$store.state.theme
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
