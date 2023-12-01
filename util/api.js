/********** 后端接口基础地址 **********/
export const BASE_API_URL = 'http://localhost:8000'
/********** 各服务基础地址 **********/
export const USER_URL = BASE_API_URL + '/user-service/user';
export const SHARE_URL = BASE_API_URL + '/content-service/share';

/********** 首页相关接口 **********/
// 分享列表
export const SHARE_LIST_URL = SHARE_URL + '/list';
// 最新公告
export const LATEST_NOTICE_URL = SHARE_URL+ '/notice';
// 兑换分享
export const EXCHANGE_URL = SHARE_URL + '/exchange';


/********** 投稿相关接口 **********/
// 投稿
export const CONTRIBUTE_URL = SHARE_URL + '/contribute';
// 我的投稿
export const MY_CONTRIBUTE_URL = SHARE_URL + '/my-contribute';
// 未审核列表
export const EXAMINE_LIST_URL = SHARE_URL + '/admin/list';
// 审核投稿
export const AUDIT_URL = SHARE_URL+ '/admin/audit';
/********** 我的相关接口 **********/
// 登录
export const LOGIN_URL = USER_URL+'/login';
// 我的兑换
export const MY_EXCHANGE_URL = SHARE_URL + '/exchange/list';
// 积分明细
export const POINT_DETAILS_URL = USER_URL + '/bonus/list';