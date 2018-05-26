const mock = require('./mock/mock');
const {ok, insertResume, selectByType, getUserInfo, getResumeDetail, getResumeList, getWorkExperienceList,getWorkExperienceDetail,getEducationDetail,getEducationList, getExpectJobDetail,uploadImage} = mock
module.exports = {
  init(router) {
    router.get('/app/getUserInfo', async ctx => {
      ctx.body = getUserInfo;
    })
    router.get('/app/getResumeDetail', async ctx => {
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

  }
};
