import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = '产品详情' }) => (
  <div className='app'>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' />
      <script src="https://cdn.bootcss.com/echarts/4.0.4/echarts.min.js"></script>
    </Head>
    {/* <header>
      <nav>
        <Link href='/'><a>Home</a></Link> |
        <Link href='/a'><a>About</a></Link> |
        <Link href='/b'><a>Contact</a></Link>
      </nav>
    </header> */}

    { children }

    {/* <footer>
      {'I`m here to stay'}
    </footer> */}
    <style jsx global>{`
      body {
        margin: 0;
      }
      .app{
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
      .ant-radio-button-wrapper-checked{
        background: #ee5648;
        color:#fff;
      }
      .ant-radio-button-input{
        opacity:0;
      }
      ol{
        -webkit-padding-start: 15px;
      }
      p{
        font-size:12px;
      }
      li{
        font-size:12px;
        -webkit-margin-before: 1em;
        -webkit-margin-after: 1em;
      }
    `}
    </style>
  </div>
)
