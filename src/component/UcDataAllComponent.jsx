import React, { Component } from 'react'
import NavBar from './NavBar'
import IframeResizer from 'iframe-resizer-react'

class UcDataAllComponent extends Component {
  render() {
    const {value, setValue} = this.props
    return(
      <div>
        <NavBar value={value} setValue={setValue}/>

        <IframeResizer src="https://api.yibar.com" width="100%" height="100%"/>
      </div>
    )
  }
}
export default UcDataAllComponent;