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
        {this.props.statusCode}
        {/* {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'} */}
          <span>服务器被劫走了</span>
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
