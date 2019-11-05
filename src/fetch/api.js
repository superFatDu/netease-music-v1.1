import { ajaxRequest } from './axios.config';

const LOG_IN = {
  login: param => ajaxRequest("post", "/api/login/cellphone", 1, param)
}

export {
  LOG_IN
}