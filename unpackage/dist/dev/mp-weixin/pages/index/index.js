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
    this.getNotice();
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
    gotoExchange(id) {
      common_vendor.index.navigateTo({
        url: "/pages/exchange/exchange?id=" + id
      });
    },
    async getNotice() {
      let res = await util_request.request(util_api.LATEST_NOTICE_URL, "GET");
      console.log(res.data);
      this.notice = res.data.content;
    },
    async getShares(init) {
      if (init) {
        this.pageNo = 1;
        this.more = true;
      }
      let res = await util_request.request(util_api.SHARE_LIST_URL, "GET", {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 2e3);
      if (init) {
        this.shares = res.data;
        console.log(this.shares);
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
if (!Array) {
  const _easycom_diy_noticebar2 = common_vendor.resolveComponent("diy-noticebar");
  _easycom_diy_noticebar2();
}
const _easycom_diy_noticebar = () => "../../components/diy-noticebar/diy-noticebar.js";
if (!Math) {
  _easycom_diy_noticebar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.tabsDatas, (item, index, i0) => {
      return common_vendor.e({
        a: item.icon
      }, item.icon ? {
        b: common_vendor.n(item.icon)
      } : {}, {
        c: common_vendor.t(item.text),
        d: common_vendor.n(index == $data.tabsIndex ? " cur text-green " : ""),
        e: index,
        f: common_vendor.o((...args) => $options.changeTabs && $options.changeTabs(...args), index),
        g: index
      });
    }),
    b: $data.tabsIndex == 0
  }, $data.tabsIndex == 0 ? {
    c: common_vendor.t($data.notice),
    d: common_vendor.p({
      color: "#db5e54",
      bgColor: "#fff",
      leftIcon: "diy-icon-notification"
    }),
    e: $data.search,
    f: common_vendor.o(($event) => $data.search = $event.detail.value),
    g: common_vendor.f($data.shares, (share, index, i0) => {
      return common_vendor.e({
        a: share.isOriginal
      }, share.isOriginal ? {} : {}, {
        b: share.cover,
        c: common_vendor.t(share.title),
        d: common_vendor.t(share.summary),
        e: common_vendor.t(share.price),
        f: share.downloadUrl
      }, share.downloadUrl ? {
        g: common_vendor.o(($event) => $options.gotoDetail(share.id), index)
      } : {
        h: common_vendor.o(($event) => $options.gotoExchange(share.id), index)
      }, {
        i: index
      });
    })
  } : {}, {
    h: $data.tabsIndex == 1
  }, $data.tabsIndex == 1 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/uniapp/uniapp-share-app/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
