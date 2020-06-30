<template>
    <div>
        <Module title="人气榜单推荐">
            <!-- <template v-slot:module-header-content>
            </template> -->
            <template v-slot:module-btn-icon>
                <i class="iconfont icon-bofang1" />
            </template>
            <SongListItem :playCount="222"
                          name="没事别拍我，我还以为是爱情来了"
                          img-url="http://p2.music.126.net/F_4tKddfa70mArodvqxSbg==/109951165083020150.jpg"
                          :id="5077259684" />
        </Module>
    </div>
</template>

<script>
import Module from "../module";
import SongListItem from "components/song-list-item";
export default {
    components: {
        Module,
        SongListItem
    }
};
</script>

<style lang="scss" scope>
@import "./style.scss";
</style>
