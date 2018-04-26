import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Layout from '../layout/Blanklayout';
import withRoot from '../src/withRoot';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  menu: {
    width: 200,
  },
  button:{
    width: '40%',
    margin: '50px auto',
  }
});

class Wanted extends React.PureComponent {
  state = {
    name:'',
    job:'',
    phone:'',
    email:''
  }
  componentDidMount() {
    function hasClass(ele, cls) {
        return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    }
    //为指定的dom元素添加样式
    function addClass(ele, cls) {
        if (!hasClass(ele, cls)) ele.className += " " + cls;
    }
    //删除指定dom元素的样式
    function removeClass(ele, cls) {
        if (hasClass(ele, cls)) {
            var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
            ele.className = ele.className.replace(reg, " ");
        }
    }
      // bar
      var element = document.getElementsByClassName('filter');
      var content =document.getElementsByClassName('content');
      for (var i = 0; i < element.length; i++) {
        element[i].addEventListener('touchend',show)
      }
      function show(e){
        var className =  e.target.nextSibling.className;
        if(hasClass(e.target.nextSibling, 'column')&&!hasClass(e.target.nextSibling, 'open')) {
          addClass(e.target.nextSibling,'open')
          addClass(e.target.nextSibling.nextSibling,'show')
        } else {
          removeClass(e.target.nextSibling,'open')
          removeClass(e.target.nextSibling.nextSibling,'show')
        }

      }
      function stopTouchendPropagationAfterScroll(){
          var locked = false;

          window.addEventListener('touchmove', function(ev){
              locked || (locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));
          }, true);
          function stopTouchendPropagation(ev){
              ev.stopPropagation();
              window.removeEventListener('touchend', stopTouchendPropagation, true);
              locked = false;
          }
      }
      stopTouchendPropagationAfterScroll();
  }
  handleChange = name => event =>{
    this.setState({
      [name]:event.target.value
    })
  }
  submit = e =>{
    e.preventDefault();
    console.log(this.state)
  }
  render() {
    const {classes} = this.props;
    return (
      <Layout>
        <div className="join_us">
          <div className="join_us_banner"></div>
          <div className="list">
            <div className="s">
              <div className="filter"></div>
              <div className="column">
                <span className="title">IOS开发工程师</span>
                <span className="b">深圳市</span>
                <span className="b">技术部</span>
              </div>
              <div className="text">
                <div className="info">
                  <span className="first">发布时间：2018-03-20</span>
                  <span>工作性质：全职</span>
                  <span>薪资范围：6k-10k</span>
                </div>
                <div className="title">岗位职责：</div>
                <ul>
                  <li>根据需求在IOS移动端进行APP的设计与开发；</li>
                  <li>参与项目的产品设计、分析、开发以及维护；</li>
                  <li>参与移动端的接口开发，架构设计；</li>
                  <li>独立完成开发工作，进行模块测试，保证代码的质量；</li>
                  <li>将学习和研究到新的移动互联网技术应用到产品中进行创新；</li>
                  <li>修正并验证测试中发现的问题；</li>
                  <li>可以保证产品的正常运行以及维护升级。</li>
                </ul>
                <div className="title">任职要求：</div>
                <ul>
                  <li>大专及以上学历，计算机相关专业；</li>
                  <li>可以熟练运用XCode，Interface Builder等开发工具；</li>
                  <li>熟悉算法，数据结构，网络，多线程，常用设计模式及其应用场景；</li>
                  <li>有网络应用开发经验者优先；</li>
                  <li>工作认真，踏实有责任心；</li>
                  <li>有较强的沟通能力，及团队合作能力，发现问题可以及时沟通；</li>
                  <li>对代码具有良好的理解，可以编写结构良好的代码，具有良好的规范；</li>
                  <li>有良好的逻辑思维，可以指引他人工作。</li>
                </ul>
                <p>有意者请将简历发至<span className="hr">hr@ibankmatch.com </span></p>
              </div>
            </div>
            <div className="s">
              <div className="filter"></div>
              <div className="column">
                <span className="title">Android开发工程师</span>
                <span className="b">深圳市</span>
                <span className="b">技术部</span>

              </div>
              <div className="text">
                <div className="info">
                  <span className="first">发布时间：2018-03-20</span>
                  <span>工作性质：全职</span>
                  <span>薪资范围：6k-10k</span>
                </div>
                <div className="title">岗位职责：</div>
                <ul>
                  <li>参与业务需求设计讨论，基于Android平台进行应用程序开发；</li>
                  <li>负责移动平台软件框架的研究，设计和实现、关键技术验证和选型等工作；</li>
                  <li>完成Android项目设计、编码、测试和优化。</li>
                  <li>编写相关的开发文档，如技术文档，设计文档，测试文档等。</li>
                  <li>开发针对不同的Android操作系统版本和屏幕尺寸的应用，并完成兼容性测试。</li>
                  <li>对所开发的APP、SDK进行版本更新及维护。</li>
                  <li>学习和研究新的移动互联网技术以满足产品的需求。</li>
                </ul>
                <div className="title">任职要求：</div>
                <ul>
                  <li>精通Android手机平台，对Android底层接口有深入地了解，具有Android开发经验；</li>
                  <li>可开发基础良好，对手机软件性能优化、内存优化、安全等有一定了解，掌握常用Android应用架构；</li>
                  <li>熟悉androidsdk个版本之间的差异；</li>
                  <li>有丰富的项目开发经验，能独立承担开发任务；</li>
                  <li>工作认真，踏实有责任心；</li>
                  <li>学习能力强，思维活跃,能对产品的需求快速的做出技术上的分析；</li>
                  <li>具备良好的沟通协调能力和团队合作精神。</li>
                </ul>
                <p>有意者请将简历发至<span className="hr">hr@ibankmatch.com </span></p>
              </div>
            </div>
            <div className="s">
              <div className="filter"></div>
              <div className="column">
                <span className="title">高级java开发工程师</span>
                <span className="b">深圳市</span>
                <span className="b">技术部</span>

              </div>
              <div className="text">
                <div className="info">
                  <span className="first">发布时间：2018-03-20</span>
                  <span>工作性质：全职</span>
                  <span>薪资范围：6k-10k</span>

                </div>
                <div className="title">岗位职责：</div>
                <ul>
                  <li>独立负责开发任务的设计和实施；</li>
                  <li>保证开发任务按时完成；</li>
                  <li>保证开发代码的质量，及时修正问题； </li>
                  <li>独立解决所负责技术领域的问题； </li>
                  <li>编写技术说明文档。</li>
                  <li>能与其他部门进行有效的沟通；</li>
                  <li>积极了解公司业务，并参与相应的会议提供建议。</li>
                </ul>
                <div className="title">任职要求：</div>
                <ul>
                  <li>大学本科及以上学历，计算机、通信相关专业；</li>
                  <li>有3年以上Java项目开发经验，熟悉web开发项目；</li>
                  <li>熟练掌握Spring、SpringMVC 、ibatis、quartz等开源框架；</li>
                  <li>shtml,css,javascript，Ajax等web前端技术； </li>
                  <li>熟悉SOA架构体系，熟练掌握Webservice技术，如CXF等，有实际开发项目经历者优先；</li>
                  <li>熟练使用Tomcat等一种或多种Web/Application Server； </li>
                  <li>熟悉mySQL数据库的开发经验。</li>
                  <li>对代码具有良好的理解，可以编写结构良好的代码，具有良好的规范；。</li>
                  <li>有良好的逻辑思维，可以指引他人工作。</li>
                </ul>
                <p>有意者请将简历发至<span className="hr">hr@ibankmatch.com </span></p>
              </div>
            </div>
            <div className="s">
              <div className="filter"></div>
              <div className="column">
                <span className="title">前端开发工程师</span>
                <span className="b">深圳市</span>
                <span className="b">技术部</span>

              </div>
              <div className="text">
                <div className="info">
                  <span className="first">发布时间：2018-03-20</span>
                  <span>工作性质：全职</span>
                  <span>薪资范围：6k-10k</span>

                </div>
                <div className="title">岗位职责：</div>
                <ul>
                  <li>根据公司需求进行UI设计；</li>
                  <li>配合后台工作人员完成产品页面的代码编程及脚本编码；</li>
                  <li>可以熟练掌握html语言、css、js，能对网站进行内部优化； </li>
                  <li>根据不同浏览器制定出最优的呈现方案； </li>
                  <li>可以按照UE图及UI规范呈现页面结构；</li>
                  <li>负责前端通用工具平台的开发及设计并建设。</li>
                </ul>
                <div className="title">任职要求：</div>
                <ul>
                  <li>掌握良好的前段技能，比如Html/XML/css等；</li>
                  <li>熟练掌握至少一种常用前端框架，如React、AngularJs、Vue.js、Backbone等</li>
                  <li>熟练使用前端开发工具及调试工具，会使用grunt、gulp、webpack等前端工具</li>
                  <li>会使用git进行代码协同管理</li>
                  <li>有较强的独立解决问题能力、学习能力、以及沟通能力</li>
                </ul>
                <p>有意者请将简历发至<span className="hr">hr@ibankmatch.com </span></p>
              </div>
            </div>
            <div className="s">
              <div className="filter"></div>
              <div className="column">
                <span className="title">测试工程师</span>
                <span className="b">深圳市</span>
                <span className="b">技术部</span>

              </div>
              <div className="text">
                <div className="info">
                  <span className="first">发布时间：2018-03-20</span>
                  <span>工作性质：全职</span>
                  <span>薪资范围：6k-10k</span>

                </div>
                <div className="title">岗位职责：</div>
                <ul>
                  <li>负责测试计划编写，测试用例设计，测试执行和报告，编写必要的测试工具；</li>
                  <li>进行测试记录和相应文档编写；</li>
                  <li>编写测试报告和对测试结果分析，通过测试，掌握软件具有的能力、缺陷、局限等，对软件质量给出评价性的结论与意见，整理测试文档，填写软件测试报告,编写测试总结，为软件开发成果提供总结性意见；</li>
                  <li>完成上级及部门其他领导交办的临时任务。</li>
                </ul>
                <div className="title">任职要求：</div>
                <ul>
                  <li>专科及以上学历，具备互联网金融系统测试工作经验优先考虑（B/S，App）；</li>
                  <li>熟练操作UNIX和windows操作系统，熟悉Unix Shell编程及常用的Test工具和bug tracking 工具；</li>
                  <li>熟练使用前端开发工具及调试工具，会使用grunt、gulp、webpack等前端工具</li>
                  <li>熟悉数据库检索操作，需要熟悉Oracle，Sybase，Mysql，SQLserver，Postgresql中至少一种。熟悉测试流程，能独立完成测试计划，测试用例设计及良好的文档书写能力；</li>
                  <li>了解自动化测试，掌握任一常用自动化测试框架或工具，如monkeyrunner、appium、loadrunner、QTP、jmeter、selenium、appscan等，有实际项目测试应用者优先考虑，有接口测试、性能测试经验者优先考虑；</li>
                </ul>
                <p>有意者请将简历发至<span className="hr">hr@ibankmatch.com </span></p>
              </div>
            </div>
            <div className="s">
              <div className="filter"></div>
              <div className="column">
                <span className="title">产品经理</span>
                <span className="b">深圳市</span>
                <span className="b">技术部</span>

              </div>
              <div className="text">
                <div className="info">
                  <span className="first">发布时间：2018-03-20</span>
                  <span>工作性质：全职</span>
                  <span>薪资范围：6k-10k</span>

                </div>
                <div className="title">岗位职责：</div>
                <ul>
                  <li>负责APP产品规划、业务流程设计、功能设计、产品优化等工作； </li>
                  <li>制定产品需求计划,进行可行性分析和概要设计,撰写用户需求说明书,负责需求的跟踪和控制； </li>
                  <li>制定产品业务规范，整理、完善产品文档,业务流程及相关内容； </li>
                  <li>负责部门间的协调沟通，产品项目实施及推广，与用户对接，整理需求；</li>
                  <li>负责日常业务数据分析，对数据进一步加工及挖掘，反馈数据指标间关联信息指导业务决策计划实施。</li>
                  <li>收集行业及竞争对手信息，协助确定产品发展目标及战略 ；</li>
                  <li>及时收集、处理所负责产品的各方面信息；</li>
                  <li>对行业及相关行业的发展进行调研。</li>
                </ul>
                <div className="title">任职要求：</div>
                <ul>
                  <li>大学专科及以上学历， 2年以上互联网平台APP产品从业经验。</li>
                  <li>熟悉产品实施过程，包括市场分析、需求分析、产品功能设计、业务流程设计、原型设计、产品可用性测试等；</li>
                  <li>熟悉PRD文档编写，熟练使用产品设计类软件，熟悉技术研发流程的优先； </li>
                  <li>理解能力强，分析能力强，逻辑思维清晰，能熟练编辑产品方案，条理清楚，对数据敏感。</li>

                </ul>
                <p>有意者请将简历发至<span className="hr">hr@ibankmatch.com </span></p>
              </div>
            </div>
            <div className="s">
              <div className="filter"></div>
              <div className="column">
                <span className="title">UI设计师</span>
                <span className="b">深圳市</span>
                <span className="b">技术部</span>

              </div>
              <div className="text">
                <div className="info">
                  <span className="first">发布时间：2018-03-20</span>
                  <span>工作性质：全职</span>
                  <span>薪资范围：6k-10k</span>

                </div>
                <div className="title">岗位职责：</div>
                <ul>
                  <li>负责移动端app(android/IOS)的视觉&和交互设计; </li>
                  <li>根据产品的目标对设计风格进行定位推导,并执行完成设计方案;</li>
                  <li>体验产品细节,不断优化操作体验及界面视觉效果;</li>
                  <li>协助产品经理处理客户与用户反馈的问题与建议收集；</li>
                  <li>协助产品经理对新产品的开发与市场与用户需求进行分析；</li>
                  <li>负责设计、技术相关部门的产品开发，调试沟通、设计控制的执行和维护，不断改进设计水平，以达到公司日益发展的要求；</li>
                </ul>
                <div className="title">任职要求：</div>
                <ul>
                  <li>专业的设计、美术、广告、视觉传达等相关专业专科以上学历；</li>
                  <li>资深网民，热爱互联网，对各类互联网站及移动端产品都有较深的理解，关注互联网业界的最新资讯，乐于尝试新网站和新技术；</li>
                  <li> 精通Photoshop、IIIustrator、Axure、XMind、Mockplus等软件、熟悉网页制作流程，了解前端代码制作规范优先； </li>
                  <li>擅长交互设计，有交互设计经验，熟练使用各种交互设计工具，作为核心人员参与过互联网产品设计;</li>
                  <li>有用户体验工作经验,同时具有线上线下的设计功底；</li>
                  <li>二年及以上移动端产品APP UI设计经验，有成熟的的上线产品经验,有设计团队管理经验的优先；</li>
                  <li>具备扎实的美术设计功底和优秀的设计思路和技能；</li>
                  <li>良好的表达能力，沟通交流技巧，团队协作能力，能够承受工作压力。工作认真仔细，责任心。</li>

                </ul>
                <p>有意者请将简历发至<span className="hr">hr@ibankmatch.com </span></p>
              </div>
            </div>
            <div className="s">
              <div className="filter"></div>
              <div className="column">
                <span className="title">商务专员</span>
                <span className="b">深圳市</span>
                <span className="b">商务部</span>

              </div>
              <div className="text">
                <div className="info">
                  <span className="first">发布时间：2018-03-20</span>
                  <span>工作性质：全职</span>
                  <span>薪资范围：6k-10k</span>

                </div>
                <div className="title">岗位职责：</div>
                <ul>
                  <li>负责商务服务项目的策划和实施，建立和完善产品选型、新产品的推广；</li>
                  <li>商务信息的收集、整理、分类，对项目信息时时跟踪；</li>
                  <li>整理、编制商务文件模板，改进和规范工作流程；</li>
                  <li>协助上级做好项目整理；</li>
                  <li>与客户洽谈商务服务合作；</li>
                  <li>相关部门的沟通协调工作。</li>
                </ul>
                <div className="title">任职要求：</div>
                <ul>
                  <li>大学专科及以上学历；</li>
                  <li>熟悉商务服务流程及相关注意事项，擅长商务谈判；</li>
                  <li>计算机应用熟练，办公自动化软件必备；</li>
                  <li>具备分析、解决问题的能力，工作认真仔细、能够承受工作中的压力。</li>
                </ul>
                <p>有意者请将简历发至<span className="hr">hr@ibankmatch.com </span></p>
              </div>
            </div>
            <div className="s">
              <div className="filter"></div>
              <div className="column">
                <span className="title">SEO网络推广</span>
                <span className="b">深圳市</span>
                <span className="b">运营部</span>

              </div>
              <div className="text">
                <div className="info">
                  <span className="first">发布时间：2018-03-20</span>
                  <span>工作性质：全职</span>
                  <span>薪资范围：4k-7k</span>

                </div>
                <div className="title">岗位职责：</div>
                <ul>
                  <li>负责公司旗下网站、APP下载SEO流量的提升，扩大品牌知名度；</li>
                  <li>监控、分析、评估关键词，设定关键字策略，提升搜索引擎流量；</li>
                  <li>熟悉主流搜索引擎排名的工作基本原理及策略，包括站内优化、站外优化，以及内外部链接优化等，有较丰富的操作经验；</li>
                  <li>.熟练使用站长工具，优化工具、流量分析工具；</li>
                </ul>
                <div className="title">任职要求：</div>
                <ul>
                  <li>1-3年工作经验，大专以上，计算机网络相关专业</li>
                  <li>有金融类产品优化推广经验优先</li>
                  <li>具有强烈的责任心，团队协作意识强；</li>
                </ul>
                <p>有意者请将简历发至<span className="hr">hr@ibankmatch.com </span></p>
              </div>
            </div>
            <div className="s">
              <div className="filter"></div>
              <div className="column">
                <span className="title">活动策划</span>
                <span className="b">深圳市</span>
                <span className="b">运营部</span>

              </div>
              <div className="text">
                <div className="info">
                  <span className="first">发布时间：2018-03-20</span>
                  <span>工作性质：全职</span>
                  <span>薪资范围：4k-6k </span>

                </div>
                <div className="title">岗位职责：</div>
                <ul>
                  <li>围绕项目营销或活动，负责公司外部资源的整合，整合对象包括社会资源、活动资源、客户资源等， 并与资源方保持良好的沟通； </li>
                  <li>负责活动方案制定前活动资源收集及筛选； </li>
                  <li>负责提供有竞争力和个性化的市场推广及公关活动策划方案；</li>
                  <li>根据营销策略，对项目的推广活动、公关活动的整体策划、组织执行； </li>
                  <li>负责活动文案的策划、创意、撰写和执行；制定预算及工作报告； </li>
                  <li>负责活动现场全面控制，突发情况处理； </li>
                  <li>统计各项公关活动的数据，经过分类整理和分析，如实上报为领导决策提供依据；</li>
                  <li>收集活动的客户反馈信息，进行分析并调整活动方案；</li>
                  <li>负责活动后续工作的跟进，效果的跟踪分析及总结； </li>
                  <li>协助完成公司其他部门相关活动策划工作。 </li>
                </ul>
                <div className="title">任职要求：</div>
                <ul>
                  <li>市场营销、广告类或相关专业本科或以上学历，市场活动策划、执行、客户服务或相关市场领域工作经验3年以上，2年以上活动或公关公司工作背景； </li>
                  <li>熟知大型活动的运作流程，精通活动项目管理，具有丰富的现场执行经验； </li>
                  <li>有较强的活动执行能力，良好的沟通能力和积极向上的团队精神；</li>
                  <li>熟悉专业创意方法，思维敏捷，洞察力强，细心，耐心，语言表达能力强。</li>
                </ul>
                <p>有意者请将简历发至<span className="hr">hr@ibankmatch.com </span></p>
              </div>
            </div>
            <div className="s">
              <div className="filter"></div>
              <div className="column">
                <span className="title">行政专员</span>
                <span className="b">深圳市</span>
                <span className="b">综合部</span>

              </div>
              <div className="text">
                <div className="info">
                  <span className="first">发布时间：2018-03-20</span>
                  <span>工作性质：全职</span>
                  <span>薪资范围：4k-6k </span>

                </div>
                <div className="title">岗位职责：</div>
                <ul>
                  <li>协助上级建立健全公司招聘、培训、工资、保险、福利、绩效考核等人力资源制度建设；</li>
                   <li>擅长招聘工作，执行招聘工作流程，不断开发新的招聘渠道；</li>
                   <li>负责公司内部的人才招聘工作，通过各种招聘渠道的准备工作并完成招聘计划；</li>
                   <li>负责组织企业文化建设工作，包括公司庆典、年会安排、会务组织、文体活动安排；</li>
                   <li>负责部门一些日常行政事务，配合上级做好行政人事方面的工作。</li>
                </ul>
                <div className="title">任职要求：</div>
                <ul>
                  <li>全日制专科及以上学历，人力资源管理，行政管理等相关专业优先； </li>
                  <li>1年以上相关工作经验，形象好、气质佳；</li>
                  <li>具备完善的招聘思路，有销售型企业工作经验、能力突出者优先。</li>
                </ul>
                <p>有意者请将简历发至<span className="hr">hr@ibankmatch.com </span></p>
              </div>
            </div>
            <div className="s">
              <div className="filter"></div>
              <div className="column">
                <span className="title">财务专员</span>
                <span className="b">深圳市</span>
                <span className="b">综合部</span>

              </div>
              <div className="text">
                <div className="info">
                  <span className="first">发布时间：2018-03-20</span>
                  <span>工作性质：全职</span>
                  <span>薪资范围：4k-6k </span>
                  <span>招聘人数：1人</span>
                </div>
                <div className="title">岗位职责：</div>
                <ul>
                  <li>日常财务核算、会计凭证、出纳、税务工作的审核；</li>
                   <li>审核公司财务报表、核对关联往来，合并报表并进行财务分析；</li>
                   <li>依据费用管理规定，合理控制费用支出。</li>
                </ul>
                <div className="title">任职要求：</div>
                <ul>
                  <li>财务相关专业大专及以上学历，有无经验均可，拥有会计证从业资格证优先； </li>
                  <li>熟悉财务核算流程，会做财务报表；</li>
                  <li>熟练使用excel。</li>
                </ul>
                <p>有意者请将简历发至<span className="hr">hr@ibankmatch.com </span></p>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          /* join us */
          .join_us_banner{
            background: url(/static/join_us.jpg);
            height: 210px;
            background-size: 100% 100%;
          }
          .join_us ul {
            margin: 0;
            padding: 0;
            list-style: disc;
          }
          .join_us .column{
            display: flex;
            justify-content: space-between;
          }
          .join_us .s {
            margin: 0 14px;
            padding: 20px 0;
            border-bottom: 1px solid #e8e8e8;
            font-size: 0.9rem;
            position: relative;
          }
          .join_us .s .filter{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 56px;
          }
          .join_us  .column .title{
            color: #646464;
            font-size: 0.8rem;
            /* display: inline-block; */
            flex: 0 0 120px;
          }
          .join_us  .column.open .title{
            color: #ee5648;
          }
          .join_us  .column .b{
            color: #949494;
          }
          .join_us  .column.open .b{
            color: #ee5648;
          }

          .join_us  .column.open .more{
            background: url(./images/shouqi.png) no-repeat;
          }
          .join_us  .text{
            /* padding-left: 20px; */
            display: none;
              margin-top: 10px;
          }
          .join_us  .text.show{
            display: block;
          }
          .join_us  .text .info {
            display: flex;
            justify-content: space-between;
            font-size:10px;
          }
          @media screen and (min-width: 320px) {
            .join_us  .text .info {
              font-size:10px;
            }
          }
          @media screen and (min-width: 375px) {
            .join_us  .text .info {
              font-size:12px;
            }
          }
          @media screen and (min-width: 400px) {
            .join_us  .text .info {
              font-size:14px;
            }
          }
          .join_us  .text .info span.first{
            margin-left: 0;
          }
          .join_us  .text  .title{
            margin: 10px 0 0 0;
          }
          .join_us  .text  ul li{
            line-height: 20px;
            margin-left: 15px;
          }
          .join_us  .text .hr {
            color: #ee5648;
            margin-left: 10px;
          }
        `}</style>
      </Layout>
    )
  }
}

export default withRoot(withStyles(styles)(Wanted));
