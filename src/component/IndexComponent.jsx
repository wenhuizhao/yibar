import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid";
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
import LinkComponent from './LinkComponent'
import './IndexComponent.css'

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
class IndexComponent extends Component {
  render() {
    const {value, setValue} = this.props
    return (
      <div>
        <NavBar value={value} setValue={setValue} />
        <Box m={1}>
          <Typography variant="h5">Coronavirus Information Sites</Typography>
        </Box>
          <Grid container direction="row" spacing={5}>
            <LinkComponent
              header="Find COVID-19 Vaccines Near You"
              description="Find COVID-19 Vaccines Near You"
              image="/images/CovidVaccinLocator.png"
              url="https://vaccinefinder.org/search/"
            />
            <LinkComponent
              header="Johns Hopkins University interactive map"
              description="Coronavirus COVID-19 Global Cases by the Center for Systems Science \
              and Engineering (CSSE) at Johns Hopkins University (JHU)"
              image="/images/JohnsHopkins.png"
              url="https://coronavirus.jhu.edu/map.html"
            />
            <LinkComponent
              header="Google COVID-19 Interactive Map"
              description="Google COVID-19 tracking"
              image="/images/GoogleCovid.png"
              url="https://www.google.com/covid19-map"
            />
            <LinkComponent
              header="Facebook COVID-19 Interactive Map"
              description=""
              image="/images/FacebookCovid.png"
              url="https://covid-survey.dataforgood.fb.com"
            />
            <LinkComponent
              header="World Information"
              description="World Information"
              image="/images/Worldometer.png"
              url="https://www.worldometers.info/coronavirus"
            />
            <LinkComponent
              header="Tracking the coronavirus in California"
              description="LA times California Coronavirus Data"
              image="/images/LaTimesCovid.png"
              url="https://www.latimes.com/projects/california-coronavirus-cases-tracking-outbreak"
            />
            <LinkComponent
              header="HME COVID-19 Prediction Model"
              description=""
              image="/images/CovidPrediction.png"
              url="https://covid19.healthdata.org/united-states-of-america"
            />
            <LinkComponent
              header="WHO Covid-19 Report"
              description=""
              image="/images/CovidPrediction.png"
              url="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports"
            />
            <LinkComponent
              header="WHO Coronavirus (COVID-19) Dashboard"
              description=""
              image="/images/WHO.png"
              url="https://covid19.who.int/"
            />
            <LinkComponent
              header="1point3acres COVID-19 page(一亩三分地)"
              description="Real Time Updates & Digestable Information for Everyone"
              image="/images/1Point3Acres.png"
              url="https://coronavirus.1point3acres.com/"
            />
            <LinkComponent
              header="Health map for Coronavrius"
              description=""
              image="/images/HealthMap.png"
              url="https://www.healthmap.org/covid-19"
            />
        </Grid>
      </div>
    );
  }
}

export default IndexComponent
