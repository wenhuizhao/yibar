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
        <Box m={1} style={{padding: '15px', fontFamily: 'Georgia, serif'}}>
        <Typography variant="h6">
                What is yibar.com?
              </Typography>
              <Box fontSize={18} m={2}>
                Yibar is a site for information virtualization. It has interactive graph for University of California Admission data, COVID19 data and etc.
                UC admission data is provided by <a href="https://admission.universityofcalifornia.edu/">
                  University of California Admission
                </a>. 
                 COVID19 data is provided by 
                <a href="https://covidtracking.com/"> The COVID Tracking Project. </a>
              </Box>
              <Typography variant="h6">
                How "The COVID Tracking Project" collect data?
              </Typography>
              <Box fontSize={16} m={2}>
                "All our information comes from state/district/territory public health authorities—or, occasionally,
                from trusted news reporting, official press conferences, or (very occasionally) tweets or Facebook 
                updates from state public health authorities or governors. We cite all sources in the spreadsheet 
                and discuss the dataset’s constantly fluctuating oddities in the annotations that accompany each 
                state’s data on our website and in the spreadsheet."  -- from "The COVID Tracking Project"
              </Box>

              <Typography variant="h6">
                How is University of California Admission data is collected?
              </Typography>
              <Box fontSize={16} m={2}>
                The University of California Admission data is from official University of California 
                published data. 
              </Box>
          </Box>    
      </div>
    )
  }
}

export default AboutComponent