import React from 'react'

class NoData extends React.PureComponent {
  render() {
    return (
      <div className="box">
        <section className="container">
          <div>
            <img src="static/nodata.png" height={200} width={200}/>
          </div>
          <span className="nodata">暂未数据~</span>
        </section>
        <style jsx>{`
          .box{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display:flex;
            align-items:center;
            justify-content:center;
          }
          .container{
            display:flex;
            align-items:center;
            justify-content:center;
            flex-direction: column;
          }
          .nodata{
            margin-top:10px;
          }
        `}</style>
      </div>

    )
  }
}
export default NoData;
