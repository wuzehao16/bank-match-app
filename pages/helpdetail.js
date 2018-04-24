import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = '问题详情' }) => (
  <div className='helpdetail'>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' />
      {/* <script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script> */}
      {/* <script src="https://cdn.bootcss.com/echarts/4.0.4/echarts.min.js"></script> */}
    </Head>
    <article>
      <div>
        <p></p>
      </div>
    </article>
    {/* <footer>
      {'I`m here to stay'}
    </footer> */}
    <style jsx global>{`
      * {margin:0; padding:0}
      body,html {
        width: 100%;
        height: 100%;
      }
    `}
    </style>
  </div>
)
