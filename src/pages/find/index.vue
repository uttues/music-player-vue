<template>
    <div>
        <SelectedSongList />
    </div>
</template>

<script>
import apis from "apis";
import SelectedSongList from './components/selected-song-list'
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
        SelectedSongList
    }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>