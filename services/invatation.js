import qs from 'qs';
import request from '../lib/request';
export async function getCaptcha(params) {
  return request(`/app/getCheckCode?${qs.stringify(params)}`);
}

export async function register(params) {
  return request(`/app/regist`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
