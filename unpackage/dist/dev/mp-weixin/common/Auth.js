"use strict";
const common_Session = require("./Session.js");
function authPermission(permission) {
  const role = common_Session.Session.getUser() && common_Session.Session.getUser().role;
  if (role && role == "admin") {
    return true;
  }
  const all_permission = "*:*:*";
  const permissions = common_Session.Session.getUser() && common_Session.Session.getUser().permissions;
  if (permissions && permissions.length > 0) {
    return permissions.some((v) => {
      return all_permission === v || v === permission;
    });
  } else {
    return false;
  }
}
function authRole(role) {
  const super_admin = "admin";
  const roles = common_Session.Session.getUser() && common_Session.Session.getUser().roles;
  if (roles && roles.length > 0) {
    return roles.some((v) => {
      return super_admin === v || v === role;
    });
  } else {
    return false;
  }
}
const Auth = {
  // 验证用户是否具备某权限
  auth(permission) {
    return authPermission(permission);
  },
  // 验证用户是否含有指定权限，只需包含其中一个
  authOr(permissions) {
    return permissions.some((item) => {
      return authPermission(item);
    });
  },
  // 验证用户是否含有指定权限，必须全部拥有
  authAnd(permissions) {
    return permissions.every((item) => {
      return authPermission(item);
    });
  },
  // 验证用户是否具备某角色
  role(role) {
    return authRole(role);
  },
  // 验证用户是否含有指定角色，只需包含其中一个
  roleOr(roles) {
    return roles.some((item) => {
      return authRole(item);
    });
  },
  // 验证用户是否含有指定角色，必须全部拥有
  roleAnd(roles) {
    return roles.every((item) => {
      return authRole(item);
    });
  }
};
exports.Auth = Auth;
