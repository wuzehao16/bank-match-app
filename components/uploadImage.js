import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { uploadImage } from '../services/recruit'

const Wrapper = styled.div`
  position: relative;
  width: 280px;
  height: 150px;
  background-color: #e4e4e4;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  overflow: hidden;
`
class UploadImage extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      value: props.value
    }
  }
  componentDidMount() {
    console.log(this.state)
  }
  onChange = (e) => {
    // files = e.target.file
    console.log(e.target.file)
    if (e.target.files[0]) {
      this.upload(e.target.files[0])
      return
    }
    // this.setState({
    //   files,
    // });
  }
  async upload(f) {
    let data = new FormData()
    data.append('file', f)
    const res = await uploadImage(data)
    if (res.code == 0) {
      this.setState({
        value:res.data
       });
    }
  }
  render () {
    const Img =(
      <img className="img" src={this.state.value} alt="" height={150} width={280}/>
    )
    const uploadButton = (
      <div>
        {/* <Icon type={this.state.loading ? 'loading' : 'plus'} /> */}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
          <Wrapper >
            <input onChange={this.onChange} className="input" type="file" />
            {this.state.value?Img:uploadButton}
            <style jsx >{`
              .input{
                  position:absolute;
                  right: 0px;
                  top: 0px;
                  height:100%;
                  width:100%;
                  opacity: 0;
                  // -ms-filter: 'alpha(opacity=0)';
                  font-size: 200px;
              }
            `}
            </style>
          </Wrapper>
    )
  }
}



export default UploadImage;
