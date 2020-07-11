<template>
  <div class="swiper">
    <div
      class="swiper-container"
      :class="{ 'swiper-container-card': modeType === 'card' }"
      :style="{ height: height }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
    >
      <slot></slot>
    </div>
    <a
      class="swiper-arrow swiper-arrow-left"
      v-show="isArrowShow"
      @click="throttleHandleArrowBtnClick('left')"
    >
      <slot name="swiper-arrow-left-slot">
        <span class="swiper-arrow-inner">
          <i class="triangle-border"></i>
        </span>
      </slot>
    </a>
    <a
      class="swiper-arrow swiper-arrow-right"
      v-show="isArrowShow"
      @click="throttleHandleArrowBtnClick('right')"
    >
      <slot name="swiper-arrow-right-slot">
        <span class="swiper-arrow-inner">
          <i class="triangle-border"></i>
        </span>
      </slot>
    </a>
    <ul
      class="swiper-indicator-container"
      v-if="modeType!=='card' && showIndication"
    >
      <li
        class="swiper-indicator"
        :class="{'swiper-indicator-active': activeIndex === index}"
        v-for="(item, index) in items"
        :key="`swiper-indicator-${index}`"
        @click="handleIndicatorClick(index)"
        @mouseenter="handleIndicatorMouse(index)"
      >
      </li>
    </ul>
  </div>
</template>

<script>
import { throttle } from "../../utils";
import {
  addResizeListener,
  removeResizeListener
} from "../../utils/resize-event";

