// import { stringify } from 'qs';
import request from '../lib/request';

// export async function query(params) {
//   return request(`/sys/selectModelList?${stringify(params)}`);
// }
export async function queryDetail(params) {
  return request(`https://api.ibankmatch.com:8620/app/selectModelUserDetail?matchNo=${params}`);
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
  return request('https://api.ibankmatch.com:8620/app/getMatchModeResult', {
   // return request('http://192.168.2.100:8611/app/getMatchModeResult', {
    method: 'POST',
    body: {
      ...params,
      matchJson:JSON.stringify(params.matchJson)
    },
  });
}
