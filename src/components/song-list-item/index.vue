<template>
    <!-- 可以把最外层直接去掉嘛？ -->
    <div class="song-list-item-wrapper">
        <img :style="{'width': size, 'height': size}"
             :src="imgUrl"
             alt="">
        <span class="play-count">
            <i class="iconfont icon-bofang" />
            <span>{{ playCount | showCountingUnit }}</span>
        </span>
        <p :style="{'width': size}">{{ name }}</p>
    </div>
</template>

<script>
export default {
    props: {
        playCount: Number,
        name: String,
        imgUrl: String,
        id: Number,
        size: {
          type: String,
          default: '150px'
        }
    }
};
</script>

<style lang="scss" scope>
@import "./style.scss";
</style>
