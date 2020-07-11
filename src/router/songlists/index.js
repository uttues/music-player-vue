const Ballad = () => import('pages/songlists/ballad')
const Chinese = () => import('pages/songlists/Chinese')
const LightMusic = () => import('pages/songlists/light-music')
const Official = () => import('pages/songlists/official')
const PopMusic = () => import('pages/songlists/pop-music')
const Quality = () => import('pages/songlists/quality')
const Recommend = () => import('pages/songlists/recommend')
const Rock = () => import('pages/songlists/rock')

export default [
  {
    path: 'ballad',
    component: Ballad
  },
  {
    path: 'Chinese',
    component: Chinese
  },
  {
    path: 'lightMusic',
    component: LightMusic
  },
  {
    path: 'official',
    component: Official
  },
  {
    path: 'popMusic',
    component: PopMusic
  },
  {
    path: 'quality',
    component: Quality
  },
  {
    path: 'recommend',
    component: Recommend
  },
  {
    path: 'rock',
    component: Rock
  },
]