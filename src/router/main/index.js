const Profile = () => import('pages/main/profile')
const Find = () => import('pages/main/find')
const Community = () => import('pages/main/community')
const Videos = () => import('pages/main/videos')

export default [
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/find',
    component: Find
  },
  {
    path: '/community',
    component: Community
  },
  {
    path: '/videos',
    component: Videos
  },
]