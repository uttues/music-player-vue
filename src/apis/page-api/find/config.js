import base from 'apis/base'

const baseURL = base.neteaseCloudDev

export const bannerSwiperList = baseURL + '/banner' // banner( 轮播图 ) 数据

export const selectedSonglists = baseURL + '/top/playlist' // 网友精选碟歌单(icons下面一个module) => 推荐歌单，歌单广场

// 根据热门歌单分类给'网友精选碟歌单'随机添加类别参数，将请求的歌单列表随机展示
// 根据歌单详情获取歌曲信息
// 根据歌曲信息获取专辑信息，从专辑中获取歌曲封面
export const hotSonglistCategory = baseURL + '/playlist/hot' // 歌单分类,包含 category 信息
export const songlistDetail = baseURL + '/playlist/detail' // 歌单详情(参数id)
export const songDetail = baseURL + '/song/detail' // 歌单详情(参数ids)
export const albumContent = baseURL + '/album' // 专辑内容(参数id)


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

