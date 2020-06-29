<template>
    <div>find</div>
</template>

<script>
import apis from "apis";
export default {
    mounted() {
        apis.find.getBannerSwiperList().then(res => {
            console.log(res);
        });
        apis.find.getSelectedSongLists().then(res => {
            console.log(res);
        });
        apis.find.getSongListCategory().then(res => {
            console.log(res);
        });
        apis.find.getNewDish().then(res => {
            console.log(res);
        });
        apis.find.getNewSongs().then(res => {
            console.log(res);
        });
    }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>