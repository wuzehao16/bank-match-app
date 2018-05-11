// import { stringify } from 'qs';
import request from '../lib/request';

export async function queryDetail(params) {
  return request(`http://ad.ibankmatch.com:8611/app/selectModelUserDetail?matchNo=${params}`);
}

export async function update(params) {
  return request('/sys/updateAds', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function add(params) {
  return request('http://ad.ibankmatch.com:8611/app/getMatchModeResult', {
    method: 'POST',
    body: {
      ...params,
      matchJson:JSON.stringify(params.matchJson)
    },
  });
}
