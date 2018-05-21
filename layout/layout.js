import Link from 'next/link'
import Head from 'next/head'
import Nprogress from '../components/Nprogress'
export default ({ children, title = '智能匹配' }) => (
  <div className='app'>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      {/* <script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script> */}
      {/* <script src="https://cdn.bootcss.com/echarts/4.0.4/echarts.min.js"></script> */}
    </Head>
    {/* <header>
      <nav>
        <Link href='/'><a>Home</a></Link> |
        <Link href='/a'><a>About</a></Link> |
        <Link href='/b'><a>Contact</a></Link>
      </nav>
    </header> */}
    <Nprogress />
    { children }

    {/* <footer>
      {'I`m here to stay'}
    </footer> */}
    <style jsx global>{`
      body {
        margin: 0;
      }
      html{
        height:100%;
        background-color: #f2f2f2;
      }
      .ant-radio-button-wrapper{
        margin-right: 5px;
        margin-bottom: 10px;
        background: #f2f2f2;
        border-radius: 4px;
        border: 1px solid #ebebeb;
        color: #969696;
        font-size: 13px;
        width: 80px;
        height: 28px;
        display: inline-block;
        line-height: 26px;
        text-align: center;
      }
      @media screen and (min-width: 320px){
        .ant-radio-button-wrapper{
          margin-right: 4px;
          font-size: 10px;
          width: 68px;
          height: 28px;
        }
      }
      @media screen and (min-width: 360px){
        .ant-radio-button-wrapper{
          margin-right: 4px;
          font-size: 12px;
          width: 77px;
          height: 28px;
        }
      }
      @media screen and (min-width: 375px){
        .ant-radio-button-wrapper{
          margin-right: 5px;
          margin-bottom: 10px;
          width: 80px;
          font-size: 13px;
          height: 28px;
          line-height: 26px;
        }
      }
      .ant-radio-button-wrapper input[type="radio"] {
          opacity: 0;
          width: 0;
          height: 0;
      }
      .ant-radio-button{
        display:none;
      }
      .ant-radio-button-wrapper span{

      }
      .ant-form-explain{
        font-size:10px;
        color:red;
        position: absolute;
        width: 200px;
        left: 0px;
        top: 25px;
      }
      .ant-radio-button-wrapper-checked{
        background: #ee5648;
        color:#fff;
      }
      .ant-radio-button-input{
        opacity:0;
      }
      .btn{
        text-align: center;
        background:#e4e4e4;
        padding:5px 15px;
        width:100%;
        position:fixed;
        bottom:0;
      }
      p{
        font-size:16px;
        color: #3c3c3c;
      }
    `}
    </style>
  </div>
)
