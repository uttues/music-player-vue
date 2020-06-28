<template>
    <div id="app">
        <Header />
        <router-view />
        <button class="btn-transfer" @click="testTransferTheme">主题切换</button>
    </div>
</template>

<script>
import Header from "components/header";

export default {
    name: "App",
    components: {
        Header
    },
    data() {
        return {
            theme: 'day'
        }
    },
    methods: {
        testTransferTheme(){
            this.theme = this.theme === 'day' ? 'night' : 'day'
            document.documentElement.setAttribute(
                "data-theme",
                this.theme,
            );
        }
    }
};
</script>

<style lang="scss">
body {
  @include common-bg-color(bg)
}
</style>
