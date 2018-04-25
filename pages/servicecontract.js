import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Layout from '../layout/Blanklayout';

class ServiceContract extends React.PureComponent {
  render() {
    return (
      <Layout title="服务协议">
        <div className='content' style={{background:'#fff'}}>
          <h1>众银云测APP服务协议</h1>
          <p>众银云测APP（以下简称“众银云测”）由深圳市众银云测信息技术有限公司运营的网络服务平台，我们依照以下注册协议向您提供本注册协议涉及的相关服务。请您使用众银云测服务前仔细阅读本注册协议。您只有完全同意所有注册协议，才能成为众银云测的用户（以下简称"用户"）并使用相应服务。您在注册为众银云测用户过程中点击"同意众银云测用户注册协议"按钮即表示您已仔细阅读并明确同意遵守本注册协议以及经参引而并入其中的所有条款、政策以及指南，并受该等规则的约束（合称"本注册协议"）。我们可能根据法律法规的要求或业务运营的需要，对本注册协议不时进行修改。 除非另有规定，否则任何变更或修改将在修订内容于众银云测发布之时立即生效，您对众银云测的使用、继续使用将表明您接受此等变更或修改。如果您不同意本注册协议（包括我们可能不定时对其或其中引述的其他规则所进行的任何修改）的全部规定，则请勿使用众银云测提供的所有服务，或您可以主动取消众银云测提供的服务。 为了便于您了解适用于您使用众银云测的条款和条件，我们将在众银云测上发布我们对本注册协议的修改，您应不时地审阅本注册协议以及经参引而并入其中的对应规则。</p>
          <h2>一、服务内容</h2>
          <ol>
            <li>1.1众银云测的具体服务内容由我们根据实际情况提供并不时更新，包括但不限于信息、图片、文章、评论、链接等，我们将定期或不定期根据用户的意愿以电子邮件、短信、电话或站内信等方式 为用户提供活动信息，并向用户提供相应服务。我们对提供的服务拥有最终解释权。
            </li>
            <li>1.2众银云测的服务仅供个人用户使用。除我们书面同意，您或其他用户均不得将众银云测上的任何信息用于商业目的。
            </li>
            <li>1.3您使用众银云测服务时所需的相关设备以及网络资源等（如个人电脑及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费）均由您自行负担。
            </li>
          </ol>
          <h2>二、信息提供和隐私保护</h2>
          <ol>
            <li>2.1您在访问、使用众银云测或申请使用众银云测服务时，必须提供本人真实的个人信息，且您应该根据实际变动情况及时更新个人信息。保护用户隐私是我们的重点原则，我们通过各种技术手段和强化内部管理等办法提供隐私保护服务功能，充分保护您的个人信息安全
            </li>
            <li>2.2众银云测不负责审核您提供的个人信息的真实性、准确性或完整性，因信息不真实、不准确或不完整而引起的任何问题及其后果，由您自行承担，且您应保证众银云测免受由此而产生的任何损害或责任。若我们发现您提供的个人信息是虚假、不准确或不完整的，我们有权自行决定终止向您提供服务。
            </li>
            <li>2.3您已明确授权，为提供服务、履行协议、解决争议、保障交易安全等目的，我们对您提供的、我们自行收集的及通过第三方收集的您的个人信息、您申请服务时的相关信息、您在使用服务时储存在众银云测的非公开内容以及您的其他个人资料（以下简称“个人资料”）享有留存、整理加工、使用和披露的权利，具体方式包括但不限于：
              <ol>
                <li>（1）出于为您提供服务的需要在本APP公示您的个人资料；</li>
                <li>（2）由人工或自动程序对您的个人资料进行获取、评估、整理、存储；</li>
                <li>（3）使用您的个人资料以改进本APP的设计和推广；</li>
                <li>（4）使用您提供的联系方式与您联络并向您传递有关服务和管理方面的信息； </li>
                <li>（5）对您的个人资料进行分析整合并向为您提供服务的第三方提供为完成该项服务必要的信息。当为您提供服务的第三方与您电话核实信息时，为保证为您服务的质量，您同意众银云测对上述核实电话进行录音。</li>
                <li>（6）在您违反与我们或我们的其他用户签订的协议时，披露您的个人资料及违约事实，将您的违约信息写入黑名单并与必要的第三方共享数据，以供我们及第三方审核、追索之用。</li>
                <li>（7）其他必要的使用及披露您个人资料的情形。 您已明确同意本条款不因您终止使用众银云测服务而失效。如因我们行使本条款项下权利使您遭受损失，我们对该等损失免责。</li>
              </ol>
            </li>
            <li>2.4为更好地为您提供服务，您同意并授权众银云测可与其合作的第三方进行联合研究，并可将通过本协议获得的您的信息投入到该等联合研究中。但众银云测与其合作的第三方在开展上述联合研究前，应要求其合作的第三方对在联合研究中所获取的您的信息予以保密。
            </li>
            <li>2.5我们保证采用行业惯例以保护您的资料，但您理解，鉴于技术限制，我们无法确保用户的个人信息完全不被泄露。
            </li>
            <li>2.6我们不会向与您无关的第三方恶意出售或免费提供您的个人资料，但下列情况除外：
              <ol>
              <li>
              （1）事先获得您的明确授权； 
              </li>
              <li>
              （2）按照相关司法机构或政府主管部门的要求；
              </li>
              <li>
              （3）以维护我们合法权益之目的； 
              </li>
              <li>
              （4）维护社会公众利益； 
              </li>
              <li>
              （5）为确保众银云测业务和系统的完整与操作。
              </li>
              <li>
              （6）符合其他合法要求。
              </li>
              </ol>
            </li>
          </ol>

          <h2>三、使用准则</h2>
          <ol>
            <li>3.1您在使用众银云测服务过程中，必须遵循国家的相关法律法规，不通过众银云测发布、复制、上传、散播、分发、存储、创建或以其它方式公开含有以下内容的信息：
              <ol>
                <li>(1)反对宪法所确定的基本原则的； </li>
                <li>(2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</li>
                <li>(3)损害国家荣誉和利益的； </li>
                <li>(4)煽动民族仇恨、民族歧视，破坏民族团结的； </li>
                <li>(5)破坏国家宗教政策，宣扬邪教和封建迷信的；</li>
                <li>(6)散布谣言，扰乱社会秩序，破坏社会稳定的；</li>
                <li>(7)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的、欺诈性的或以其它令人反感的讯息、数据、信息、文本、音乐、声音、照片、图形、代码或其它材料； </li>
                <li>(8)侮辱或者诽谤他人，侵害他人合法权益的； </li>
                <li>(9)其他违反宪法和法律、行政法规或规章制度的； </li>
                <li>(10)可能侵犯他人的专利、商标、商业秘密、版权或其它知识产权或专有权利的内容；</li>
                <li>(11)假冒任何人或实体或以其它方式歪曲您与任何人或实体之关联性的内容；</li>
                <li>(12)未经请求而擅自提供的促销信息、政治活动、广告或意见征集； </li>
                <li>(13)任何第三方的私人信息，包括但不限于地址、电话号码、电子邮件地址、身份证号以及信用卡卡号；</li>
                <li>(14)病毒、不可靠数据或其它有害的、破坏性的或危害性的文件；</li>
                <li>(15)与内容所在的互动区域的话题不相关的内容； </li>
                <li>(16)依我们的自行判断，足以令人反感的内容，或者限制或妨碍他人使用或享受互动区域或众银云测的内容，或者可能使我们或我们关联方或其他用户遭致任何类型损害或责任的内容；</li> 
                <li>(17)包含法律或行政法规禁止内容的其他内容。 </li>
              </ol>
            </li>
            <li>3.2用户不得利用众银云测的服务从事下列危害计算机信息网络安全的活动：
              <ol>
                <li>(1)未经允许，进入计算机信息网络或者使用计算机信息网络资源； </li>
                <li>(2)未经允许，对计算机信息网络功能进行删除、修改或者增加；</li>
                <li>(3)未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加；</li>
                <li>(4)故意制作、传播计算机病毒等破坏性程序； </li>
                <li>(5)其他危害计算机信息网络安全的行为。</li>
              </ol>
            </li>  
            <li>3.3我们保留在任何时候为任何理由而不经通知地过滤、移除、筛查或编辑本APP上发布或存储的任何内容的权利，您须自行负责备份和替换在本APP发布或存储的任何内容，成本和费用自理。</li> 
            <li>3.4您须对自己在使用众银云测服务过程中的行为承担法律责任。若您为限制行为能力或无行为能力者，则您的法定监护人应承担相应的法律责任。 </li>
            <li>3.5如您的操作影响系统总体稳定性或完整性，我们将暂停或终止您的操作，直到相关问题得到解决。</li>
          </ol> 

          <h2>四、免责声明</h2>
          <ol>
            <li>4.1众银云测是一个开放平台，用户将文章或照片等个人资料上传到互联网上，有可能会被其他组织或个人复制、转载、擅改或做其它非法用途，用户必须充分意识此类风险的存在。作为网络服务的提供者，我们对用户在任何论坛、个人主页或其它互动区域提供的任何陈述、声明或内容均不承担责任。您明确同意使用众银云测服务所存在的风险或产生的一切后果将完全由您自身承担，我们对上述风险或后果不承担任何责任。 </li>
            <li>4.2您违反本注册协议、违反道德或法律的，侵犯他人权利（包括但不限于知识产权）的，我们不承担任何责任。同时，我们对任何第三方通过众银云测发送服务或包含在服务中的任何内容不承担责任。</li>
            <li>4.3对您、其他用户或任何第三方发布、存储或上传的任何内容或由该等内容导致的任何损失或损害，我们不承担责任。</li>
            <li>4.4对任何第三方通过众银云测可能对您造成的任何错误、中伤、诽谤、诬蔑、不作为、谬误、淫秽、色情或亵渎，我们不承担责任。</li>
            <li>4.5对黑客行为、计算机或手机病毒、或因您保管疏忽致使帐号、密码被他人非法使用、盗用、篡改的或丢失，或由于与本APP站链接的其它网站或APP所造成您个人资料的泄露，或您因其他非众银云测原因造成的损失，我们不承担责任。如您发现任何非法使用用户帐号或安全漏洞的情况，请立即与我们联系。</li>
            <li>4.6因任何非众银云测原因造成的网络服务中断或其他缺陷，我们不承担任何责任。</li>
            <li>4.7我们不保证服务一定能满足您的要求；不保证服务不会中断，也不保证服务的及时性、安全性、准确性。</li>
            <li>4.8任何情况下，因使用众银云测服务而引起或与使用众银云测有关内容而产生的由我们负担的责任总额，无论是基于合同、保证、侵权、产品责任、严格责任或其它理论，均不得超过您因访问或使用本APP而向我们支付的任何服务费用。</li>
          </ol>

          <h2>五、服务变更、中断或终止</h2>
          <ol>
            <li>5.1如因升级的需要而需暂停服务、或调整服务内容，我们将尽可能在APP上进行通告。由于用户未能及时浏览通告而造成的损失，我们不承担任何责任。</li>
            <li>5.2您明确同意，我们保留根据实际情况随时调整众银云测提供的服务内容、种类和形式，或自行决定授权第三方向您提供原本我们提供的服务。因业务调整给您或其他用户造成的损失，我们不承担任何责任。同时，我们保留随时变更、中断或终止众银云测全部或部分服务的权利。</li>
            <li>5.3发生下列任何一种情形，我们有权单方面中断或终止向您提供服务而无需通知您，且无需对您或第三方承担任何责任：</li>
              <ol>
                <li>(1)您提供的个人资料不真实；</li>
                <li>(2)您违反本注册协议；</li>
                <li>(3)未经我们书面同意，将众银云测平台用于商业目的。</li>
              </ol>  
            <li>5.4您可随时通知我们终止向您提供服务或直接取消众银云测服务。自您终止或取消服务之日起，我们不再向您承担任何形式的责任。</li>
          </ol>

          <h2>六、知识产权及其它权利</h2>
          <ol>
            <li>6.1用户可以充分利用众银云测平台共享信息。您可以在众银云测发布从众银云测个人主页或APP或其他网站或APP复制的图片和信息等内容，但这些内容必须属于公共领域或者您拥有以上述使用方式使用该等内容的权利，且您有权对该等内容作出本条款下之授权、同意、认可或承诺。</li>
            <li>6.2对您在众银云测发布或以其它方式传播的内容，您作如下声明和保证：</li>
              <ol>
                <li>(i)对于该等内容，您具有所有权或使用权；</li>
                <li>(ii)该等内容是合法的、真实的、准确的、非误导性的；</li>
                <li>(iii)使用和发布此等内容或以其它方式传播此等内容不违反本注册协议，也不侵犯任何人或实体的任何权利或造成对任何人或实体的伤害。</li>
              </ol>  
            <li>6.3未经相关内容权利人的事先书面同意，您不得擅自复制、传播在众银云测的该等内容，或将其用于任何商业目的，所有这些资料或资料的任何部分仅可作为个人或非商业用途而保存在某台计算 机或其他电子设备内。否则，我们及/或权利人将追究您的法律责任。</li>
            <li>6.4您在众银云测发布或传播的自有内容或具有使用权的内容，您特此同意如下： </li>
              <ol>
                <li>(1)授予我们使用、复制、修改、改编、翻译、传播、发表此等内容，从此等内容创建派生作品，以及在全世界范围内通过任何媒介（现在已知的或今后发明的）公开展示和表演此等内容的权利 ；</li>
                <li>(2)授予我们及其关联方和再许可人一项权利，可依他们的选择而使用用户有关此等内容而提交的名称；</li>
                <li>(3)授予我们在第三方侵犯您在众银云测的权益、或您发布在众银云测的内容情况下，依法追究其责任的权利（但这并非我们的义务）；</li>
              </ol>      
            <li>6.5您在众银云测公开发布或传播的内容、图片等为非保密信息，我们没有义务将此等信息作为您的保密信息对待。在不限制前述规定的前提下，我们保留以适当的方式使用内容的权利，包括但不限于删除、编辑、更改、不予采纳或拒绝发布。我们无义务就您提交的内容而向您付款。一旦内容已在众银云测发布，我们也不保证向您提供对在众银云测发布内容进行编辑、删除或作其它修改的机会。</li>
            <li>6.6如有权利人发现您在众银云测发表的内容侵犯其权利，并依相关法律、行政法规的规定向我们发出书面通知的，我们有权在不事先通知您的情况下自行移除相关内容，并依法保留相关数据。您同意不因该种移除行为向我们主张任何赔偿，如我们因此遭受任何损失，您应赔偿我们的损失（包括但不限于赔偿各种费用及律师费）。</li>
            <li>6.7若您认为您发布第6.6条指向内容并未侵犯其他方的权利，您可以向我们以书面方式说明被移除内容不侵犯其他方权利的书面通知，该书面通知应包含如下内容：您详细的身份证明、住址、联 系方式、您认为被移除内容不侵犯其他方权利的证明、被移除内容在众银云测上的位置以及书面通知内容的真实性声明。我们收到该书面通知后，有权决定是否恢复被移除内容。</li>
            <li>6.8您特此同意，如果6.7条中的书面通知的陈述失实，您将承担由此造成的全部法律责任，如我们因此遭受任何损失，您应向我们赔偿我们的损失（包括但不限于赔偿各种费用及律师费）。</li>
          </ol>

          <h2>七、特别约定</h2>
          <ol>
            <li>7.1您使用本服务的行为若有任何违反国家法律法规或侵犯任何第三方的合法权益的情形时，我们有权直接删除该等违反规定之信息，并可以暂停或终止向您提供服务。</li>
            <li>7.2若您利用众银云测服务从事任何违法或侵权行为，由您自行承担全部责任，因此给我们或任何第三方造成任何损失，您应负责全额赔偿，并使我们免受由此产生的任何损害。 </li>
            <li>7.3您同意我们通过重要页面的公告、通告、电子邮件以及常规信件的形式向您传送与众银云测服务有关的任何通知和通告。 </li>
            <li>7.4如您有任何有关与众银云测服务的个人信息保护相关投诉，请您与我们联系，我们将在接到投诉之日起15日内进行答复。</li>
            <li>7.5 本注册协议之效力、解释、执行均适用中华人民共和国法律。 </li>
            <li>7.6如就本协议内容或其执行发生任何争议，应尽量友好协商解决；协商不成时，任何一方均可向深圳市众银云测信息技术有限公司所在地的人民法院提起诉讼。</li>
            <li>7.7本注册协议中的标题仅为方便而设，不影响对于条款本身的解释。本注册协议最终解释权归深圳市众银云测信息技术有限公司所有。</li>
          </ol>
        </div>
        <style jsx global>{`
          body,html {
            margin:0;
            padding:0;
            width: 100%;
            height: 100%;
          }
          .content {
            padding: 24px 17px 26px 17px;
          }
          h1 {
            font-size:16px;
            font-weight:700;
            line-height: 20px;
            color:#3c3c3c;
            text-align:center;
            margin-bottom: 20px;
          }
          h2 {
            font-size: 14px;
            line-height: 18px;
            color:#3c3c3c;
            margin: 20px 0;
          }
          ol,li {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          li {
            font-size: 12px;
            color: rgb(100,100,100);
            line-height: 18px;
            margin-bottom:10px;
          }
          p {
            font-size: 12px;
            color: rgb(100,100,100);
            text-indent: 2em;
            line-height: 18px;
          }
        `}
      </style>
      </Layout>
    )
  }
}

export default ServiceContract;