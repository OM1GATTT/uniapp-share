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
      inputFocus: false,
      phone: "13951905171",
      input1Focus: false,
      password: "123123"
    };
  },
  computed: {
    disabled() {
      if (this.phone === "" || this.password === "") {
        return true;
      }
      return false;
    }
  },
  onShow() {
    this.setCurrentPage(this);
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
    // initResetform(){
    // 	this.initform = JSON.stringify(this.form);
    // },
    // resetForm(){
    // 	this.form = JSON.parse(this.initform);
    // }
    async login() {
      const loginDTO = {
        phone: this.phone,
        password: this.password
      };
      const res = await util_request.request(util_api.LOGIN_URL, "POST", loginDTO);
      console.log(res);
      if (res.success === true) {
        common_vendor.index.showToast({
          title: "登录成功"
        });
        console.log(JSON.stringify(res.data.user) + "$$$$$$");
        common_vendor.index.setStorageSync("user", res.data.user);
        common_vendor.index.setStorageSync("token", res.data.token);
        common_vendor.index.switchTab({
          url: "/pages/mine/mine"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  (_easycom_u_input2 + _easycom_u_form_item2)();
}
const _easycom_u_input = () => "../../uni_modules/diy-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/diy-uview-ui/components/u-form-item/u-form-item.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_form_item)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.phone = $event),
    b: common_vendor.p({
      focus: $data.inputFocus,
      placeholder: "清输入手机号",
      type: "text",
      modelValue: $data.phone
    }),
    c: common_vendor.p({
      label: "手机号",
      prop: "input"
    }),
    d: common_vendor.o(($event) => $data.password = $event),
    e: common_vendor.p({
      focus: $data.input1Focus,
      placeholder: "清输入密码",
      type: "text",
      modelValue: $data.password
    }),
    f: common_vendor.p({
      label: "密码",
      prop: "input1"
    }),
    g: common_vendor.o((...args) => $options.login && $options.login(...args)),
    h: $options.disabled
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"], ["__file", "D:/uniapp/uniapp-share-app/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
