const ok = {
    "code": 0,
    "msg": "ok"
}
const insertResume = {
    "code": 0,
    "msg": "ok",
    "data":"2ebe0e2dae94433b89d8f50532c74829"
}
function selectByType(ctx) {
  const params = ctx.query.type;
  if (params == 'education') {
    return {
        "code": 0,
        "msg": "ok",
        "data": [
            {
                "name": "中专以下",
                "code": 1
            },
            {
                "name": "中专",
                "code": 2
            },
            {
                "name": "大专",
                "code": 3
            },
            {
                "name": "本科",
                "code": 4
            },
            {
                "name": "硕士",
                "code": 5
            },
            {
                "name": "博士",
                "code": 6
            }
        ]
    }
  }
  if (params == 'city') {
   return {
    code: 0,
    data: [{
      name: '深圳',
      code: '20'
    },
    {
      name: '广州',
      code: '30'
    },
    {
      name: '珠海',
      code: '40'
    },
    {
      name: '东莞',
      code: '50'
    },
    {
      name: '惠州',
      code: '60'
    },
    {
      name: '中山',
      code: '70'
    }],
  };
}
  if (params == 'jobTitle') {
    return {
        "code": 0,
        "msg": "ok",
        "data": [
            {
                "name": "销售人员",
                "code": 1
            },
            {
                "name": "销售主管",
                "code": 2
            },
            {
                "name": "销售总监",
                "code": 3
            }
        ]
    }
  }
  if (params == 'education') {
    return {
        "code": 0,
        "msg": "ok",
        "data": [
            {
                "name": "销售人员",
                "code": 1
            },
            {
                "name": "销售主管",
                "code": 2
            },
            {
                "name": "销售总监",
                "code": 3
            }
        ]
    }
  }
  if (params == 'orgType') {
    return {
        "code": 0,
        "msg": "ok",
        "data": [
            {
                "name": "银行机构",
                "code": 1
            },
            {
                "name": "金融机构",
                "code": 2
            },
            {
                "name": "小额贷款",
                "code": 3
            }
        ]
    }
  }

}
const getUserInfo = {
    "code": 0,
    "msg": "ok",
    "data": {
        "userId": "246d568067254847a6e26e405796a125",
        "loginAccount": "18312320204",
        "userHead": "http://cloudbank.oss-cn-shenzhen.aliyuncs.com/image/2406687392207186.jpg",
        "userSex": 0,
        "userName": "夏洛克",
        "idNumber": "445221199601224536",
        "backPictureId": "http://cloudbank.oss-cn-shenzhen.aliyuncs.com/image/2406743943977029.jpg",
        "upperPictureId": "http://cloudbank.oss-cn-shenzhen.aliyuncs.com/image/2406743961495740.jpg",
        "isMember": 1,
        "realName": "林哥",
        "phone": "18312320204",
        "briefIntroduction": "林哥威武"
    }
}
const getResumeDetail = {
    "code": 0,
    "msg": "ok",
    "data": {
         "resumeId":"2ebe0e2dae94433b89d8f50532c74829",
          "name":"林先生",
          "sex":"1",
          "birthYear":"1996",
          "education":"6",
          "workingYear":"2",
          "phone":"18312320206",
          "mail":"12345@qq.com",
          "city":"520658",
          "status":"1"
    }
}
const getResumeList = {
    "code": 0,
    "msg": "ok",
    "data":[{
        "resumeId":"8dd88de6cd4f475a8cef6692fdc35d01",
          "name":"林先生",
          "education":"6",
          "workingYear":"2",
          "expectLowestSalary":"10",
          "expectHighestSalary":"20",
          "headPortrait":"http://xxx.com",
    },]
}
const getWorkExperienceList = {
    "code": 0,
    "msg": "ok",
    "data": [
        {
        "workExperienceId":"2ebe0e2dae94433b89d8f50532c74829",
        "companyName":"众银云测",
        "job":"销售",
        "entryTime":"1526969363000",
        "leaveTime":"1526969363000",
        },
        {
        "workExperienceId":"2ebe0e2dae94433b89d8f50532c74829",
        "companyName":"众银云测",
        "job":"销售",
        "entryTime":"1526969363000",
        "leaveTime":"1526969363000",
        }
    ]
}
const getWorkExperienceDetail = {
    "code": 0,
    "msg": "ok",
    "data": {
        "workExperienceId":"2ebe0e2dae94433b89d8f50532c74829",
        "companyName":"众银云测",
        "job":"销售",
        "entryTime":"1526969363000",
        "leaveTime":"1526969363000",
        "jobContent":"工作内容"
    }
}
const getEducationDetail = {
    "code": 0,
    "msg": "ok",
    "data": {
       "educationId":"2ebe0e2dae94433b89d8f50532c74829",
       "school":"常春藤大学",
       "major":"软件科学",
       "graduate":"2008",
       "educationBackground":"博士"
    }
}
const getEducationList = {
    "code": 0,
    "msg": "ok",
    "data": [
        {
       "educationId":"2ebe0e2dae94433b89d8f50532c74829",
       "school":"常春藤大学",
       "major":"软件科学",
       "graduate":"2008",
       "educationBackground":"博士"
        },
        {
       "educationId":"2ebe0e2dae94433b89d8f50532c74829",
       "school":"常春藤大学",
       "major":"软件科学",
       "graduate":"2008",
       "educationBackground":"博士"
        }
    ]
}

const getExpectJobDetail = {
    "code": 0,
    "msg": "ok",
    "data": {
          "resumeId":"2ebe0e2dae94433b89d8f50532c74829",
          "expectJob":"林先生",
          "expectCity":"520658",
         "expectLowestSalary":"10",
          "expectHighestSalary":"50"
    }
}

const uploadImage =   {
    "code": 0,
    "msg": "ok",
    "data":"https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg"
  }
const getResumeAllDetail = {
    "code": 0,
    "msg": "ok",
    "data": {
        "appResume": {
            "resumeId": "dd49fd4256ba4e24ab975444b2deea84",
            "name": "林先生",
            "sex": "1",
            "birthYear": 1996,
            "education": "博士",
            "workingYear": "3",
            "phone": "18312320206",
            "mail": "1243935366@qq.ocm",
            "city": 520658,
            "status": "1"
        },
        "education": [
            {
                "educationId": "749739e9ba5d460caf351370a1a40278",
                "school": "麻省理工",
                "major": "软件科学",
                "graduate": "2005",
                "educationBackground": "博士"
            },
            {
                "educationId": "43d9cf34b95946d7a3108ead953e9f7b",
                "school": "常春藤大学",
                "major": "软件科学",
                "graduate": "2003",
                "educationBackground": "硕士"
            }
        ],
        "workExperience": [
            {
                "workExperienceId": "055d75e025864fbf9932e7d48d43d7d4",
                "companyName": "众银云测",
                "job": "销售",
                "entryTime": 1277950210000,
                "leaveTime": 1372644610000
            }
        ],
        "expectJob": {
            "expectJob": "销售主管",
            "expectCity": 520658,
            "expectSalary": "1"
        }
    }
}

module.exports = {ok, insertResume, selectByType, getUserInfo, getResumeDetail, getResumeList, getWorkExperienceList,getWorkExperienceDetail,getEducationDetail,getEducationList, getExpectJobDetail, uploadImage, getResumeAllDetail}
