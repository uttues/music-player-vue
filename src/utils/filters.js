export default {
    /**
   * 对于播放量，需要省略并转化为计数单位（万、亿）再显示
   * @param {val} num
   * @return {string} 显示万、亿的字符串（小于万的只显示数字）
   */
    showCountingUnit: val => {
        var num = String(val)
        var res;
        // eg: 123456789 => 12 => 1.2 
        if (num.length > 8) {
            res = Math.round(Number(num.slice(0, -7)) / 10) + '亿'
        } else if (num.length > 4) {
            res = Math.round(Number(num.slice(0, -3)) / 10) + '万'
        } else {
            res = num
        }

        return res
    }
}