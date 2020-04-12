import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import NavBar from './NavBar'
import { Typography } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import { ReactTinyLink } from 'react-tiny-link'

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
class IndexComponent extends Component {
  render() {
    const {value, setValue} = this.props
    return(
      <div>
        <NavBar value={value} setValue={setValue}/>
        <Box m={1}>
              <Typography variant="h4">
                Coronavirus information sites
              </Typography>
              <Box fontSize={14} m={2}>
                <List>
                <ListItem>
                  <ReactTinyLink
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    width={"100vw"}
                    url="https://www.worldometers.info/coronavirus/"
                  />
                </ListItem>
                <ListItem>
                  <ReactTinyLink
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    width={"100vw"}
                    url="https://coronavirus.jhu.edu/map.html"
                  />
                </ListItem>
                <ListItem>
                  <ReactTinyLink
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    width={"100vw"}
                    url="https://covid19.healthdata.org/united-states-of-america"
                  />
                </ListItem>
                <ListItem>
                  <ReactTinyLink
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    width={"100vw"}
                    url="https://covidtracking.com"
                  />
                </ListItem>
                <ListItem>
                  <ReactTinyLink
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    width={"100vw"}
                    url="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports"
                  />
                </ListItem>
                <ListItem>
                  <ReactTinyLink
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    width={"100vw"}
                    url="https://www.google.com/covid19/mobility/"
                  />
                </ListItem>
                <ListItem>
                  <ReactTinyLink
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    width={"100vw"}
                    url="https://coronavirus.1point3acres.com/"
                  />
                </ListItem>
                <ListItem>
                  <ReactTinyLink
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    width={"100vw"}
                    url="https://covid-19.direct"
                  />
                </ListItem>

                </List>
              </Box>
          </Box>    
      </div>
    )
  }
}

export default IndexComponent