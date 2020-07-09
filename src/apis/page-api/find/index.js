import axios from 'apis/axios'

import {
    bannerSwiperList,
    selectedSonglists,

    hotSonglistCategory,
    songlistDetail,
    songDetail,
    albumContent,

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
        return axios.get(bannerSwiperList + `?type=${type}`)
    },

    /**
     * 发现页面-icon列表下面的，精选歌单（返回列表）
     * https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=歌单-网友精选碟-
     * @param{string}cat  tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部"
     * @param{number}limit 取出歌单数量 , 默认为 20
     * @param{number}before 分页参数，取上一页最后一个歌单的 updateTime 获取下一页数据
     */
    getSelectedSonglists(cat = '全部', limit = 20, before) {
        console.log(`${selectedSonglists}?cat=${cat}&limit=${limit}`);

        const params = {
            cat,
            limit,
            before
        }
        return axios.get(selectedSonglists, params)
    },
    /**
     * 获取歌单分类,包含 category 信息
     */
    getHotSonglistCategory() {
        return axios.get(hotSonglistCategory)
    },
    /**
     * 获取歌单详情
     * @param {string}} id 歌单的id
     */
    getSonglistDetail(id) {
        console.log(`${songlistDetail}?id=${id}`);
        return axios.get(`${songlistDetail}?id=${id}`)
    },
    /**
     * 获取歌曲详情(支持同时传入多个 id, 用,隔开), 歌曲封面现在需要通过专辑内容接口获取)
     * @param {string}} ids 
     */
    getSongDetail(ids) {
        console.log(`${songDetail}?id=${ids}`)
        return axios.get(`${songDetail}?id=${ids}`)
    },
    /**
     * 获取专辑(支持同时传入多个 id, 用,隔开), 歌曲封面现在需要通过专辑内容接口获取)
     * @param {string}} id
     */
    getAlbumContent(id) {
        console.log(`${albumContent}?id=${id}`)
        return axios.get(`${albumContent}?id=${id}`)
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