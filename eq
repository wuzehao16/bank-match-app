[1mdiff --git a/pages/workDetail.js b/pages/workDetail.js[m
[1mindex 190c143..f4a3189 100644[m
[1m--- a/pages/workDetail.js[m
[1m+++ b/pages/workDetail.js[m
[36m@@ -45,7 +45,7 @@[m [mconst Title = styled.div`[m
   font-weight: 500;[m
   margin: 25px 0;[m
   display: flex;[m
[31m-  align-items: center;        [m
[32m+[m[32m  align-items: center;[m
 `[m
 const Line = styled.div`[m
   height: 1px;[m
[36m@@ -69,11 +69,9 @@[m [mclass WorkDetail extends React.PureComponent {[m
     const token = getCookie('token', req)[m
     const jobDetail = await fetch(`/getJobDetail?jobId=${query.jobId}`);[m
     const education = await fetch('/selectByType?type=education')[m
[31m-    if(token){[m
[31m-      var resume = await fetch('/getResumeAllDetail',token)[m
[31m-    }[m
[32m+[m[32m    const resume = await fetch('/getResumeAllDetail',token)[m
     return {[m
[31m-            resume: resume || '',[m
[32m+[m[32m            resume: resume,[m
             jobDetail: jobDetail || {},[m
             jobId: query.jobId,[m
             companyId: query.companyId,[m
[36m@@ -85,7 +83,6 @@[m [mclass WorkDetail extends React.PureComponent {[m
               scaleDic: scale,[m
             }[m
           };[m
[31m-          token: token?true:false[m
   }[m
 [m
  async handleClick (val) {[m
[36m@@ -96,14 +93,12 @@[m [mclass WorkDetail extends React.PureComponent {[m
       }else {[m
         Toast.offline(res.msg, 1);[m
       }[m
[31m-   }else if(!this.props.token){[m
[31m-    Toast.offline("请先登录并填写简历信息", 1);[m
[31m-  }else{[m
[32m+[m[32m   }else{[m
     Toast.offline("您尚未填写简历", 1);[m
     setTimeout(() => {[m
       Router.push('/resume')[m
     }, 1000);[m
[31m-   } [m
[32m+[m[32m   }[m
   }[m
 [m
   render() {[m
[36m@@ -135,7 +130,7 @@[m [mclass WorkDetail extends React.PureComponent {[m
               <Item[m
                 align="top"[m
                 thumb={jobDetail.logo}[m
[31m-                multipleLine>        [m
[32m+[m[32m                multipleLine>[m
                 <Name>{jobDetail.companyName}</Name>[m
                 <Brief>[m
                   <Fragment>[m
