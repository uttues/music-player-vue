import axios from 'apis/axios'

import {
    bannerSwiperList,
    selectedSongLists,
    songListCategory,
    newDish,
    newSongs
} from './config'

export default {
    /**
     * 发现页面-首页轮播图（返回列表）
     * https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=banner
     * @param{Number}type 资源类型，默认为 0 即PC
     */
    getBannerSwiperList(type = 0) {
        // 怎么传递参数？？
        console.log('getBannerSwiperList接口被调用了：' + bannerSwiperList + `type=${type}`);
        return axios.get(bannerSwiperList + `?type=${type}`)
    },

    /**
     * 发现页面-icon列表下面的，精选歌单（返回列表）
     * https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=歌单-网友精选碟-
     * @param{string}cat  tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部"
     * @param{number}limit 取出歌单数量 , 默认为 20
     * @param{number}before 分页参数，取上一页最后一个歌单的 updateTime 获取下一页数据
     */
    getSelectedSongLists(cat = '全部', limit = 20, before) {
        console.log('getSelectedSongLists接口被调用了：' + selectedSongLists + params);
        const params = {
            cat,
            limit,
            before
        }
        return axios.get(selectedSongLists, params)
    },

    /**
    * 获取歌单分类,包含 category 信息
    */
    getSongListCategory() {
        console.log('getSongListCategory接口被调用了：' + songListCategory);
        return axios.get(songListCategory)
    },


    /**
     * 发现页面-新碟上架
     * @param{number}limit 取出数量 , 默认为 50
     * @param{number}offset 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
     */
    getNewDish(limit = 50, offset = 0) {
        const params = {
            limit,
            offset
        }
        console.log('getNewDish接口被调用了：' + newDish + params);
        return axios.get(newDish, params)
    },

    /**
    * 发现页面-新歌速递
    * @param{Number}type 歌曲类型id，详情见文档
    */
    getNewSongs(type = 0) {
        console.log('getNewDish接口被调用了：' + newSongs + `?type=${type}`);
        return axios.get(newSongs + `?type=${type}`)
    },
}