"use strict";
const common_vendor = require("../../common/vendor.js");
const util_api = require("../../util/api.js");
const util_request = require("../../util/request.js");
const _sfc_main = {
  data() {
    return {
      logs: [],
      pageNo: 1,
      pageSize: 15,
      more: true
    };
  },
  onShow() {
    this.setCurrentPage(this);
    this.getLogs(true);
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
  onPullDownRefresh() {
    this.getLogs(true);
  },
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
    this.getLogs();
    setTimeout(() => {
      common_vendor.index.hideLoading();
    }, 1e3);
  },
  methods: {
    async init() {
    },
    async getLogs(init) {
      if (init) {
        this.pageNo = 1;
        this.more = true;
      }
      let res = await util_request.request(util_api.POINT_DETAILS_URL, "GET", {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        token: common_vendor.index.getStorageSync("token")
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 2e3);
      if (init) {
        this.logs = res.data;
        console.log(this.logs);
        common_vendor.index.stopPullDownRefresh();
      } else {
        this.logs = this.logs.concat(res.data);
      }
      if (res.data.length < this.pageSize && this.pageNo > 0) {
        this.more = false;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.logs, (log, index, i0) => {
      return common_vendor.e({
        a: log.event === "CONTRIBUTE"
      }, log.event === "CONTRIBUTE" ? {
        b: common_vendor.t(log.createTime),
        c: common_vendor.t(log.description),
        d: common_vendor.t(log.value)
      } : {
        e: common_vendor.t(log.createTime),
        f: common_vendor.t(log.description),
        g: common_vendor.t(log.value)
      }, {
        h: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f3d02fe1"], ["__file", "D:/uniapp/uniapp-share-app/pages/pointsDetail/pointsDetail.vue"]]);
wx.createPage(MiniProgramPage);