export default {
  name: "Swiper",
  props: {
    // height：绝对定位，宽度撑满，高度定制（如果不传入高度会塌陷）
    // interval：自动轮播间隔时长
    // slideDuration: 完整轮播（滑动）一次所花时间
    // initialIndex: 初始状态激活的幻灯片的索引，从 0 开始
    // showArrowType：可选值：always|never|hover(若选hover，移动端无mouse事件，不显示)
    // showIndication: 是否显示指示器
    // handleIndicationType: hover|clickonly（移动端在hover时不生效，仅点击）
    // dragRatioMinLimit：拖拽超过这个限度就会触发轮播
    // autoplay: 是否自动播放
    // loop: 是否循环播放
    height: {
      type: String,
      default: "300px",
      required: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    slideDuration: {
      type: Number,
      default: 500
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    showArrowType: {
      type: String,
      default: "always"
    },
    showIndication: {
      type: Boolean,
      default: true
    },
    handleIndicationType: {
      type: String,
      default: "clickonly"
    },
    dragRatioMinLimit: {
      type: Number,
      default: 0.25
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    modeType: {
      type: String,
      default: ""
    },
    edgeCardScale: {
      type: Number,
      default: 0.83
    }
  },
  data() {
    return {
      // items：SwiperItem列表（DOM元素列表，用于：组件通信，渲染指示器）
      // activeIndex：当前处于舞台（轮播图展示区）的swiper-item索引
      // timer：定时器

      // 自动滑动相关：
      // autoAnimDuration：一次自动滑动所需时间（初始值由props赋值，默认500）=> 修改这个数值来影响子组件SwiperItem
      //  ● 只有在拖拽相关时需要修改，其它情况均=默认传入的slideDuration
      //  ● touchMove时，autoAnimDuration=0
      //  ● touchEnd时，autoAnimDuration是小滑动所持续的事件，根据拖拽比例计算所得
      // isAutoSliding: 表明处于自动滑动状态：当触发的自动滑动正在进行时，拖拽无效

      // 拖拽事件：
      // startTouchX: touchStart时的横坐标
      // dragDistance: 最近一次拖拽终点到拖拽起点的水平距离，touchEnd时根据这个值去计算小滑动的距离

      items: [],
      activeIndex: -1,
      timer: null,

      autoAnimDuration: 0,
      isAutoSliding: false,

      startTouchX: 0,
      dragDistance: 0,

      isHover: false
    };
  },
  computed: {
    // v-show: isArrowShow，控制箭头按钮是否显示
    isArrowShow() {
      return (
        this.showArrowType !== "never" &&
        (this.showArrowType === "always" || this.isHover)
      );
    },
    dragRatio() {
      if (this.modeType === "card") {
        return Math.abs(this.dragDistance / (this.$el["offsetWidth"] / 4));
      } else {
        return Math.abs(this.dragDistance / this.$el["offsetWidth"]);
      }
    }
  },
  watch: {
    activeIndex(val, oldVal) {
      this.resetItemsPosition(oldVal);
      this.$emit("change", val, oldVal);
      // 如果要设置“是否循环播放”，只需要添加下面这一行if判断
      if (!this.loop) {
        if (val === this.items.length - 1) {
          this.pauseTimer();
        } else if (!this.timer) {
          this.startTimer();
        }
      }
    }
  },
  methods: {
    /**
     * 维护 isAutoSliding 状态，调用时即刻开启自动滑动状态，滑动时间后关闭
     *  ● 无需传参：直接用维护的autoAnimDuration
     *  ● 注意：先更新autoAnimDuration后才能触发滑动
     */
    setAutoSlideStatus() {
      this.isAutoSliding = true;
      setTimeout(() => {
        this.isAutoSliding = false;
      }, this.autoAnimDuration);
    },

    /**
     * 维护 autoAnimDuration 状态（拖拽+尾滑完成后恢复原值slideDuration）
     * @param value
     * @param isReset 是否需要延时重置，拖拽进行touchMove中不需要，但拖拽后引起的滑动需要重置为duration（默认不需要）
     */
    setAutoAnimDuration(value, isReset = false) {
      const oldValue = this.autoAnimDuration;
      this.autoAnimDuration = value;
      if (isReset) {
        setTimeout(() => {
          this.autoAnimDuration = this.slideDuration;
        }, oldValue);
      }
    },

    /**
     * 轮播轨道滑动，本质上调用setActiveItem修改值（自动 开启滑动保护，setAutoSlideStatus）
     *  ● 适用情况：定时器轮播、按钮切换、指示器切换、拖拽引起的小滑动
     *  ● 注意事项：调用之前需确定自动滑动时间，autoAnimDuration
     * @param offset 正值表示：展示列表后第n张，负值表示：展示列表前第n张
     * @param isTimerSlide 是否是定时器控制，如果（按钮切换、指示器切换、拖拽引起的小滑动），需要传入false
     */
    playSlide(offset, isTimerSlide) {
      this.setAutoSlideStatus();
      this.setActiveItem(this.activeIndex + offset);
      // 如果是定时器轮播的，不需要执行下面这个，否则即使有定时器，也会因为执行playSlide进行不必要的关闭重启
      if (!isTimerSlide) {
        this.delayRestartTimer(this.autoAnimDuration);
      }
    },

    /**
     * 开启定时器
     */
    startTimer() {
      if (this.interval <= 0 || this.timer) return;

      // 如果要设置“是否自动播放”，只需要添加下面这一行if判断
      if (this.autoplay) {
        this.timer = setInterval(this.playSlide, this.interval, 1, true);
      }
    },

    /**
     * 关闭定时器
     */
    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    /**
     * 非自然滑动（按钮、指示器、拖拽小滑动）需要重启定时器，多数情况interval就是this.autoAnimDuration
     */
    delayRestartTimer(interval) {
      this.pauseTimer();
      setTimeout(this.startTimer, interval);
    },

    /**
     * 根据子组件的name属性，更新 swiper-item 组件列表items
     */
    updateItems() {
      this.items = this.$children.filter(
        child => child.$options.name === "SwiperItem"
      );
    },
    /**
     * 调用每个swiper-item组件的 slideTranslateItem，触发元素移动
     * （负责定时器、按钮类型的轮播）
     */
    resetItemsPosition(oldIndex) {
      if (this.modeType === "card") {
        this.items.forEach((item, index) => {
          item.slideTranslateCardItem(index, this.activeIndex, oldIndex);
        });
      } else {
        this.items.forEach((item, index) => {
          item.slideTranslateItem(index, this.activeIndex, oldIndex);
        });
      }
    },

    /**
     * 修改this.activeIndex的值，对边界做了处理
     */
    setActiveItem(index) {
      const oldIndex = this.activeIndex;

      if (index < 0) {
        this.activeIndex = this.items.length - 1;
      } else if (index > this.items.length - 1) {
        this.activeIndex = 0;
      } else {
        this.activeIndex = index;
      }

      // 如果index===activeIndex，不会触发watch
      if (this.activeIndex === oldIndex) {
        this.resetItemsPosition(oldIndex);
      }
    },

    /**
     * 箭头按钮滑动
     * @param {string} type 类型值：left、right
     */
    handleArrowBtnClick(type) {
      switch (type) {
        case "left":
          this.playSlide(-1, false);
          break;
        case "right":
          this.playSlide(1, false);
          break;
        default:
          return;
      }
    },

    /**
     * 指示器切换滑动：点击下标为index的 指示器
     */
    handleIndicatorClick(index) {
      if (this.handleIndicationType === "hover") return;
      this.playSlide(index - this.activeIndex, false);
    },
    /**
     * 指示器切换滑动：hover下标为index的 指示器 (分成两个函数的原因：防止hover下click触发两次)
     */
    handleIndicatorMouse(index) {
      this.playSlide(index - this.activeIndex, false);
    },

    /**
     * 一些统筹操作，通知子组件修改状态（isTouching）
     */
    handleTouchStart(event) {
      if (this.isAutoSliding) return;

      this.startTouchX = event.touches[0].pageX;

      // 让子组件跟随鼠标快速移动
      this.setAutoAnimDuration(0, false);

      this.pauseTimer();

      this.items.forEach((item, index) => {
        item.toucherStart(index, this.activeIndex);
      });
    },

    /**
     * 一些统筹操作，通知子组件跟随
     */
    handleTouchMove(event) {
      if (this.isAutoSliding) return;

      this.dragDistance = event.touches[0].pageX - this.startTouchX;

      this.items.forEach((item, index) => {
        item.toucherTranslateItem(index, this.activeIndex, this.dragDistance);
      });
    },

    /**
     * Touch结束时触发，需要处理的事情
     * 1、计算拖动的比例，判断是否需要引起轮播
     * 2、除了拖动比例为0之外，都需要引起一次 距离<width,时间<autoAnimDuration 的小滑动
     *    2.1、修改 autoAnimDuration 的值
     *    2.2、触发子组件计算位置（activeIndex变动触发||手动调用reset触发） => 用setActiveIndex
     *    2.3、定时器修改 autoAnimDuration 的值为原先组件外传入的值
     * 3、拖动结束后开启计时器
     */
    handleTouchEnd() {
      if (this.isAutoSliding) return;

      // dragRatio>0 会触发小滑动 => 设置滑动时间，开启滑动（内部自动设置滑动保护、定时器重置操作）
      if (this.dragRatio === 0) {
        this.delayRestartTimer(0);
        this.setAutoAnimDuration(this.slideDuration, false);
      } else if (this.dragRatio < this.dragRatioMinLimit) {
        this.setAutoAnimDuration(this.slideDuration * this.dragRatio, true);
        this.playSlide(0, false);
      } else {
        // 修改滑动时间、开启滑动playSlide的顺序不能错
        this.setAutoAnimDuration(
          this.slideDuration * (1 - this.dragRatio),
          true
        );
        if (this.dragDistance > 0) {
          this.playSlide(-1, false);
        } else {
          this.playSlide(1, false);
        }
      }
      this.dragDistance = 0;
      // 子组件修改自己的isTouching状态
      this.items.forEach(item => {
        item.toucherEnd();
      });
    }
  },
  created() {
    this.throttleHandleIndicatorMouse = throttle(
      this.handleIndicationType === "hover"
        ? this.handleIndicatorMouse
        : () => {},
      300,
      true
    );
    this.throttleHandleArrowBtnClick = throttle(
      this.handleArrowBtnClick,
      300,
      false
    );
  },
  mounted() {
    // mouted()，是在子组件都创建好了的时候吗？？？后端数据是否返回
    this.updateItems();
    this.$nextTick(() => {
      addResizeListener(this.$el, this.resetItemsPosition);
      // 让prop初始化data，而autoAnimDuration在后期会因为各种操作而修改
      //后端请求数据到达 => 更新items => 设置activeItem，触发一系列动作
      this.autoAnimDuration = this.slideDuration;
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.setActiveItem(this.initialIndex);
      }
      this.startTimer();
    });
  },
  beforeDestroy() {
    if (this.$el) removeResizeListener(this.$el, this.resetItemsPosition);
    this.pauseTimer();
  }
};
</script>


<style scoped>
.swiper {
  position: relative;
}
.swiper-container {
  position: relative;
  overflow: hidden;
}
.swiper-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  display: inline-block;
  cursor: pointer;
  z-index: 999;
}
.swiper-arrow-left {
  left: 2%;
}
.swiper-arrow-right {
  right: 2%;
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.swiper-indicator-container {
  position: absolute;
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
}
.swiper-indicator {
  display: inline-block;
  width: 7px;
  height: 7px;
  margin: 0 2px;
  border-radius: 50%;
  background-color: rgb(238, 238, 238, 0.3);
  cursor: pointer;
}
.swiper-indicator-active {
  background-color: #ff575e;
}

/* 箭头按钮slot中的默认样式 */
.swiper-arrow-inner {
  display: inline-block;
  padding: 4px 10px;
  background-color: rgb(51, 51, 51, 0.3);
  font-size: 0;
}
.triangle-border {
  display: inline-block;
  width: 8px;
  height: 8px;
  border: 1px solid rgb(0, 0, 0, 0.4);
  border-bottom: none;
  border-right: none;
}
.swiper-arrow-left .triangle-border {
  transform: rotate(-45deg);
  margin: 0 -2px 0 2px;
}
.swiper-arrow-right .triangle-border {
  transform: rotate(135deg);
  margin: 0 2px 0 -2px;
}
.swiper-arrow-inner:hover .triangle-border {
  border-color: #eee;
}

/* card */
.swiper-container.swiper-container-card {
  position: relative;
}
</style>
