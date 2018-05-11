// import { stringify } from 'qs';
import request from '../lib/request';

// export async function query(params) {
//   return request(`/sys/selectModelList?${stringify(params)}`);
// }
export async function queryDetail(params) {
  return request(`/app/selectModelUserDetail?matchNo=${params}`);
}

export async function add(params) {
  return request(`/app/getMatchModeResult`, {
    method: 'POST',
    body: {
      ...params,
      matchJson:JSON.stringify(params.matchJson)
    },
  });
}
