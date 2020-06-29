<template>
    <!-- 可以把最外层直接去掉嘛？ -->
    <div class="song-list-item-wrapper">
        <img :src="imgURL"
             alt="">
        <span class="play-count">
            <i class="iconfont icon-bofang" />
            <span>{{ playCount }}</span>
        </span>
        <p>{{ name }}</p>
    </div>
</template>

<script>
export default {
    // props: {
    //     playCount: Number,
    //     name: String,
    //     imgURL: String,
    //     id: Number
    // }
    data() {
        return {
            playCount: 112739,
            name: "没事别拍我，我还以为是爱情来了",
            imgURL:
                "http://p2.music.126.net/F_4tKddfa70mArodvqxSbg==/109951165083020150.jpg",
            id: 5077259684
        };
    }
};
</script>

<style lang="scss" scope>
@import "./style.scss";
</style>
