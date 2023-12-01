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
    paste() {
      common_vendor.index.setClipboardData({
        data: this.share.downloadUrl,
        success: function() {
          common_vendor.index.showToast({
            title: "下载地址已复制"
          });
        }
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
  return common_vendor.e({
    a: common_vendor.t($data.share.title),
    b: common_vendor.p({
      labelPosition: "top"
    }),
    c: common_vendor.t($data.share.author),
    d: common_vendor.t($data.nickname),
    e: common_vendor.t($data.share.price),
    f: $data.share.isOriginal
  }, $data.share.isOriginal ? {} : {}, {
    g: $data.share.cover,
    h: common_vendor.t($data.share.downloadUrl),
    i: common_vendor.t($data.share.summary),
    j: common_vendor.o((...args) => $options.paste && $options.paste(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f8ad5e43"], ["__file", "D:/uniapp/uniapp-share-app/pages/shareDetails/shareDetails.vue"]]);
wx.createPage(MiniProgramPage);
