"use strict";
const common_vendor = require("./vendor.js");
var Login = {
  //微信登录
  weixin(thiz, dataset) {
    if (common_vendor.index.getUserProfile) {
      common_vendor.index.getUserProfile({
        lang: "zh_CN",
        desc: "用于登陆",
        success: function(wxInfo) {
          common_vendor.index.login({
            provider: "weixin",
            success: function(res) {
              let data = {
                code: res.code,
                type: dataset.logintype,
                userInfo: JSON.stringify(wxInfo.userInfo)
              };
              thiz.$http.post(dataset.loginurl, data).then((res2) => {
                if (res2.code == 200) {
                  thiz.setData({
                    userInfo: res2.data
                  });
                  thiz.$session.setUser(res2.data);
                }
                if (thiz[dataset.callback]) {
                  thiz[dataset.callback](res2);
                } else if (thiz[dataset.callback + "Function"]) {
                  thiz[dataset.callback + "Function"](res2);
                } else if (thiz[dataset.callback + "Api"]) {
                  thiz[dataset.callback + "Api"](res2);
                }
              });
            },
            fail: function() {
              common_vendor.wx$1.showModal({
                title: "获取用户信息",
                content: "请允许授权以便为您提供给服务",
                success: function(res) {
                  if (res.confirm) {
                    thiz.navigateTo(dataset);
                  }
                }
              });
            }
          });
        },
        fail: function(res) {
          common_vendor.wx$1.showModal({
            title: "友情提示",
            content: "已拒绝小程序获取信息",
            showCancel: false
          });
        }
      });
    } else {
      common_vendor.index.showToast({
        title: "登录失败，请在小程序上登录",
        icon: "none"
      });
    }
  }
};
exports.Login = Login;
