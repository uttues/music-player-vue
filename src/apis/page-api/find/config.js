import base from 'apis/base'

const baseURL = base.neteaseCloudDev

export const bannerSwiperList = baseURL + '/banner' // banner( 轮播图 ) 数据

export const selectedSongLists = baseURL + '/top/playlist' // 网友精选碟歌单(icons下面一个module) => 推荐歌单，歌单广场

// 根据歌单分类给'网友精选碟歌单'随机添加类别参数，将请求的歌单列表随机展示
export const songListCategory = baseURL + '/playlist/catlist' // 歌单分类,包含 category 信息

export const newDish = baseURL + '/top/album' // 新碟上架列表
export const newSongs = baseURL + '/top/song' // 新歌速递




// export const dailyRecommendSongs = baseURL + '/recommend/songs' // 每日推荐歌曲（需要登录）
// export const dailyRecommendSongLists = baseURL + '/recommend/resource' // 每日推荐歌单（需要登录）【发现页展示的那六个】

// export const highquality = baseURL + '/top/playlist/highquality' // 精品歌单
// export const hot = baseURL + '/playlist/hot' // 热门歌单分类,包含 category 信息
// export const topList = baseURL + '/toplist/detail' // 所有榜单内容摘要
// export const idxList = baseURL + '/top/list' // 排行榜数据（传入榜单 id）
// export const albumDetail = baseURL + '/playlist/detail' // 获取歌单详情（传入歌单 id）

// export const DishInfo = baseURL + '/album' // 获取专辑内容（传入专辑 id）
// export const personalFm = baseURL + '/personal_fm' // 私人FM（需要登录）

