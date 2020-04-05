import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import NavBar from './NavBar'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'

class AboutComponent extends Component {
  render() {
    const {value, setValue} = this.props
    return(
      <div>
        <NavBar value={value} setValue={setValue}/>
            <Typography variant="h4">
              About
            </Typography>

              <Box fontSize={18} m={2}>
                Yibar.com provides COVID-19 data visualization. The data is provided by 
                <a href="https://covidtracking.com/">The COVID Tracking Project. </a>
              </Box>
              <Typography variant="h5">
                How data is collected?
              </Typography>
              <Box fontSize={18} m={2}>
                All our information comes from state/district/territory public health authorities—or, occasionally, from trusted news reporting, official press conferences, or (very occasionally) tweets or Facebook updates from state public health authorities or governors. We cite all sources in the spreadsheet and discuss the dataset’s constantly fluctuating oddities in the annotations that accompany each state’s data on our website and in the spreadsheet.
              </Box>
              <Typography variant="h5">
                How trustworthy are the data?
              </Typography>
              <Box fontSize={18} m={2}>
              Because we get the bulk of our data directly from state public health authorities, we’re as reliable as they are, though we don’t have a live feed, so our numbers can be a few hours behind. States, however, report their numbers in inconsistent ways, which makes working with this dataset a bit complicated. Some states, like Oregon, provide the full set of numbers we track: the total number of tests conducted, breaking out positive, negative, and pending tests. For these states, we can provide data stretching through time, so they are maximally useful.
              <br/><br/>
              Other states provide some or none of these numbers on an ongoing basis. Some crucial states in this outbreak, notably California, Washington, and New York, have not been regularly reporting their total number of people tested. For these, we have to use other reporting tools: directly asking state officials, watching news conferences, gleaning information from trusted news sources, and whatever else it takes to present reliable numbers. Our hope is that all the states will begin providing comprehensive statistics, including negatives and totals from commercial and university labs.
              <br/><br/>
              Each state has a data-quality grade associated with it based on the reliability of their reporting. This grading system is described below.
              </Box>
              
      </div>
    )
  }
}

export default AboutComponent