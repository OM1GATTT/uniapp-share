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
      input: "",
      input1Focus: false,
      input1: "",
      input2Focus: false,
      input2: "",
      input3Focus: false,
      input3: "",
      input4Focus: false,
      input4: "",
      title: "技术干货",
      author: "yy",
      isOriginal: 1,
      price: 10,
      summary: "很棒的干货",
      cover: "https://img3.sycdn.imooc.com/5c3eaa0a08d7052706000338-360-202.jpg",
      downloadUrl: "https://pan.baidu.com"
    };
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
    async submit() {
      common_vendor.index.showLoading({
        title: "投稿中"
      });
      let res = await util_request.request(util_api.CONTRIBUTE_URL, "POST", {
        isOriginal: this.isOriginal == 1 ? true : false,
        title: this.title,
        author: this.author,
        price: this.price,
        cover: this.cover,
        summary: this.summary,
        downloadUrl: this.downloadUrl
      });
      console.log(res);
      if (res === "1") {
        setTimeout(() => {
          common_vendor.index.hideLoading();
        }, 200);
        common_vendor.index.showModal({
          title: "提示",
          content: "投稿成功，将在最短时间内审核资源",
          cancelText: "返回首页",
          confirmText: "继续投稿",
          success(res2) {
            if (res2.confirm) {
              this.isOriginal = false;
              this.title = "";
              this.author = "";
              this.price = "";
              this.summary = "";
              this.downloadUrl = "";
            } else {
              common_vendor.index.switchTab({
                url: "/pages/index/index"
              });
            }
          }
        });
      }
    },
    async init() {
    },
    changeCheckbox(evt) {
    },
    changeCheckbox1(evt) {
    }
  }
};
if (!Array) {
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  (_easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u_form_item2 + _easycom_u_input2)();
}
const _easycom_u_radio = () => "../../uni_modules/diy-uview-ui/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../../uni_modules/diy-uview-ui/components/u-radio-group/u-radio-group.js";
const _easycom_u_form_item = () => "../../uni_modules/diy-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_input = () => "../../uni_modules/diy-uview-ui/components/u-input/u-input.js";
if (!Math) {
  (_easycom_u_radio + _easycom_u_radio_group + _easycom_u_form_item + _easycom_u_input)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      shape: "circle",
      name: "1"
    }),
    b: common_vendor.o(_ctx.changeRadio),
    c: common_vendor.o(($event) => $data.isOriginal = $event),
    d: common_vendor.p({
      wrapClass: " justify-between",
      activeColor: "#0081ff",
      modelValue: $data.isOriginal
    }),
    e: common_vendor.p({
      labelClass: "text-blue",
      labelPosition: "top",
      prop: "radio"
    }),
    f: common_vendor.p({
      shape: "circle",
      name: "0"
    }),
    g: common_vendor.o(_ctx.changeRadio),
    h: common_vendor.o(($event) => $data.isOriginal = $event),
    i: common_vendor.p({
      wrapClass: " justify-between",
      activeColor: "#0081ff",
      modelValue: $data.isOriginal
    }),
    j: common_vendor.p({
      labelClass: "text-blue",
      labelPosition: "top",
      prop: "radio"
    }),
    k: common_vendor.o(($event) => $data.title = $event),
    l: common_vendor.p({
      focus: $data.inputFocus,
      placeholder: "请输入标题",
      type: "text",
      modelValue: $data.title
    }),
    m: common_vendor.p({
      labelPosition: "top",
      prop: "input"
    }),
    n: common_vendor.o(($event) => $data.price = $event),
    o: common_vendor.p({
      focus: $data.input1Focus,
      placeholder: "请输入价格",
      type: "text",
      modelValue: $data.price
    }),
    p: common_vendor.p({
      labelPosition: "top",
      prop: "input1"
    }),
    q: common_vendor.o(($event) => $data.summary = $event),
    r: common_vendor.p({
      focus: $data.input2Focus,
      placeholder: "介绍一下技术干货",
      type: "text",
      modelValue: $data.summary
    }),
    s: common_vendor.p({
      labelPosition: "top",
      prop: "input2"
    }),
    t: common_vendor.o(($event) => $data.cover = $event),
    v: common_vendor.p({
      focus: $data.input3Focus,
      placeholder: "请输入图片链接",
      type: "text",
      modelValue: $data.cover
    }),
    w: common_vendor.p({
      labelPosition: "top",
      prop: "input3"
    }),
    x: common_vendor.o(($event) => $data.downloadUrl = $event),
    y: common_vendor.p({
      focus: $data.input4Focus,
      placeholder: "请填写下载地址",
      type: "text",
      modelValue: $data.downloadUrl
    }),
    z: common_vendor.p({
      labelPosition: "top",
      prop: "input4"
    }),
    A: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-43f66588"], ["__file", "D:/uniapp/uniapp-share-app/pages/contribute/contribute.vue"]]);
wx.createPage(MiniProgramPage);
