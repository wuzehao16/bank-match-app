import Link from 'next/link'
import Head from 'next/head'
// import stylesheet from '../styles/antd-mobile.min.css'
import BottomNavigation from '../components/BottomNavigation'
export default ({ children, title = '众银云测' }) => (
  <div className='app'>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
          {/* <style dangerouslySetInnerHTML={{ __html: stylesheet }} /> */}
    </Head>
    {/* <header>

    </header> */}

    { children }

    <BottomNavigation/>
    <style jsx global>{`
      body {
        margin: 0;
      }
      .app{
        background-color: #f2f2f2;
      }
      p{
        font-size:12px;
      }
    `}
    </style>
  </div>
)
