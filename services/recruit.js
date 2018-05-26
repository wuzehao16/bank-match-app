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
//新增和编辑简历基本信息
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

//新增教育经历
export async function insertEducation(params) {
  return request(`/app/insertEducation`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//修改教育经历
export async function updateEducation(params) {
  return request(`/app/updateEducation`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

//新增工作经历
export async function insertWorkExperience(params) {
  return request(`/app/insertWorkExperience`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//修改工作经历
export async function updateWorkExperience(params) {
  return request(`/app/updateWorkExperience`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

