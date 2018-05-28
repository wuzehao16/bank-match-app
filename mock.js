const mock = require('./mock/mock');
const {ok, insertResume, selectByType, getUserInfo, getResumeDetail, getResumeList, getWorkExperienceList,getWorkExperienceDetail,getEducationDetail,getEducationList, getExpectJobDetail, getJobList, uploadImage,getResumeAllDetail} = mock
module.exports = {
  init(router) {
    //用户信息
    router.get('/app/getUserInfo', async ctx => {
      ctx.body = getUserInfo;
    })
    //简历大接口
    router.get('/app/getResumeAllDetail', async ctx => {
      ctx.body = getResumeAllDetail;
    })
    router.get('/app/getResumeDetail', async ctx => {
      ctx.body = ok;
    })
    //简历基本信息
    router.get('/app/updateResume', async ctx => {
      ctx.body = getResumeDetail;
    })
    //字典表
    router.get('/app/selectByType', async ctx => {
      ctx.body = selectByType(ctx);
    })
    //教育经历
    router.get('/app/getEducationList', async ctx => {
      ctx.body = getEducationList;
    })
    router.get('/app/getEducationDetail', async ctx => {
      ctx.body = getEducationDetail;
    })
    router.post('/app/insertEducation', async ctx => {
      ctx.body = ok;
    })
    router.put('/app/updateEducation', async ctx => {
      ctx.body = ok;
    })
    //工作经历
    router.post('/app/insertWorkExperience', async ctx => {
      ctx.body = ok;
    })
    router.put('/app/updateWorkExperience', async ctx => {
      ctx.body = ok;
    })
    router.get('/app/getWorkExperienceList', async ctx => {
      ctx.body = getWorkExperienceList;
    })
    router.get('/app/getWorkExperienceDetail', async ctx => {
      ctx.body = getWorkExperienceDetail;
    })
    //期望工作
    router.get('/app/updateExpectJob', async ctx => {
      ctx.body = ok;
    })
    router.get('/app/getExpectJobDetail', async ctx => {
      ctx.body = getExpectJobDetail;
    })
   //工作列表
    router.get('/app/getJobList', async ctx => {
      ctx.body = getJobList;
    })

    router.post('/app/uploadImage', async ctx => {
      ctx.body = uploadImage;
    })
    router.post('/app/insertResume', async ctx => {
      ctx.body = insertResume;
    })

  }
};
