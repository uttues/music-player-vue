import axios from 'apis/axios'

import {
    bannerSwiperList
} from './config'

export default {
    /**
     * 发现页面-首页轮播图（返回列表）
     */
    getBannerSwiperList() {
        return axios.get(bannerSwiperList)
    }
}