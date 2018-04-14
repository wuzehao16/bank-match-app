// import { stringify } from 'qs';
import request from '../lib/request';

// export async function query(params) {
//   return request(`/sys/selectModelList?${stringify(params)}`);
// }

export async function update(params) {
  return request('/sys/updateAds', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function add(params) {
  // return request('http://47.106.70.82:8611/app/getMatchModeResult', {
   return request('http://192.168.2.100:8611/app/getMatchModeResult', {
    method: 'POST',
    body: {
      ...params,
      matchJson:JSON.stringify(params.matchJson)
    },
  });
}
