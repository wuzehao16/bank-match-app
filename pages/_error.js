import React from 'react'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    console.log(this.props)
    return (
      <p>
        {/* {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'} */}
          <div>
            <div >
              <img src="/static/error.png" alt="" height={180} width={200}/>

            </div>

            <div style={{marginTop:'20px'}}>{this.props.statusCode}服务器繁忙，请稍后再试~</div>
          </div>
          <style jsx>{`
            p{
              display: flex;
              align-items: center;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              justify-content: center;
            }
          `}</style>
      </p>
    )
  }
}
