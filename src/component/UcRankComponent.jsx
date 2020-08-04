import React, { Component } from 'react'
import NavBar from './NavBar'
import Iframe from 'react-iframe'

class UcRankComponent extends Component {
  render() {
    const {value, setValue} = this.props
    return(
      <div>
        <NavBar value={value} setValue={setValue}/>

        <Iframe url="http://api.yibar.com/rank"
                width="100%"
                height="100%"
                id="ucdata"
                className="UCData"
                display="initial"
                position="absolute"/>
      </div>
    )
  }
}
export default UcRankComponent;