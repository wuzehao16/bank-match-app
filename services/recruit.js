import request from '../lib/request';

//初始化时调用
export async function addBaseInformation(params) {
  return request(`/app/insertResume`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
//新增和编辑时候调用
export async function updateBaseInformation(params) {
  return request(`/app/updateResume`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
//新增编辑期望工作
export async function updateExpectedWork(params) {
  return request(`/app/updateExpectJob`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
