export const autoprefixer = function (style) {
    if (typeof style !== 'object') return style;
    const rules = ['transform', 'transition', 'animation'];
    const prefixes = ['ms-', 'webkit-'];
    rules.forEach(rule => {
        const value = style[rule];
        if (rule && value) {
            prefixes.forEach(prefix => {
                style[prefix + rule] = value;
            });
        }
    });
    return style;
};


/**
 * @param {Number} callback 需要经过节流处理的函数
 * @param {Number} delay 节流时长
 * @param {boolean} [hasTailing] 默认false，在节流最后是否多调用一次（被节流的函数在最后节流结束后重新调用）
 * 
 * @return {Function} 调用返回的函数即有节流效果
 */
export const throttle = function (callback, delay, hasTailing = false) {
    let timeoutID
    let previous = 0; // 该节流函数上一次被执行的时间戳（初始化为0，则第一次一定可以执行）

    return function () {
        let passedTime = new Date() - previous

        const exec = () => {
            previous = new Date()
            callback.call(this, ...arguments) // 相比于apply，call的性能会更好一些~
        }

        if (passedTime >= delay) {
            exec()
        } else {
            // 如果已经有timeoutID，表明已经有定时器准备处理“尾巴”了，无需重建
            if (hasTailing && !timeoutID) {
                timeoutID = setTimeout(() => {
                    exec()
                    timeoutID = undefined
                }, delay - passedTime)
            }
        }
    }
}


/**
 * @param {Number} callback 需要经过节流处理的函数
 * @param {Number} delay 节流时长
 * @param {boolean} [atBegin] 是否在首次调用时就执行该函数，默认为false
 *
 * @return {Function} 调用返回的函数即有节流效果
 */
export const debounce = function (callback, delay, atBegin = false) {
    let timeoutID = null

    return function () {

        if (atBegin) {
            if (!timeoutID) {
                callback.call(this, ...arguments)
            } else {
                clearTimeout(timeoutID)
            }
            timeoutID = setTimeout(function () {
                timeoutID = undefined
            }, delay)
        } else {
            if (timeoutID) {
                clearTimeout(timeoutID)
            }
            timeoutID = setTimeout(function () {
                callback.call(this, ...arguments)
                timeoutID = undefined
            }, delay)
        }
    }
}

