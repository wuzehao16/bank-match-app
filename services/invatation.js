import request from '../lib/request';
import qs from 'qs';
export async function getCaptcha(params) {
  return request(`http://ad.ibankmatch.com:8611/app/getCheckCode?${qs.stringify(params)}`);
}

export async function register(params) {
  return request('http://ad.ibankmatch.com:8611/app/regist', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
