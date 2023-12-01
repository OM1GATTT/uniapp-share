"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      selectedOption: "PASS",
      dropdownOptions: [
        { value: "PASS", label: "PASS" },
        { value: "REJECT", label: "REJECT" }
      ]
    };
  }
};
if (!Array) {
  const _easycom_u_dropdown2 = common_vendor.resolveComponent("u-dropdown");
  _easycom_u_dropdown2();
}
const _easycom_u_dropdown = () => "../uni_modules/diy-uview-ui/components/u-dropdown/u-dropdown.js";
if (!Math) {
  _easycom_u_dropdown();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.selectedOption = $event),
    b: common_vendor.p({
      options: $data.dropdownOptions,
      modelValue: $data.selectedOption
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uniapp/uniapp-share-app/test/test.vue"]]);
wx.createPage(MiniProgramPage);
