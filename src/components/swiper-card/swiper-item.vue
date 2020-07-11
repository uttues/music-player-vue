<template>
  <div
    v-show="ready"
    class="swiper-item"
    :class="{
      'swiper-item-card': modeType === 'card',
      'animating': isAnimating,
      'touching': isTouching,
      'on-edge-left': onEdgeLeft,
      'on-edge-right': onEdgeRight,
      'is-center': isCenter,
      'is-following': isFollowDrag,
		}"
    :style="itemStyle"
    @click="throttleHandleCardClick"
  >
    <slot></slot>
  </div>
</template>

<script>
import { autoprefixer, throttle } from "../../utils";
export default {
  name: "SwiperItem",
  data() {
    return {
      // translate: 移动距离，改变时触发生成新的样式（动态样式）
      // isAnimating: 动态样式
      // isTouching: 动态样式
      // beforeTouchX：touch事件触发前该元素的translate值
      translate: 0,
      isAnimating: false,
      isTouching: false,
      beforeTouchX: 0,

      // modeType：模式类型，值为card表示卡片式
      // edgeCardScale：两侧卡片scale的比例
      // onEdgeLeft：是否位于左侧
      // onEdgeRight：是否位于右侧
      // isCenter: 是否位于舞台中心
      modeType: "",
      edgeCardScale: 0,
      onEdgeLeft: false,
      onEdgeRight: false,
      isCenter: false,
      isFollowDrag: false,

      currentTranslateX: 0,
      targetTranslateX: 0,
      variousScale: 1,

      currentScale: 0,
      targetScale: 0,

      // ready：updateItems时会对item进行位置初始化，初始化完毕之后再进行显示
      ready: false
    };
  },
  computed: {
    /**
     * 一次轮播图片所用的时间，获取父组件中的autoAnimDuration，及时更新，默认500
     */
    autoAnimDuration() {
      return this.$parent.autoAnimDuration;
    },
    dragRatio() {
      return this.$parent.dragRatio;
    },
    itemsCount() {
      return this.$parent.items.length;
    },
    scale() {
      if (this.modeType === "card") {
        if (!this.isTouching) {
          return this.modeType === "card" && !this.isCenter
            ? this.edgeCardScale
            : 1;
        } else {
          if (this.isCenter) {
            let val = 1 - (1 - this.edgeCardScale) * this.dragRatio;
            return val >= this.edgeCardScale ? val : this.edgeCardScale;
          }
          if (this.isFollowDrag) {
            let val =
              (1 - this.edgeCardScale) * this.dragRatio + this.edgeCardScale;
            return val < 1 ? val : 1;
          }
          return this.edgeCardScale;
        }
      }
      return 1;
    },
    /**
     * translate的值发生改变就会自动执行，计算样式，返回一个style对象，动态样式
     */
    itemStyle() {
      const transitionValue =
        this.isAnimating || this.isTouching
          ? `transform ${this.autoAnimDuration / 1000}s ease-in-out `
          : `none`;
      // 103 是is-center，100是on-edge
      // 会缩小的这一层scale小到一定程度，就会被大的覆盖（102），一旦释放，因为是onEdge，所以还是需要比其他的层级高

      const scaleValue = this.isTouching ? this.variousScale : this.scale;

      const style = {
        transform: `translateX(${this.translate}px) scale(${scaleValue})`,
        transformOrigin: "left center",
        transition: transitionValue
      };
      // // 表明是完整滑动的情况（呕了） -- > 依然是有bug
      const parent = this.$parent;
      console.log(parent.autoAnimDuration);
      if (this.isAnimating) {
        // 设置的值奇、偶数用于调试
        const zIndexValue =
          this.scale > (1 - this.edgeCardScale) / 2 + this.edgeCardScale
            ? 108
            : this.isCenter
            ? 106
            : this.onEdgeLeft
            ? 104
            : 100;
        style["zIndex"] = zIndexValue;
      } else {
        const zIndexValue =
          this.variousScale > (1 - this.edgeCardScale) / 2 + this.edgeCardScale
            ? 107
            : this.targetScale === 1
            ? 105
            : this.targetScale !== this.currentScale
            ? 103
            : 101;
        style["zIndex"] = zIndexValue;
      }
      return autoprefixer(style);
    },
    /**
     * 父组件的宽度   offsetWidth = width + 左右padding + 左右boder
     */
    parentWidth() {
      return this.$parent.$el["offsetWidth"];
    }
  },
  created() {
    this.throttleHandleCardClick = throttle(this.handleCardClick, 1300, true);
    this.$parent && this.$parent.updateItems();
  },
  mounted() {
    this.modeType = this.$parent.modeType;
    this.edgeCardScale = this.$parent.edgeCardScale;
    if (this.$parent && this.$parent.$options.name === "Swiper") {
      this.$parent.updateItems();
    }
  },
  destroyed() {
    if (this.$parent && this.$parent.$options.name === "Swiper") {
      this.$parent.updateItems();
    }
  },
  methods: {
    /**
     * 返回当前元素处理后的index值，用于计算新的translate值
     */
    processIndex(index, activeIndex) {
      const length = this.itemsCount;
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        return length;
      }
      return index;
    },

    processCardIndex(index, activeIndex) {
      const length = this.itemsCount;
      // 当前是activeIndex是第一张，index是最后一张，返回-1，相差-1，表示二者相邻且index在左侧
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        // 当前页activeIndex是最后一张，index是第一张，返回length，相差1，表示二者相邻且index在右侧
        return length;
        // 如果，index在activeIndex前一页的前面，并且之间的间隔在一半页数即以上，则返回页数长度+1，这样它们会被置于最右侧
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
        // 如果，index在activeIndex后一页的后面，并且之间的间隔在一般页数即以上，则返回-2，这样它们会被置于最左侧
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }
      return index;
    },

    /**
     * 更新当前元素的transition，触发生成动态样式
     */
    updateTranslate(index, activeIndex) {
      return this.parentWidth * (index - activeIndex);
    },

    updateCardTranslate() {
      if (this.onEdgeLeft) return 0;
      if (this.isCenter) return this.parentWidth / 4;
      if (this.onEdgeRight)
        return this.parentWidth * (1 - 0.5 * this.edgeCardScale);
    },

    /**
     * 需要滑动时，由外层 swiper 调用slideTranslateItem，触发元素移动
     * @param index 当前swiper-item索引
     * @param activeIndex 轮播需要显示在正中间的swiper-item索引
     * @param oldIndex 过去的activeIndex
     * 所有元素都会重新计算自己的translate值，生成动态样式
     * (列表中只有两个元素需要移动，旧的activeIndex（左移移走），新的activeIndex（左移移入）？？？)
     */
    slideTranslateItem(index, activeIndex, oldIndex) {
      if (this.autoAnimDuration === this.$parent.slideDuration) {
        this.isFollowDrag = false;
      }
      // isAnimating 三种种情况
      //  ● 主角
      //  ● 处于两主角中间，并且不是 itemscount - 1 => 0
      //  ● 如果是拖拽，未引起滑动，oldIndex = activeIndex，但是它隔壁is-following元素也需要滑动(需要加上上面的if判断，以免影响其他滑动)
      this.isAnimating =
        this.isFollowDrag ||
        index === oldIndex ||
        index === activeIndex ||
        (((oldIndex < index && index < activeIndex) ||
          (activeIndex < index && index < oldIndex)) &&
          (oldIndex !== this.itemsCount - 1 || activeIndex !== 0) &&
          (oldIndex !== 0 || activeIndex !== this.itemsCount - 1));

      // 处理当前索引
      index = this.processIndex(index, activeIndex, this.itemsCount);

      // 计算当前元素的Translate并修改 => 触发新的style计算，动态样式
      this.translate = this.updateTranslate(index, activeIndex);
      this.ready = true;
    },

    slideTranslateCardItem(index, activeIndex) {
      // // 处理当前索引
      // index = this.processCardIndex(index, activeIndex);
      index = (index + 1) % 3;

      // isAnimating 表示有过渡动画的SwiperItem
      this.isAnimating =
        this.onEdgeLeft ||
        this.onEdgeRight ||
        this.isCenter ||
        Math.abs(index - activeIndex) <= 1;

      // 下边这两行主要是用于产生特定的样式，修改translate后触发生成动态样式
      this.onEdgeLeft = (activeIndex + 2) % 3 === index;
      this.onEdgeRight = (activeIndex + 4) % 3 === index;
      this.isCenter = index === activeIndex;
      this.translate = this.updateCardTranslate(index, activeIndex);

      this.ready = true;
    },

    /**
     *  处理元素下标，更新translate（实现元素拖拽跟随）
     */
    toucherTranslateItem(index, activeIndex, dragDistance) {
      // 如果不执行这一个processIndex，则不会实现循环播放
      // index = this.processIndex(index, activeIndex);
      index = (index + 1) % 3;
      let nextActiveIndex;

      // this
      if (dragDistance > 0) {
        nextActiveIndex = (activeIndex - 1 + 3) % 3;
      } else {
        nextActiveIndex = (activeIndex + 1) % 3;
      }

      this.onEdgeLeft = (nextActiveIndex - 1 + 3) % 3 === index;
      this.onEdgeRight = (nextActiveIndex + 1) % 3 === index;
      this.isCenter = index === nextActiveIndex;

      this.targetTranslateX = this.updateCardTranslate();
      this.targetScale = this.isCenter ? 1 : this.edgeCardScale;

      const dragRatio = dragDistance / this.parentWidth;
      if (dragDistance > 0) {
        this.translate =
          (this.targetTranslateX - this.currentTranslateX) * dragRatio +
          this.currentTranslateX;
        this.variousScale =
          (this.targetScale - this.currentScale) * dragRatio +
          this.currentScale;
      } else {
        this.translate =
          this.currentTranslateX -
          (this.targetTranslateX - this.currentTranslateX) * dragRatio;
        this.variousScale =
          this.currentScale -
          (this.targetScale - this.currentScale) * dragRatio;
      }
      if (index === 1) {
        console.log("this.targetScale", this.targetScale);
        console.log("this.currentScale", this.currentScale);
        console.log("this.dragRatio", this.dragRatio);
      }

      this.isFollowDrag =
        (dragDistance > 0 && index === activeIndex - 1) ||
        (dragDistance <= 0 && index === activeIndex + 1);
    },

    /**
     * 修改元素动态类（状态）
     */
    toucherStart(index, activeIndex) {
      this.isAnimating = false;
      this.currentTranslateX = this.updateCardTranslate(index, activeIndex);

      // 每一次touch触发，都先看看var是否正确
      // 当前传入的active是下一个activeIndex（在旋转式里面 activeIndex的值 指的是右边的那张图）
      this.currentScale =
        index === (activeIndex - 1 + 3) % 3 ? 1 : this.edgeCardScale;
      this.variousScale = this.currentScale;

      if (index === 1) {
        console.log("this.currentScale", this.currentScale);
      }

      if (this.modeType !== "card") {
        // 相邻的 Math.abs(index - activeIndex) <= 1 或者 同为列表边界
        this.isTouching =
          Math.abs(index - activeIndex) <= 1 ||
          (index === 0 && activeIndex === this.itemsCount - 1) ||
          (index === this.itemsCount - 1 && activeIndex === 0);
      } else {
        this.isTouching = Math.abs(index - activeIndex) <= 2;
        if (!this.isTouching) {
          if (activeIndex < 2) {
            // 公式推导？？ 两截拼一起，activeIndex的位置刚好在 itemsCount+activeIndex 上
            this.isTouching = this.itemsCount + activeIndex - index <= 2;
          }
          if (activeIndex >= this.itemsCount - 2) {
            this.isTouching = index - (activeIndex - this.itemsCount) <= 2;
          }
        }
      }
      this.beforeTouchX = this.translate;
    },

    /**
     * 修改元素动态类（状态），在父组件处理touchEnd时会重新开启计时器（轮播），所以这边无需处理isAnimating
     * 旋转轮播图新增，这里修改touching状态会影响z-index的判断，放到每次滑动结束
     */
    toucherEnd() {
      this.isTouching = false;
    },

    /**
     * 在card模式下点击切换
     */
    handleCardClick() {
      // const parent = this.$parent;
      // const index = parent.items.indexOf(this);
      // if (this.modeType === "card" && index !== parent.activeIndex) {
      //   parent.playSlide(index - parent.activeIndex, false);
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper-item {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.swiper-item.swiper-item-card {
  width: 50%;
}
.swiper-item.swiper-item-card {
  &.on-edge-left {
    z-index: 102;
  }
  &.on-edge-right {
    z-index: 101;
  }
  &.is-center {
    z-index: 103;
  }
}
</style>