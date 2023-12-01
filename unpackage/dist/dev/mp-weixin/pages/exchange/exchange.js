"use strict";
const common_vendor = require("../../common/vendor.js");
const util_api = require("../../util/api.js");
const util_request = require("../../util/request.js");
const _sfc_main = {
  data() {
    return {
      share: {},
      nickname: "",
      avatarUrl: "",
      id: ""
    };
  },
  onShow() {
    this.setCurrentPage(this);
  },
  onLoad(option) {
    this.id = option.id;
    this.getShare();
  },
  methods: {
    async getShare() {
      let id = this.id;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let res = await util_request.request(util_api.SHARE_URL + `/${id}`, "GET");
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 500);
      console.log(res.data);
      this.share = res.data.share;
      this.nickname = res.data.nickname;
      this.avatarUrl = res.data.avatarUrl;
    },
    async exchange() {
      await util_request.request(util_api.EXCHANGE_URL, "POST", {
        userId: common_vendor.index.getStorageSync("user").id,
        shareId: this.share.id
      }).then((res) => {
        common_vendor.index.showModal({
          title: "兑换成功",
          content: "确定去查看，取消继续兑换",
          success: (res2) => {
            if (res2.confirm) {
              common_vendor.index.redirectTo({
                url: `/pages/shareDetails/shareDetails?id=${this.id}`
              });
            } else if (res2.cancel) {
              common_vendor.index.switchTab({
                url: "/pages/index/index"
              });
            }
          }
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  _easycom_u_form_item2();
}
const _easycom_u_form_item = () => "../../uni_modules/diy-uview-ui/components/u-form-item/u-form-item.js";
if (!Math) {
  _easycom_u_form_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.share.title),
    b: common_vendor.p({
      labelPosition: "top"
    }),
    c: common_vendor.t($data.share.author),
    d: common_vendor.t($data.nickname),
    e: common_vendor.t($data.share.buyCount),
    f: $data.share.cover,
    g: common_vendor.t($data.share.summary),
    h: common_vendor.t($data.share.price),
    i: common_vendor.o((...args) => $options.exchange && $options.exchange(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ea8424b3"], ["__file", "D:/uniapp/uniapp-share-app/pages/exchange/exchange.vue"]]);
wx.createPage(MiniProgramPage);
