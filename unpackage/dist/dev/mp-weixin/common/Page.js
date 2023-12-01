"use strict";
const common_vendor = require("./vendor.js");
const common_Validate = require("./Validate.js");
const common_Login = require("./Login.js");
const common_Pay = require("./Pay.js");
const Validate = (rules, messages) => new common_Validate.Validate(rules, messages);
function setData(dataset) {
  for (let field in dataset) {
    const regex = /([\w$]+)|\[(:\d)\]/g;
    const patten = field.match(regex);
    let result = this;
    for (let i = 0; i < patten.length - 1; i++) {
      const key = patten[i];
      result = result[key];
    }
    result[patten[patten.length - 1]] = dataset[field];
  }
}
var flagArr = [];
function navigateTo(e) {
  let dataset = e.currentTarget ? e.currentTarget.dataset : e;
  let { id, type } = dataset;
  let thiz = this;
  if (e.currentTarget) {
    if (!flagArr[type]) {
      flagArr[type] = true;
      setTimeout(() => {
        flagArr[type] = false;
      }, 500);
    } else {
      return;
    }
  }
  if (type == "openmodal") {
    thiz[id] = "show";
  } else if (type == "closemodal") {
    thiz[id] = "";
  } else if (type == "page" || type == "inner" || type == "href") {
    thiz.$tools.navigateTo(dataset.url, dataset);
  } else if (type == "submit") {
    showToast("将执行表单提交动作");
  } else if (type == "reset") {
    showToast("将执行表单重置动作");
  } else if (type == "tip") {
    showToast(dataset.tip);
  } else if (type == "confirm") {
    common_vendor.index.showModal({
      title: "提示",
      content: dataset.tip,
      showCancel: false
    });
  } else if (type == "daohang") {
    common_vendor.index.openLocation({
      latitude: Number(dataset.lat),
      longitude: Number(dataset.lng),
      address: dataset.address,
      success: function() {
        console.log("success");
      }
    });
  } else if (type == "phone") {
    thiz.$tools.makePhoneCall(e);
  } else if (type == "previewImage" || type == "preview") {
    common_vendor.index.previewImage({
      current: thiz.$tools.renderImage(dataset.img),
      // 当前显示图片的http链接
      urls: [thiz.$tools.renderImage(dataset.img)]
      // 需要预览的图片http链接列表
    });
  } else if (type == "copy") {
    common_vendor.index.setClipboardData({
      data: dataset.copy,
      showToast: false,
      success: function() {
        showToast(dataset.tip || "复制成功", "none");
      }
    });
  } else if (type == "xcx") {
    common_vendor.index.navigateToMiniProgram({
      appId: dataset.appid,
      path: dataset.path,
      success(res) {
      }
    });
  } else if (typeof thiz[type] == "function") {
    thiz[type](dataset);
  } else if (type == "login") {
    let logintType = dataset.logintype;
    if (common_Login.Login[logintType]) {
      common_Login.Login[logintType](thiz, dataset);
    } else {
      showToast(type + "登录有待实现");
    }
  } else if (type == "pay") {
    common_Pay.Pay.pay(dataset);
  } else {
    showToast(type + "类型有待实现");
  }
}
function showModal(message, title = "提示", iscancel = true) {
  return new Promise((resolve) => {
    common_vendor.index.showModal({
      title,
      content: message,
      showCancel: iscancel,
      success: function(res) {
        if (res.confirm) {
          resolve(true);
        } else if (res.cancel) {
          resolve(false);
        }
      }
    });
  });
}
function showToast(title, icon) {
  common_vendor.index.showToast({
    title,
    icon: icon ? icon : "none"
  });
}
function getPickerChildren(data, chindInex1, childIndex2) {
  if (chindInex1 != null && data[chindInex1] && data[chindInex1].children && data[chindInex1].children) {
    let children = data[chindInex1].children;
    if (childIndex2 == null) {
      if (children != null && children.length > 0) {
        return children.map((item) => item.label);
      } else {
        return [];
      }
    } else {
      if (children[childIndex2] == null) {
        return [];
      }
      let children2 = children[childIndex2].children;
      if (children2 != null && children2.length > 0) {
        return children2.map((item) => item.label);
      } else {
        return [];
      }
    }
  } else {
    return [];
  }
}
function getData(thiz, field) {
  const regex = /([\w$]+)|\[(:\d)\]/g;
  const patten = field.match(regex);
  let result = thiz;
  for (let i = 0; i < patten.length - 1; i++) {
    let key = patten[i];
    result = result[key];
  }
  return result[patten[patten.length - 1]];
}
function uploadImage(thiz, field, fieldData, uploadUrl, count = 9, type = "img") {
  return new Promise((resolve) => {
    if (!uploadUrl) {
      showToast("请配置上传地址");
      resolve();
      return;
    }
    common_vendor.index.chooseImage({
      count,
      sizeType: ["original", "compressed"],
      // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"],
      // 可以指定来源是相册还是相机，默认二者都有javascript:;
      success: function(res) {
        let tempFilePaths = res.tempFilePaths;
        for (let i = 0; i < tempFilePaths.length; i++) {
          common_vendor.index.uploadFile({
            url: thiz.$http.setUrl(uploadUrl),
            //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: "file",
            header: {
              Authorization: thiz.$session.getToken() || ""
            },
            success(res2) {
              let data = thiz.$tools.fromJson(res2.data);
              let url = "";
              if (data.url) {
                url = thiz.$tools.renderImage(data.url);
              }
              if (data.data && thiz.$tools.isObject(data.data) && data.data.url) {
                url = thiz.$tools.renderImage(data.data.url);
              }
              if (type == "avatar") {
                thiz.setData({
                  [field]: url
                });
              } else {
                let files = getData(thiz, fieldData).concat(url);
                thiz.setData({
                  [fieldData]: files,
                  [field]: (files || []).join(",").replace(/^[]/, "")
                });
              }
            },
            complete() {
              if (i == tempFilePaths.length - 1) {
                resolve();
              }
            }
          });
        }
      }
    });
  });
}
function setAuthorize(authorizeScope, modal, errortip = "获取当前设置异常") {
  return new Promise((resolve, reject) => {
    if (!modal) {
      modal = {
        title: "授权",
        content: "需要您设置授权已使用相应功能",
        confirmText: "设置"
      };
    }
    common_vendor.index.getSetting({
      success(res) {
        const hasAuthor = res.authSetting[authorizeScope];
        switch (hasAuthor) {
          case void 0:
            common_vendor.index.authorize({
              scope: authorizeScope,
              success: (res2) => {
                resolve(res2);
              },
              fail: (err) => {
                common_vendor.index.showToast({
                  title: "授权失败",
                  icon: "none",
                  duration: 3e3
                });
                reject(err);
              }
            });
            break;
          case true:
            resolve();
            break;
          case false:
            common_vendor.index.showModal({
              ...modal,
              success: (res2) => {
                if (res2.confirm) {
                  common_vendor.index.openSetting({
                    success: (res3) => {
                      if (res3.authSetting[authorizeScope]) {
                        resolve(res3);
                      } else {
                        reject(res3);
                        common_vendor.index.showToast({
                          title: "授权失败",
                          icon: "none",
                          duration: 3e3
                        });
                      }
                    },
                    fail: (err) => {
                      reject(err);
                      common_vendor.index.showToast({
                        title: "打开设置异常",
                        icon: "none",
                        duration: 3e3
                      });
                    }
                  });
                } else {
                  reject(res2);
                  common_vendor.index.showToast({
                    title: "授权失败",
                    icon: "none",
                    duration: 3e3
                  });
                }
              },
              fail: (err) => {
                reject(err);
                common_vendor.index.showToast({
                  title: "弹窗异常",
                  icon: "none",
                  duration: 3e3
                });
              }
            });
            break;
        }
      },
      fail: (err) => {
        reject(err);
        common_vendor.index.showToast({
          title: errortip,
          icon: "none",
          duration: 3e3
        });
      }
    });
  });
}
function getOption(option) {
  if (option !== null && typeof option === "object") {
    for (let key in option) {
      option[key] = decodeURIComponent(option[key]);
    }
  }
  return option;
}
function setCurrentPage(page) {
  if (this.$session.getUser()) {
    page.userInfo = this.$session.getUser();
  }
  if (this.$session.getValue("redirect_page")) {
    let value = this.$session.getValue("redirect_page");
    this.$session.setValue("redirect_page", null);
    this.$tools.navigateTo(value.url, value);
  }
  getApp().globalData.currentPage = page;
}
exports.Validate = Validate;
exports.getOption = getOption;
exports.getPickerChildren = getPickerChildren;
exports.navigateTo = navigateTo;
exports.setAuthorize = setAuthorize;
exports.setCurrentPage = setCurrentPage;
exports.setData = setData;
exports.showModal = showModal;
exports.showToast = showToast;
exports.uploadImage = uploadImage;
