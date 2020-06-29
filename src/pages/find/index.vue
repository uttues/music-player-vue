<template>
    <div>
        <SongListItem />
    </div>
</template>

<script>
import apis from "apis";
import SongListItem from "components/song-list-item";
export default {
    mounted() {
        apis.find.getSelectedSongLists("全部", 200).then(res => {
            console.log(res);
        });
        // apis.find.getBannerSwiperList().then(res => {
        //     console.log(res);
        // });
        // apis.find.getSongListCategory().then(res => {
        //     console.log(res);
        // });
        // apis.find.getNewDish().then(res => {
        //     console.log(res);
        // });
        // apis.find.getNewSongs().then(res => {
        //     console.log(res);
        // });
    },
    components: {
        SongListItem
    }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>