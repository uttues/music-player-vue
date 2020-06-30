<template>
    <div>
        <SongListItem :playCount="222"
                      name="没事别拍我，我还以为是爱情来了"
                      img-url="http://p2.music.126.net/F_4tKddfa70mArodvqxSbg==/109951165083020150.jpg"
                      :id="5077259684" />
        <RightTopButton text="播放全部">
            <i class="iconfont icon-bofang1" />
        </RightTopButton>
    </div>
</template>

<script>
import apis from "apis";
import SongListItem from "components/song-list-item";
import RightTopButton from "./components/right-top-button";
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
        SongListItem,
        RightTopButton
    }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>