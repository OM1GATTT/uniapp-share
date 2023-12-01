"use strict";
const common_vendor = require("../../common/vendor.js");
const util_api = require("../../util/api.js");
const util_request = require("../../util/request.js");
const _sfc_main = {
  data() {
    return {
      id: "",
      modal: "",
      dropdowns0: "PASS",
      dropdownsDatas0: [
        { text: "PASS", value: "PASS" },
        { text: "REJECT", value: "REJECT" }
      ],
      dropdowns10: "TRUE",
      dropdowns1Datas0: [
        { text: "TRUE", value: "TRUE" },
        { text: "FALSE", value: "FALSE" }
      ],
      reason: "审核通过",
      shares: [],
      pageNo: 1,
      pageSize: 8,
      more: true,
      drawer: false
    };
  },
  onShow() {
    this.setCurrentPage(this);
    this.getShares(true);
  },
  onLoad(option) {
    this.setCurrentPage(this);
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
    openMd(val) {
      this.modal = "show";
      this.id = val;
    },
    closeMd() {
      this.modal = "";
      this.id = "";
    },
    closeDropdowns() {
      this.$refs.refDropdowns.close();
    },
    changeDropdowns0(evt) {
      let item = this.dropdownsDatas0.find((item2) => {
        return item2.value == evt;
      });
      item && item.action && this.navigateTo(item.action);
      console.log(this.dropdowns0);
    },
    closeDropdowns1() {
      this.$refs.refDropdowns1.close();
    },
    changeDropdowns10(evt) {
      let item = this.dropdowns1Datas0.find((item2) => {
        return item2.value == evt;
      });
      item && item.action && this.navigateTo(item.action);
      console.log(this.dropdowns10);
    },
    async getShares(init) {
      if (init) {
        this.pageNo = 1;
        this.more = true;
      }
      let res = await util_request.request(util_api.EXAMINE_LIST_URL, "GET", {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        token: common_vendor.index.getStorageSync("token")
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
    async audit() {
      console.log(this.id);
      console.log(this.dropdowns0);
      console.log(this.dropdowns10);
      let res = await util_request.request(util_api.AUDIT_URL + `/${this.id}`, "POST", {
        auditStatusEnum: this.dropdowns0,
        reason: this.reason,
        showFlag: this.dropdowns10
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 2e3);
      if (res.success === true) {
        common_vendor.index.showToast({
          title: "审核成功"
        });
        this.closeMd();
        common_vendor.index.navigateBack({
          delta: 1,
          success: function() {
          }
        });
      }
      if (res.success === false) {
        common_vendor.index.showToast({
          title: "出现错误，请重新审核"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_u_dropdown_item2 = common_vendor.resolveComponent("u-dropdown-item");
  const _easycom_u_dropdown2 = common_vendor.resolveComponent("u-dropdown");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  (_easycom_u_dropdown_item2 + _easycom_u_dropdown2 + _easycom_u_input2 + _easycom_u_form_item2)();
}
const _easycom_u_dropdown_item = () => "../../uni_modules/diy-uview-ui/components/u-dropdown-item/u-dropdown-item.js";
const _easycom_u_dropdown = () => "../../uni_modules/diy-uview-ui/components/u-dropdown/u-dropdown.js";
const _easycom_u_input = () => "../../uni_modules/diy-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/diy-uview-ui/components/u-form-item/u-form-item.js";
if (!Math) {
  (_easycom_u_dropdown_item + _easycom_u_dropdown + _easycom_u_input + _easycom_u_form_item)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.shares, (share, index, i0) => {
      return common_vendor.e({
        a: share.cover,
        b: common_vendor.t(share.title),
        c: common_vendor.t(share.summary),
        d: share.auditStatus === "NOT_YET"
      }, share.auditStatus === "NOT_YET" ? {
        e: common_vendor.o(($event) => $options.openMd(share.id), index)
      } : {}, {
        f: index
      });
    }),
    b: common_vendor.o($options.changeDropdowns0),
    c: common_vendor.o(($event) => $data.dropdowns0 = $event),
    d: common_vendor.p({
      title: $data.dropdowns0,
      options: $data.dropdownsDatas0,
      modelValue: $data.dropdowns0
    }),
    e: common_vendor.sr("refDropdowns", "37ad19dd-0"),
    f: common_vendor.p({
      direction: "down"
    }),
    g: common_vendor.o($options.changeDropdowns10),
    h: common_vendor.o(($event) => $data.dropdowns10 = $event),
    i: common_vendor.p({
      title: $data.dropdowns10,
      options: $data.dropdowns1Datas0,
      modelValue: $data.dropdowns10
    }),
    j: common_vendor.sr("refDropdowns1", "37ad19dd-2"),
    k: common_vendor.p({
      direction: "down"
    }),
    l: common_vendor.o(($event) => $data.reason = $event),
    m: common_vendor.p({
      placeholder: "请输入原因",
      type: "text",
      modelValue: $data.reason
    }),
    n: common_vendor.p({
      borderBottom: false,
      labelPosition: "top",
      prop: "input"
    }),
    o: common_vendor.o(($event) => $options.closeMd()),
    p: common_vendor.o(($event) => $options.audit()),
    q: common_vendor.n($data.modal)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-37ad19dd"], ["__file", "D:/uniapp/uniapp-share-app/pages/examine/examine.vue"]]);
wx.createPage(MiniProgramPage);
