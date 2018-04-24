import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = '官方微信' }) => (
  <div className='wechat'>
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

    { children }

    {/* <footer>
      {'I`m here to stay'}
    </footer> */}
    <style jsx global>{`
      body {
        margin: 0;
      }
      .wechat{
        background-color: #f2f2f2;
      }
      p{
        font-size:12px;
      }
    `}
    </style>
  </div>
)
