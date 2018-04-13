import Link from 'next/link'
import Head from 'next/head'
import Nprogress from '../components/Nprogress'
export default ({ children, title = '智能匹配' }) => (
  <div className='app'>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' />
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
        margin-right:5px;
        background: #f2f2f2;
        padding: 3px 5px 3px 3px;
        border-radius:3px;
        border:1px solid #ebebeb;
        color:#969696;
        font-size: 11px;
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
        top: 20px;
      }
      .ant-radio-button-wrapper-checked{
        background: #ee5648;
        color:#fff;
      }
      .ant-radio-button-input{
        opacity:0;
      }
      .btn{
        margin-top: 75px;
        text-align: center;
        padding-bottom: 30px;
      }
      p{
        font-size:16px;
      }
    `}
    </style>
  </div>
)
