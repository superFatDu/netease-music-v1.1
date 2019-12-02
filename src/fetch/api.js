import { ajaxRequest } from './axios.config';

const LOG_IN = {
  login: param => ajaxRequest('post', '/api/login/cellphone', 1, param),
  loginStatus: param => ajaxRequest('post', '/api/', 1, param)
}
const SWIPPER_BANNER = {
  getBanner: param => ajaxRequest('post', '/api/banner', 1, param)
}
const FIND_SOURCE = {
  getRecommendList: param => ajaxRequest('post', '/api//personalized', 1, param)
}
const MY_SOURCE = {
  getMyList: param => ajaxRequest('post', '/api/user/playlist', 1, param)
}
const USER_INFO = {
  logout: param => ajaxRequest('post', '/api/logout', 1, param),
  getUserDetail: param => ajaxRequest('post', '/api/user/detail', 1, param),
  signIn: param => ajaxRequest('post', '/api/daily_signin', 1, param)
}
const SEARCH = {
  getSearchDefault: param => ajaxRequest('post', '/api/search/default', 1, param),
  getHotList: param => ajaxRequest('post', '/api/search/hot/detail', 1, param)
}
export {
  LOG_IN,
  SWIPPER_BANNER,
  FIND_SOURCE,
  MY_SOURCE,
  USER_INFO,
  SEARCH
}