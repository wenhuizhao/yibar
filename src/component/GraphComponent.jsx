import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import echarts from 'echarts'
import NavBar from './NavBar'
class GraphComponent extends Component {

  componentDidMount() {
    this.draw()
  }

  draw() {
    let chart = echarts.init(document.getElementById('main'))
    chart.setOption({
      title: {
        text: 'ECharts entry example'
      },
      tooltip: {},
      xAxis: {
          data: ['shirt', 'cardign', 'chiffon shirt', 'pants', 'heels', 'socks']
      },
      yAxis: {},
      series: [{
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
    })
  }
  render() {
    const {value, setValue} = this.props
    return(
      <div>
        <NavBar value={value} setValue={setValue}/>
        <div id="main" style={style}>test</div>
      </div>
    )
  }
}

const style ={
  // width: "100%",
  // height: "640px",
  display: "flex",
  'flexDirection': "column",
  'minHeight': "90vh",
}

export default GraphComponent