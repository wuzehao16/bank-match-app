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
export async function uploadImage(formData) {
  return request(`/app/uploadImage`, {
    method: 'POST',
    body: formData
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

//搜索工作列表
export async function getJobList(params) {
  return request(`/app/getJobList`, {
    method: 'GET',
    body: {
      ...params,
    },
  });
}

// 发布公司职位
export async function insertJob(params) {
  return request(`/app/insertJob`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 修改公司职位
export async function updateJob(params) {
  return request(`/app/updateJob`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

//新增公司信息
export async function insertCompany(params) {
  return request(`/app/insertCompany`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//修改公司信息
export async function updateCompany(params) {
  return request(`/app/updateCompany`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

//删除发布职位
export async function deleteJob(params) {
  return request(`/app/deleteJob`, {
    method: 'DELETE',
    body: {
      ...params,
    },
  });
}

// 筛选人才列表
export async function getResumeList(params) {
  return request(`/app/getResumeList`, {
    method: 'GET',
    body: {
      ...params,
    },
  });
}