"use strict";
const common_vendor = require("../../common/vendor.js");
const util_api = require("../../util/api.js");
const util_request = require("../../util/request.js");
const _sfc_main = {
  data() {
    return {
      //用户全局信息
      userInfo: {},
      //页面传参
      globalOption: {},
      //自定义全局变量
      globalData: {},
      tabsDatas: [
        { text: `发现`, icon: `diy-icon-discover` },
        { text: `使用说明`, icon: `diy-icon-wendang` }
      ],
      tabsLeft: 0,
      tabsWidth: 0,
      tabsItemWidth: 0,
      tabsIndex: 0,
      search: "",
      notice: "",
      shares: [],
      pageNo: 1,
      pageSize: 8,
      more: true
    };
  },
  onShow() {
    this.setCurrentPage(this);
    this.getShares(true);
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
  // 下拉刷新
  onPullDownRefresh() {
    this.getShares(true);
  },
  // 触底加载更多
  onReachBottom() {
    if (!this.more) {
      common_vendor.index.showToast({
        title: "已加载完毕",
        duration: 1e3
      });
      return false;
    }
    this.pageNo = this.pageNo + 1;
    common_vendor.index.showLoading({
      title: "加载中"
    });
    this.getShares();
    setTimeout(() => {
      common_vendor.index.hideLoading();
    }, 1e3);
  },
  methods: {
    async init() {
    },
    gotoDetail(id) {
      common_vendor.index.navigateTo({
        url: "/pages/shareDetails/shareDetails?id=" + id
      });
    },
    async getShares(init) {
      if (init) {
        this.pageNo = 1;
        this.more = true;
      }
      let res = await util_request.request(util_api.MY_EXCHANGE_URL, "GET", {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        token: common_vendor.index.getStorageSync("token")
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 2e3);
      if (init) {
        this.shares = res.data;
        common_vendor.index.stopPullDownRefresh();
      } else {
        this.shares = this.shares.concat(res.data);
      }
      if (res.data.length < this.pageSize && this.pageNo > 0) {
        this.more = false;
      }
    },
    changeTabs(evt) {
      let { index } = evt.currentTarget.dataset;
      if (index == this.tabsIndex)
        return;
      this.setData({
        tabsIndex: index
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.shares, (share, index, i0) => {
      return common_vendor.e({
        a: share.isOriginal
      }, share.isOriginal ? {} : {}, {
        b: share.cover,
        c: common_vendor.t(share.title),
        d: common_vendor.t(share.summary),
        e: common_vendor.t(share.price),
        f: common_vendor.o(($event) => $options.gotoDetail(share.id), index),
        g: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1e62b5f4"], ["__file", "D:/uniapp/uniapp-share-app/pages/myExchange/myExchange.vue"]]);
wx.createPage(MiniProgramPage);
