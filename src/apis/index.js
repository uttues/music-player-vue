/**
 * api接口的统一出口，将各个页面的接口导入，统一导出
 * 目的：把api接口根据不同页面功能划分为多个模块，利于多人协作开发
 */

import profile from './page-api/find'
import find from './page-api/find'
import community from './page-api/find'
import videos from './page-api/find'

export default {
    profile,
    find,
    community,
    videos
}