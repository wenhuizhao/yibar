import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import echarts from 'echarts'
import axios from 'axios'
import moment from 'moment'
import { statesHash, statesReverseHash } from './states_hash'
import NavBar from './NavBar'

class HomeComponent extends Component {
  constructor(props) {
    super(props)
    this.usDailyData = [];
    this.stateDailyData = [];
    this.stateCurrent = {};
    this.stateDailyLast = [];
    this.state = {
      current: {},
      selectedState: 'US',
      stateCurrentData: [],
      stateInfo: {},
      matches: window.matchMedia("(min-width:675px").matches
    }
  }

  componentDidMount() {
    this.chart1 = echarts.init(document.getElementById('main1'))
    this.chart2 = echarts.init(document.getElementById('main2'))

    this.loadUsCurrent()
    this.loadUsDaily()
    this.loadStateDaily()
    this.loadStateInfo()
    this.loadUsMap()
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 675px)").addListener(handler);
  }

  loadUsCurrent() {
    axios.get('https://covidtracking.com/api/us')
        .then((resp) => {
          const data = resp.data[0];
          this.setState({
            current: data
          })
        })
  }
  loadUsDaily() {
    axios.get('https://covidtracking.com/api/us/daily')
      .then((resp) => {
        //console.log(resp)
        this.usDailyData = resp.data.reverse()
        this.draw(this.usDailyData)
      })
  }
  loadStateDaily() {
    axios.get('https://covidtracking.com/api/states/daily')
      .then((resp) => {
        //console.log(resp.data)
        const today = resp.data[0].date
        this.stateDailyLast = resp.data.filter((d)=> d.date === today).reduce((obj, item)=>{
          obj[item.state] = item
          return obj
        }, {})
        const stateCurrentData = this.state.stateCurrentData.map((d)=> {
          return {
            ...d,
            positiveIncrease: this.stateDailyLast[d.state].positiveIncrease,
            hospitalizedIncrease: this.stateDailyLast[d.state].hospitalizedIncrease,
            deathIncrease: this.stateDailyLast[d.state].deathIncrease,
            totalTestResultsIncrease: this.stateDailyLast[d.state].totalTestResultsIncrease,
          }
        })
        this.setState({stateCurrentData: stateCurrentData})
        //console.log(stateCurrentData)
        this.stateDailyData = resp.data
      })
  }
  loadStateInfo() {
    axios.get('https://covidtracking.com/api/states/info')
      .then((resp)=>{
        const stateInfo = resp.data.reduce((obj, item)=>{
          obj[item.state] = item;
          return obj;
        }, {})
        this.setState({stateInfo: stateInfo})
      })
  }
  loadUsMap() {
    axios.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95368/USA_geo.json')
      .then((usaJson) => {
        echarts.registerMap('USA', usaJson.data, {
          Alaska: {              // 把阿拉斯加移到美国主大陆左下方
              left: -131,
              top: 25,
              width: 15
          },
          Hawaii: {
              left: -110,        // 夏威夷
              top: 28,
              width: 5
          },
          'Puerto Rico': {       // 波多黎各
              left: -76,
              top: 26,
              width: 2
          }
        });

        axios.get('https://covidtracking.com/api/states')
          .then((resp)=>{
            let min = 1000000
            let max = 0
            const stateCurrentDataSorted = resp.data.sort((a,b)=>b.positive - a.positive).map((d)=>{
              return {
                ...d,
                positiveIncrease: (this.stateDailyLast[d.state] || {}).positiveIncrease,
                hospitalizedIncrease: (this.stateDailyLast[d.state] || {}).hospitalizedIncrease,
                deathIncrease: (this.stateDailyLast[d.state] || {}).deathIncrease,
                totalTestResultsIncrease: (this.stateDailyLast[d.state] || {}).totalTestResultsIncrease,    
              }
            })
            this.setState({
              stateCurrentData: stateCurrentDataSorted
            })
            this.stateCurrent = resp.data.reduce((obj, item)=>{
              obj[item.state] = item
              if (item.positive < min) {
                min = item.positive
              }
              if (item.positive > max) {
                max = item.positive
              }
              return obj
              }, {})
              //console.log(this.stateCurrent)
              const option = {
                title: {
                    text: 'Corvid19 US',
                },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: (params) => {
                        //console.log(params)
                        var value = (params.value + '').split('.');
                        value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                        const stateKey = statesReverseHash[params.name];
                        const statePending = this.stateCurrent[stateKey].pending ? 
                          'Pending: ' + this.stateCurrent[stateKey].pending + '<br/>' : '';
                        const stateHospitalized = this.stateCurrent[stateKey].hospitalized ?
                          'Hospitalized: '+ this.stateCurrent[stateKey].hospitalized + '<br/>' : '';
                        return params.name + '<br/>' +
                          'Tested: ' + this.stateCurrent[stateKey].totalTestResults + '<br/>' +
                          'Positive: ' + value + '(+'+ this.stateDailyLast[stateKey].positiveIncrease+')<br/>' +
                          statePending + 
                          stateHospitalized +
                          'Death: ' + this.stateCurrent[stateKey].death + '(+' + this.stateDailyLast[stateKey].deathIncrease+')';
                    }
                },
                visualMap: {
                    left: 'right',
                    min: min,
                    max: max,
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    },
                    text: ['High', 'Low'],           // 文本，默认为数值文本
                    calculable: true
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'top',
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                    }
                },
                series: [
                    {
                        name: 'USA PopEstimates',
                        type: 'map',
                        roam: true,
                        map: 'USA',
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        // 文本位置修正
                        textFixed: {
                            Alaska: [20, -20]
                        },
                        data:[
                            {name: 'Alabama', value: this.stateCurrent.AL.positive},
                            {name: 'Alaska', value: this.stateCurrent.AK.positive},
                            {name: 'Arizona', value: this.stateCurrent.AZ.positive},
                            {name: 'Arkansas', value: this.stateCurrent.AR.positive},
                            {name: 'California', value: this.stateCurrent.CA.positive},
                            {name: 'Colorado', value: this.stateCurrent.CO.positive},
                            {name: 'Connecticut', value: this.stateCurrent.CT.positive},
                            {name: 'Delaware', value: this.stateCurrent.DE.positive},
                            {name: 'District of Columbia', value: this.stateCurrent.DC.positive},
                            {name: 'Florida', value: this.stateCurrent.FL.positive},
                            {name: 'Georgia', value: this.stateCurrent.GA.positive},
                            {name: 'Hawaii', value: this.stateCurrent.HI.positive},
                            {name: 'Idaho', value: this.stateCurrent.ID.positive},
                            {name: 'Illinois', value: this.stateCurrent.IL.positive},
                            {name: 'Indiana', value: this.stateCurrent.IN.positive},
                            {name: 'Iowa', value: this.stateCurrent.IA.positive},
                            {name: 'Kansas', value: this.stateCurrent.KS.positive},
                            {name: 'Kentucky', value: this.stateCurrent.KY.positive},
                            {name: 'Louisiana', value: this.stateCurrent.LA.positive},
                            {name: 'Maine', value: this.stateCurrent.ME.positive},
                            {name: 'Maryland', value: this.stateCurrent.MD.positive},
                            {name: 'Massachusetts', value: this.stateCurrent.MA.positive},
                            {name: 'Michigan', value: this.stateCurrent.MI.positive},
                            {name: 'Minnesota', value: this.stateCurrent.MN.positive},
                            {name: 'Mississippi', value: this.stateCurrent.MS.positive},
                            {name: 'Missouri', value: this.stateCurrent.MO.positive},
                            {name: 'Montana', value: this.stateCurrent.MT.positive},
                            {name: 'Nebraska', value: this.stateCurrent.NE.positive},
                            {name: 'Nevada', value: this.stateCurrent.NV.positive},
                            {name: 'New Hampshire', value: this.stateCurrent.NH.positive},
                            {name: 'New Jersey', value: this.stateCurrent.NJ.positive},
                            {name: 'New Mexico', value: this.stateCurrent.NM.positive},
                            {name: 'New York', value: this.stateCurrent.NY.positive},
                            {name: 'North Carolina', value: this.stateCurrent.NC.positive},
                            {name: 'North Dakota', value: this.stateCurrent.ND.positive},
                            {name: 'Ohio', value: this.stateCurrent.OH.positive},
                            {name: 'Oklahoma', value: this.stateCurrent.OK.positive},
                            {name: 'Oregon', value: this.stateCurrent.OR.positive},
                            {name: 'Pennsylvania', value: this.stateCurrent.PA.positive},
                            {name: 'Rhode Island', value: this.stateCurrent.RI.positive},
                            {name: 'South Carolina', value: this.stateCurrent.SC.positive},
                            {name: 'South Dakota', value: this.stateCurrent.SD.positive},
                            {name: 'Tennessee', value: this.stateCurrent.TN.positive},
                            {name: 'Texas', value: this.stateCurrent.TX.positive},
                            {name: 'Utah', value: this.stateCurrent.UT.positive},
                            {name: 'Vermont', value: this.stateCurrent.VT.positive},
                            {name: 'Virginia', value: this.stateCurrent.VA.positive},
                            {name: 'Washington', value: this.stateCurrent.WA.positive},
                            {name: 'West Virginia', value: this.stateCurrent.WV.positive},
                            {name: 'Wisconsin', value: this.stateCurrent.WI.positive},
                            {name: 'Wyoming', value: this.stateCurrent.WY.positive},
                            {name: 'Puerto Rico', value: this.stateCurrent.PR.positive}
                        ]
                    }
                ]
              };
              //console.log(option)
              this.chart2.setOption(option)
            })        
        })
    
  }
  
  handleChange(event){
    //console.log(this.state.stateDailyData)
    this.setState({selectedState: event.target.value})
    if (event.target.value === 'US') {
      this.loadUsCurrent()
      this.loadUsDaily()
      return
    }
    this.setState({current: this.state.stateCurrentData.find((d)=>d.state===event.target.value)})
    const data = this.stateDailyData.filter((d)=> d.state === event.target.value).reverse()
    //console.log(data)
    this.draw(data)
  }
  draw(data) {
    this.chart1.setOption({
      title: {
        text: ''
      },
      legend: {},
      tooltip: {},
      xAxis: {
          data: data.map((d)=> moment(d.date, 'YYYYMMDD').format('l'))
      },
      yAxis: {
        axisLabel: {
          formatter: (value) => {return value/1000+'k'}
        }
      },
      dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 0,      // 左边在 10% 的位置。
            end: 100         // 右边在 100% 的位置。
        },
      ],  
      series: [
        {
          name: 'Confirmed',
          type: 'line',
          data: data.map((d)=>d.positive)
        },
        {
          name: 'Confirmed Increased',
          type: 'line',
          data: data.map((d)=>d.positiveIncrease)
        },
        {
          name: 'Death',
          type: 'line',
          data: data.map((d) => d.death)
        },
        {
          name: 'Death Increased',
          type: 'line',
          data: data.map((d) => d.deathIncrease)
        },
        {
          name: 'Hospitalized',
          type: 'line',
          data: data.map((d)=>d.hospitalized)
        },
        {
          name: 'HospitalizedIncrease',
          type: 'line',
          data: data.map((d)=>d.hospitalizedIncrease)
        },
        {
          name: 'Tested',
          type: 'line',
          data: data.map((d)=>d.totalTestResults)
        },
        {
          name: 'Tested Increase',
          type: 'line',
          data: data.map((d)=>d.totalTestResultsIncrease)
        }
      ]
    })
  }
  handleClick(field) {
    const data = this.state.stateCurrentData.sort((a,b)=>b[field]-a[field])
    this.setState({stateCurrentData: data})
  }
  render() {
    console.log('Home Component: props', this.props)
    const {value, setValue} = this.props
    return(
      <div style={style}>
        <NavBar value={value} setValue={setValue}/>
        <div style={topStyle}>
          <Grid container spacing={2} justify="space-around" alignItems="flex-end">
            <Grid item container xs={10} sm={4} direction="column" alignItems='flex-start'>
              <Grid item>
                <Typography variant='body1'>{this.state.selectedState === 'US' ? 'US' : 
                  statesHash[this.state.selectedState]}</Typography>
              </Grid>
              <Grid item container justify="flex-start" spacing={5} >
                <Grid item>
                  <Typography variant="h4" style={cardTitleStyle}>
                    {this.state.current.positive}
                  </Typography>
                  <Typography variant="body2">
                    Confirmed
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4" style={cardTitleStyle}>
                    {this.state.current.death}
                  </Typography>
                  <Typography variant="body2">
                    Death
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} style={formGrid}>
              <FormControl style={formControl}>
                <InputLabel>State</InputLabel>
                <Select onChange={this.handleChange.bind(this)} value={this.state.selectedState}>
                  <MenuItem key='US' value='US'>US</MenuItem>
                  {Object.keys(statesHash).map(key=>(
                    <MenuItem key={key} value={key}>{key}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>            
        </div>
        <div id="main1" style={main1Style} ></div>
        <div id="main2" style={main2Style} ></div>
        <Grid item xs={12} style={tableGridStyle}>
          <Table aria-label="simple table" style={tableStyle}>
            <TableHead style={tableHead}>
              <TableRow>
                <TableCell  style={cellHead}>State</TableCell>
                <TableCell  style={cellHeadRed} onClick={()=>this.handleClick('death')}>Death</TableCell>
                <TableCell  style={cellHeadRed} onClick={()=>this.handleClick('deathIncrease')}>Death Increase</TableCell>
                <TableCell  style={cellHead} onClick={()=>this.handleClick('positive')}>Positive</TableCell>
                <TableCell  style={cellHead} onClick={()=>this.handleClick('positiveIncrease')}>Positive Increase</TableCell>
                {this.state.matches && <TableCell  style={cellHead} onClick={()=>this.handleClick('hospitalized')}>Hospitalized</TableCell>}
                {this.state.matches && <TableCell  style={cellHead} onClick={()=>this.handleClick('total')}>Tested</TableCell>}
                {this.state.matches && <TableCell style={tableHead}>Website</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.stateCurrentData.map(row => (
                <TableRow key={row.state}>
                  <TableCell component="th" scope="row">{row.state}</TableCell>
                  <TableCell style={cellRed}>{row.death}</TableCell>
                  <TableCell style={cellRed}>+{row.deathIncrease}</TableCell>
                  <TableCell>{row.positive}</TableCell>
                  <TableCell>+{row.positiveIncrease}</TableCell>
                  {this.state.matches && <TableCell>{row.hospitalized}</TableCell>}
                  {this.state.matches && <TableCell>{row.totalTestResults}</TableCell>}
                  {this.state.matches && <TableCell>
                    <Link href={(this.state.stateInfo[row.state]||{}).covid19Site}>State site</Link>
                    {(this.state.stateInfo[row.state]||{}).covid19SiteSecondary ?
                      <Link href={(this.state.stateInfo[row.state]||{}).covid19SiteSecondary}>, Secondary</Link>
                      : null
                    }
                  </TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </div>
    )
  }
}

const style ={
  // width: "100%",
  // height: "640px",
  display: "flex",
  flexDirection: "column",
  minHeight: "90vh",
}
const topStyle = {
  display: "flex",
  flexDirection: 'row',
  justifyContent: 'space-between',
  textAlign: 'center',
  margin: "10px"
}
const main1Style = {
 // flex: 1
  minHeight: "40vh"
}
const main2Style = {
//  flex: 1
  minHeight: "40vh"
}
const formGrid = {
  minWidth: "120px"
}
const tableGridStyle = {
  minHeight: "90vh"
}
const tableStyle = {
  width: "100%"
}
const tableHead = {
  backgroundColor: '#eee',
}
const cellHead = {
  fontWeight: 'bold',
  fontSize: '9pt'
}
const cellHeadRed = {
  fontWeight: 'bold',
  backgroundColor: '#eecccc',
  fontSize: '9pt'
}
const cellRed = {
  backgroundColor: '#eecccc',
  fontSize: '9pt',
}
const cardStyle = {
  backgroundColor: '#ccc',
  borderRadius: '5px',
}

const cardTitleStyle = {
  color: "#026f90"
}
const formControl = {
  margin: '5px',
  minWidth: 120,
}

export default HomeComponent