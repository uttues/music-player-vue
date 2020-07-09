/**
 * 根据输入的 歌单数组，返回 带有标签 tag 的 歌单数组
 * @param {Array} songlists 需要根据标签过滤的数组
 * @param {sttring} tag 歌单的标签
 */
export const filterSonglistsByTag = (songlists, tag) => {
    return songlists.filter(item => item.tags.includes(tag))
}