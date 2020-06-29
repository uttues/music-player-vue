<template>
    <div>
        <SongListItem :playCount="222"
          name="没事别拍我，我还以为是爱情来了"
          img-url="http://p2.music.126.net/F_4tKddfa70mArodvqxSbg==/109951165083020150.jpg"
          :id="5077259684" 
        />
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