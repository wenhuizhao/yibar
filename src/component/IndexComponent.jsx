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
import FeedBack from 'react-feedback-popup'
import './IndexComponent.css'

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
              <Typography variant="h5">
                Coronavirus Information Sites
              </Typography>
              <Box fontSize={14} m={2}>
                <List>
                <ListItem>
                  <ReactTinyLink
                    header="World Information"
                    cardSize="small"
                    showGraphic={true}
                    maxLine={4}
                    minLine={1}
                    width={"100vw"}
                    url="https://www.worldometers.info/coronavirus/"
                  />
                </ListItem>
                <ListItem>
                  <ReactTinyLink
                    header="Johns Hopkins University interactive map"
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
                    header="LA times California Coronavirus Data"
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    width={"100vw"}
                    url="https://www.latimes.com/projects/california-coronavirus-cases-tracking-outbreak/"
                  />
                </ListItem>

                <ListItem>
                  <ReactTinyLink
                    header="IHME COVID-19 Prediction Model"
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
                    header="Covid Tracking Project"
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
                    header="WHO Covid-19 Report"
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
                    header="Google COVID-19 Community Mobility Report"
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
                    header="1point3acres COVID-19 page(一亩三分地)"
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
                    header="Northern California County report"
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    width={"100vw"}
                    url="https://covid-19.direct"
                  />
                </ListItem>
                <ListItem>
                  <ReactTinyLink
                    header="Washington State Vulerability Index for Covid-19"
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    width={"100vw"}
                    url="http://chaselab.net/Covid19RiskMap/Covid19.htm"
                  />
                </ListItem>
                <ListItem>
                  <ReactTinyLink
                    header="Realtime Tracking of Coronavrius"
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    width={"100vw"}
                    url="https://nextstrain.org/ncov/global"
                  />
                </ListItem>
                <ListItem>
                  <ReactTinyLink
                    header="Health map for Coronavrius"
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    width={"100vw"}
                    url="https://www.healthmap.org/covid-19/"
                  />
                </ListItem>

                </List>
              </Box>
          </Box>

          <FeedBack
                position="right"
                showEmailInput={false}
                showNameInput={false}
                showRatingInput={false}
                headerText="Suggest a link"
                bodyText="You have a usefule coronavirus website to share?"
                buttonText="Suggest a Webiste"
                handleClose={() => console.log("handleclose")}
                handleSubmit={(data) => 
                    fetch('https://www.study32.com/feedbacks', {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'POST', // or 'PUT'
                        body: JSON.stringify(data),
                    }).then((response) => { 
                        if (!response.ok) {
                            return Promise.reject('Our servers are having issues! We couldn\'t send your feedback!');
                        }
                        response.json()
                    }).then(() => {
                        alert('Success!');
                    }).catch((error) => {
                        alert('Our servers are having issues! We couldn\'t send your feedback!', error);
                    })
                }
                handleButtonClick={() => console.log("handleButtonClick")}
            />
      </div>
    )
  }
}

export default IndexComponent
