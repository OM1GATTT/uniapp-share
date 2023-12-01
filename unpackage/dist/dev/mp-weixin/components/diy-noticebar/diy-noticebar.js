"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "diy-noticebar",
  props: {
    // 是否显示左侧的图片
    leftImg: {
      type: String,
      default: ""
    },
    // 是否显示左侧的图标
    leftIcon: {
      type: String,
      default: ""
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: true
    },
    // 文字颜色，各图标也会使用文字颜色
    color: {
      type: String,
      default: ""
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: ""
    },
    // 是否显示
    show: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean,
      default: false
    },
    // 滚动一个周期的时间长，单位ms
    duration: {
      type: [Number, String],
      default: 2e3
    },
    interval: {
      type: [Number, String],
      default: 2e3
    },
    // 字体大小，单位rpx
    fontSize: {
      type: [Number, String],
      default: 28
    },
    // 水平滚动时的滚动速度，即每秒滚动多少rpx，这有利于控制文字无论多少时，都能有一个恒定的速度
    speed: {
      type: [Number, String],
      default: 160
    },
    // 播放状态，play-播放，paused-暂停
    playState: {
      type: String,
      default: "play"
    },
    // 通知的边距
    padding: {
      type: [Number, String],
      default: "18rpx 24rpx"
    },
    remote: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      elClass: this.$tools.guid(),
      textWidth: 0,
      // 滚动的文字宽度
      boxWidth: 0,
      // 供文字滚动的父盒子的宽度，和前者一起为了计算滚动速度
      animationDuration: "10s",
      // 动画执行时间
      animationPlayState: "paused",
      // 动画的开始和结束执行
      showText: ""
      // 显示的文本
    };
  },
  watch: {
    playState(val) {
      if (val == "play")
        this.animationPlayState = "running";
      else
        this.animationPlayState = "paused";
    },
    speed(val) {
      if (!this.remote) {
        this.initSize();
      }
    },
    list(val) {
      setTimeout(() => this.initSize(), 10);
    }
  },
  computed: {
    // 计算字体颜色，如果没有自定义的，就用uview主题颜色
    computeColor() {
      if (this.color)
        return this.color;
      else if (this.type == "none")
        return "#606266";
      else
        return this.type;
    },
    // 文字内容的样式
    textStyle() {
      let style = {};
      if (this.color)
        style.color = this.color;
      else if (this.type == "none")
        style.color = "#606266";
      style.fontSize = this.fontSize + "rpx";
      return style;
    },
    // 计算背景颜色
    computeBgColor() {
      if (this.bgColor)
        return this.bgColor;
      else if (this.type == "none")
        return "transparent";
    }
  },
  mounted() {
    if (!this.remote) {
      this.$nextTick(() => {
        this.initSize();
      });
    }
  },
  methods: {
    initSize() {
      if (!this.vertical) {
        let query = [];
        let textQuery = new Promise((resolve, reject) => {
          common_vendor.index.createSelectorQuery().in(this).select("." + this.elClass).boundingClientRect().exec((ret) => {
            this.textWidth = ret[0].width;
            resolve();
          });
        });
        query.push(textQuery);
        Promise.all(query).then(() => {
          this.animationDuration = `${this.textWidth / common_vendor.index.upx2px(this.speed)}s`;
          this.animationPlayState = "paused";
          setTimeout(() => {
            if (this.playState == "play" && this.autoplay)
              this.animationPlayState = "running";
          }, 10);
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.leftImg
  }, $props.leftImg ? {
    b: $props.leftImg
  } : {}, {
    c: $props.leftIcon
  }, $props.leftIcon ? {
    d: common_vendor.n($props.leftIcon),
    e: $options.computeColor
  } : {}, {
    f: $props.vertical
  }, $props.vertical ? {} : {
    g: common_vendor.o((...args) => _ctx.click && _ctx.click(...args)),
    h: common_vendor.n($data.elClass),
    i: $data.animationDuration,
    j: $data.animationPlayState
  }, {
    k: common_vendor.s($options.textStyle),
    l: $options.computeBgColor,
    m: $props.padding
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/uniapp-share-app/components/diy-noticebar/diy-noticebar.vue"]]);
wx.createComponent(Component);
