import Vue from 'vue'
import Router from 'vue-router'

const Profile = () => import('pages/profile')
const Find = () => import('pages/find')
const Community = () => import('pages/community')
const Videos = () => import('pages/videos')

Vue.use(Router)

const routes = [
    {
        path: '/',
        redirect: '/find'
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/find',
        component: Find,
    },
    {
        path: '/community',
        component: Community,
    },
    {
        path: '/videos',
        component: Videos,
    },
]

export default new Router({
    mode: 'history',
    routes
})