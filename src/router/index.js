import Vue from 'vue'
import Router from 'vue-router'

import MainRoutes from './main'
import SonglistsRoutes from './songlists'

const Main = () => import('pages/main')
const Songlists = () => import('pages/songlists')
const SonglistDetail = () => import('pages/songlist-detail')
const DailyRecommend = () => import('pages/daily-recommend')
const RankingList = () => import('pages/ranking-list')
const BroadcastingStation = () => import('pages/broadcasting-station')


Vue.use(Router)

const routes = [
  // 主页面：路径中不包含main，直接到其子路径(默认进入"发现页")
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: '/find',
    children: [
      // 路由：我的、发现、云村、视频
      ...MainRoutes
    ]
  },
  // 每日推荐页面
  {
    path: 'dailyRecommend',
    name: 'dailyRecommend',
    component: DailyRecommend
  },
  // 歌单广场页面：路径中包含songlists，并且(默认进入"推荐歌单") /songlists/recommend
  // // 这里的子路由children路径中不需要添加斜杠（record3）
  // // redirect表示从路径 /songlists => /songlists/recommend (需要加上前面那段)
  {
    path: '/songlists',
    name: 'songlists',
    component: Songlists,
    redirect: '/songlists/recommend',
    children: [
      ...SonglistsRoutes
    ]
  },
  // 排行榜页面
  {
    path: '/rankingList',
    name: 'rankingList',
    component: RankingList,
  },
  // 电台页面
  {
    path: '/broadcastingStation',
    name: 'broadcastingStation',
    component: BroadcastingStation,
  },
  // 歌单详情页面
  {
    path: '/songlistDetail',
    name: 'songlistDetail',
    component: SonglistDetail
  }
]

export default new Router({
  routes
})