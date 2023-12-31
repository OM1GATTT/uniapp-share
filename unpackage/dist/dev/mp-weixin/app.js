"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_Page = require("./common/Page.js");
const common_Tools = require("./common/Tools.js");
const common_HttpService = require("./common/HttpService.js");
const common_Session = require("./common/Session.js");
const uni_modules_diyUviewUi_index = require("./uni_modules/diy-uview-ui/index.js");
const common_Auth = require("./common/Auth.js");
require("./common/Validate.js");
require("./common/Login.js");
require("./common/Pay.js");
require("./siteinfo.js");
require("./common/ServiceBase.js");
require("./uni_modules/diy-uview-ui/libs/mixin/mixin.js");
require("./uni_modules/diy-uview-ui/libs/request/index.js");
require("./uni_modules/diy-uview-ui/libs/function/deepMerge.js");
require("./uni_modules/diy-uview-ui/libs/function/deepClone.js");
require("./uni_modules/diy-uview-ui/libs/function/test.js");
require("./uni_modules/diy-uview-ui/libs/function/queryParams.js");
require("./uni_modules/diy-uview-ui/libs/function/route.js");
require("./uni_modules/diy-uview-ui/libs/function/timeFormat.js");
require("./uni_modules/diy-uview-ui/libs/function/timeFrom.js");
require("./uni_modules/diy-uview-ui/libs/function/colorGradient.js");
require("./uni_modules/diy-uview-ui/libs/function/guid.js");
require("./uni_modules/diy-uview-ui/libs/function/color.js");
require("./uni_modules/diy-uview-ui/libs/function/type2icon.js");
require("./uni_modules/diy-uview-ui/libs/function/randomArray.js");
require("./uni_modules/diy-uview-ui/libs/function/addUnit.js");
require("./uni_modules/diy-uview-ui/libs/function/random.js");
require("./uni_modules/diy-uview-ui/libs/function/trim.js");
require("./uni_modules/diy-uview-ui/libs/function/addStyle.js");
require("./uni_modules/diy-uview-ui/libs/function/toast.js");
require("./uni_modules/diy-uview-ui/libs/function/getParent.js");
require("./uni_modules/diy-uview-ui/libs/function/_parent.js");
require("./uni_modules/diy-uview-ui/libs/function/sys.js");
require("./uni_modules/diy-uview-ui/libs/function/debounce.js");
require("./uni_modules/diy-uview-ui/libs/function/throttle.js");
require("./uni_modules/diy-uview-ui/libs/config/config.js");
require("./uni_modules/diy-uview-ui/libs/config/zIndex.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/contribute/contribute.js";
  "./pages/mine/mine.js";
  "./pages/login/login.js";
  "./pages/webview.js";
  "./pages/exchange/exchange.js";
  "./pages/myContribute/myContribute.js";
  "./pages/myExchange/myExchange.js";
  "./pages/pointsDetail/pointsDetail.js";
  "./pages/shareDetails/shareDetails.js";
  "./pages/examine/examine.js";
  "./test/test.js";
}
const _sfc_main = {
  globalData: {
    userInfo: null,
    tabBar: [],
    homePage: "/pages/index/index",
    pages: ["/pages/index/index", "/pages/contribute/contribute", "/pages/mine/mine", "/pages/login/login"]
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniapp/uniapp-share-app/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.config.globalProperties.$tools = new common_Tools.Tools();
  app.config.globalProperties.$http = new common_HttpService.Service();
  app.config.globalProperties.$session = common_Session.Session;
  app.config.globalProperties.$auth = common_Auth.Auth;
  common_vendor.index.getSystemInfo({
    success: function(e) {
      app.config.globalProperties.StatusBar = e.statusBarHeight;
      let custom = common_vendor.wx$1.getMenuButtonBoundingClientRect();
      app.config.globalProperties.Custom = custom;
      app.config.globalProperties.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
    }
  });
  app.mixin({
    methods: {
      setCurrentPage: common_Page.setCurrentPage,
      Validate: common_Page.Validate,
      setData: common_Page.setData,
      navigateTo: common_Page.navigateTo,
      showModal: common_Page.showModal,
      showToast: common_Page.showToast,
      getPickerChildren: common_Page.getPickerChildren,
      uploadImage: common_Page.uploadImage,
      getOption: common_Page.getOption,
      setAuthorize: common_Page.setAuthorize
    }
  });
  app.use(uni_modules_diyUviewUi_index.uView);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
