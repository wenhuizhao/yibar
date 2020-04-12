import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import NavBar from './NavBar'
import { Typography } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
class AboutComponent extends Component {
  render() {
    const {value, setValue} = this.props
    return(
      <div>
        <NavBar value={value} setValue={setValue}/>
        <Box m={1}>

              <Box fontSize={18} m={2}>
                Yibar.com is a site with coronavirus related links. It also provides COVID-19 data visualization. The data is provided by 
                <a href="https://covidtracking.com/"> The COVID Tracking Project. </a>
              </Box>
              <Typography variant="h5">
                How "The COVID Tracking Project" collect data?
              </Typography>
              <Box fontSize={14} m={2}>
                "All our information comes from state/district/territory public health authorities—or, occasionally,
                from trusted news reporting, official press conferences, or (very occasionally) tweets or Facebook 
                updates from state public health authorities or governors. We cite all sources in the spreadsheet 
                and discuss the dataset’s constantly fluctuating oddities in the annotations that accompany each 
                state’s data on our website and in the spreadsheet."  -- from "The COVID Tracking Project"
              </Box>
          </Box>    
      </div>
    )
  }
}

export default AboutComponent