const mock = require('./mock/mock');
const {ok, insertResume, selectByType, getUserInfo, getResumeDetail, getResumeList, getWorkExperienceList,getWorkExperienceDetail,getEducationDetail,getEducationList, getExpectJobDetail,uploadImage,getResumeAllDetail} = mock
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

    router.get('/app/selectByType', async ctx => {
      ctx.body = selectByType(ctx);
    })
    router.get('/app/updateExpectJob', async ctx => {
      ctx.body = ok;
    })
    router.get('/app/getExpectJobDetail', async ctx => {
      ctx.body = getExpectJobDetail;
    })
    router.post('/app/uploadImage', async ctx => {
      ctx.body = uploadImage;
    })
    router.post('/app/insertResume', async ctx => {
      ctx.body = insertResume;
    })

  }
};
