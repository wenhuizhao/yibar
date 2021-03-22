import React from 'react';
import qs from 'qs';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NavBar from './NavBar'
import UcDataComponent from './UcDataComponent'
import UcRankComponent from './UcRankComponent';
import UcMapComponent from './UcMapComponent';
import SchoolAreaComponent from './SchoolAreaComponent';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
  }
}));

export default function UcComponent({ match, location }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const query = qs.parse(location.search.substring(1)); //remove ? in ?schoolId=xx
  console.log('location.search:', location.search, query);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <NavBar value={value} setValue={setValue} />

      <Toolbar position="static" color="default" className={classes.tab}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Graph" {...a11yProps(0)} />
          <Tab label="Rank" {...a11yProps(1)} />
          <Tab label="Map View" {...a11yProps(2)} />
          <Tab label="Attend Area" {...a11yProps(3)} />
        </Tabs>
      </Toolbar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <UcDataComponent query={query} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <UcRankComponent query={query} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <UcMapComponent query={query} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <SchoolAreaComponent query={query} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}