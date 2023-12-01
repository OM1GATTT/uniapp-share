"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      //用户全局信息
      userInfo: null,
      //页面传参
      globalOption: {},
      //自定义全局变量
      globalData: {}
    };
  },
  onShow() {
    this.setCurrentPage(this);
    if (common_vendor.index.getStorageSync("user")) {
      this.userInfo = common_vendor.index.getStorageSync("user");
    }
  },
  onLoad(option) {
    this.setCurrentPage(this);
    if (option) {
      this.setData({
        globalOption: this.getOption(option)
      });
    }
    this.init();
  },
  methods: {
    async init() {
    },
    logout() {
      this.userInfo = null;
      common_vendor.index.clearStorageSync();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.userInfo
  }, !$data.userInfo ? {
    b: common_vendor.o((...args) => _ctx.navigateTo && _ctx.navigateTo(...args))
  } : {
    c: $data.userInfo.avatarUrl,
    d: common_vendor.t($data.userInfo.nickname),
    e: common_vendor.t($data.userInfo.bonus),
    f: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  }, {
    g: $data.userInfo
  }, $data.userInfo ? common_vendor.e({
    h: common_vendor.o((...args) => _ctx.navigateTo && _ctx.navigateTo(...args)),
    i: common_vendor.o((...args) => _ctx.navigateTo && _ctx.navigateTo(...args)),
    j: common_vendor.o((...args) => _ctx.navigateTo && _ctx.navigateTo(...args)),
    k: $data.userInfo.roles == "admin"
  }, $data.userInfo.roles == "admin" ? {
    l: common_vendor.o((...args) => _ctx.navigateTo && _ctx.navigateTo(...args))
  } : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7c2ebfa5"], ["__file", "D:/uniapp/uniapp-share-app/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
