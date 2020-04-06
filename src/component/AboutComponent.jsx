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
                Yibar.com provides COVID-19 data visualization. The data is provided by 
                <a href="https://covidtracking.com/"> The COVID Tracking Project. </a>
              </Box>
              <Typography variant="h4">
                Coronavirus informatin sites
              </Typography>
              <Box fontSize={14} m={2}>
                <List>
                  <ListItemLink href="https://www.worldometers.info/coronavirus/">Wordometer world information</ListItemLink>
                  <ListItemLink href="https://coronavirus.jhu.edu/">John Hopkins University Coronavirus site</ListItemLink>
                  <ListItemLink href="http://www.healthdata.org/">Heathdata.org prediction model </ListItemLink>
                  <ListItemLink href="https://covidtracking.com">The Covid Tacking Project</ListItemLink>
                  <ListItemLink href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports">
                    World Health Organization Reports
                  </ListItemLink>
                  <ListItemLink href="https://www.google.com/covid19/mobility/">
                    Google Covid-19 Community Mobility map
                  </ListItemLink>
                  <ListItemLink href="https://coronavirus.1point3acres.com/">1point3acres coronavirus information</ListItemLink>
                  <ListItemLink href="https://covid-19.direct">Bay Area Covid-19 data</ListItemLink>
                </List>
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