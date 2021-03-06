import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = '金融咨询' }) => (
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

    { children }

    {/* <footer>
      {'I`m here to stay'}
    </footer> */}
    <style jsx global>{`
      html{
        font-family: 'PingFangSC','STHeiti','Microsoft YaHei','Helvetica','Arial',sans-serif;
      }
      body {
        margin: 0;
      }
      .app{
        background-color: #f2f2f2;
      }
      h1,h2,h3{
        margin: 0;
      }
      p{
        margin: 0;
        padding: 0;
        border: 0;
        margin-top: 16px;
        color: #333;
        line-height: 18px;
        border: none;
        outline: none;
        max-height: 100%;
        word-wrap: break-word;
        color: #000;
      }
      @media screen and (min-width: 375px) {
        p{
          font-size: 17px;
          line-height: 27px;
        }
      }
      @media screen and (min-width: 360px) {
        p{
          font-size: 17px;
          line-height: 28px;
        }
      }
      @media screen and (min-width: 320px) {
        p{
          font-size: 16px;
          line-height: 25px;
        }
      }
      img{
        width:100%;
      }
    `}
    </style>
  </div>
)
