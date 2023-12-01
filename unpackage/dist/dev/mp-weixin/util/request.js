"use strict";
const common_vendor = require("../common/vendor.js");
function request(url, method, data) {
  let token = "";
  if (common_vendor.index.getStorageSync("token") == "") {
    token = "no-token";
  } else {
    token = common_vendor.index.getStorageSync("token");
  }
  return new Promise(function(resolve, reject) {
    common_vendor.index.request({
      url,
      method,
      data,
      header: {
        "Content-type": "application/json",
        "token": token
      },
      success: function(res) {
        resolve(res.data);
      },
      fail: function(err) {
        common_vendor.index.showModal({
          title: "错误",
          content: "网络请求异常",
          showCancel: false
        });
        reject(err);
      }
    });
  });
}
exports.request = request;
