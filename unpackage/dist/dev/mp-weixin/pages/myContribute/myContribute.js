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
    async getShares(init) {
      if (init) {
        this.pageNo = 1;
        this.more = true;
      }
      let res = await util_request.request(util_api.MY_CONTRIBUTE_URL, "GET", {
        pageNo: this.pageNo,
        pageSize: this.pageSize
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
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.shares, (share, index, i0) => {
      return common_vendor.e({
        a: share.cover,
        b: common_vendor.t(share.title),
        c: common_vendor.t(share.summary),
        d: share.auditStatus === "PASS"
      }, share.auditStatus === "PASS" ? {} : {}, {
        e: share.auditStatus === "NOT_YET"
      }, share.auditStatus === "NOT_YET" ? {} : {}, {
        f: share.auditStatus === "REJECT"
      }, share.auditStatus === "REJECT" ? {} : {}, {
        g: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-029c72cf"], ["__file", "D:/uniapp/uniapp-share-app/pages/myContribute/myContribute.vue"]]);
wx.createPage(MiniProgramPage);
