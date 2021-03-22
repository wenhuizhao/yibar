import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import axios from 'axios';
import { API_URL, searchLocationRank } from './graph_util'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: 5,
    minWidth: 120,
  },
}));

// const rows: GridRowsProp = [
//   { id: 1, col1: 'Hello', col2: 'World' },
//   { id: 2, col1: 'XGrid', col2: 'is Awesome' },
//   { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
// ];

const columns: GridColDef[] = [
  { headerName: 'index', field: 'index' },
  { headerName: 'School', field: 'school', width: 200 },
  { headerName: "Adm", field: 'adm'},
  { headerName: "App", field: 'app'},
  { headerName: "Total", field: 'gr_12'},
  { headerName: "Adm/Total%", field: 'admitted_rate'},
  { headerName: "City", field: "city", width: 150},

];

const yearStart = 1990;
const yearEnd = 2020;
let currentYear = yearEnd
let years = Array(yearEnd-yearStart+1)
    .fill()
    .map(() => currentYear--);

export default function UcRankComponent() {
  const classes = useStyles();
  const [campusId, setCampusId] = useState(2);
  const [year, setYear] = useState(yearEnd);
  const [locationValue, setLocationValue] = useState('Bay Area');
  const [locationInputValue, setLocationInputValue] = useState('Bay Area');
  const [locationOption, setLocationOption] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [location, setLocation] = useState('Bay Area');
  const [locationType, setLocationType] = useState('metro');
  const [rows, setRows] = useState([]);

  const getRankData = async () => {
    const data = await searchLocationRank(campusId, location, locationType, yearEnd);
    setRows(data)
  };
  useEffect(() => {
    getRankData();
  }, []);

  const onChangeCampus = async (event) => {
    const selectedCampusId = event.target.value;
    setCampusId(selectedCampusId);
    console.log("onChangeCampusId:", selectedCampusId);
    const data = await searchLocationRank(selectedCampusId, location, locationType, year);
    console.log(data);
    setRows(data);

  }

  const onChangeYear = async (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
    console.log("onChangeYear:", selectedYear);
    const data = await searchLocationRank(campusId, location, locationType, selectedYear);
    console.log(data);
    setRows(data);

  }

  const onLocationInputChange = (event, value, reason) => {
    console.log('onLocationInputChange:', value);
    setLocationInputValue(value)
    axios.get(`${API_URL}/enrollments/autocomplete_location.json`, { params: { term: value } })
      .then((resp) => {
        if (resp.data.length > 0) {
          setLocationOption(resp.data.map((d) => d.label));
          setLocationData(resp.data);
          console.log('set locationData,', locationData);  
        }
      })
  }

  const onLocationChange = async (event, value, reason) => {
    console.log('location change to:', value, ' locationData:', locationData);
    if (!value || value.length === 0) {
      return;
    }
    const loc = locationData.find((d)=> d.label === value);
    if (!loc) {
      return;
    }
    setLocationValue(value);
    setLocation(loc.value);
    setLocationType(loc.type);
    console.log('location:', loc.value, ' locationType:', loc.type);
    const data = await searchLocationRank(campusId, loc.value, loc.type, year);
    console.log(data);
    setRows(data);
  }

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid container item style={{padding: '4px'}}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={locationOption}
            value={locationValue}
            onChange={onLocationChange}
            inputValue={locationInputValue}
            onInputChange={onLocationInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="city/county/zip"
                margin="normal"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item container xs={12} sm={6} justify="space-around">
          <FormControl className={classes.formControl}>
            <InputLabel>Campus</InputLabel>
            <Select
              id="campus-select"
              value={campusId}
              onChange={onChangeCampus}
            >
              <MenuItem value={1}>All Campus</MenuItem>
              <MenuItem value={2}>Berkeley</MenuItem>
              <MenuItem value={4}>Los Angeles</MenuItem>
              <MenuItem value={6}>San Diego</MenuItem>
              <MenuItem value={7}>Irvine</MenuItem>
              <MenuItem value={9}>Santa Barbara</MenuItem>
              <MenuItem value={3}>Davis</MenuItem>
              <MenuItem value={10}>Santa Cruz</MenuItem>
              <MenuItem value={5}>Riverside</MenuItem>
              <MenuItem value={8}>Merced</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Year</InputLabel>
            <Select id="year-select" value={year} onChange={onChangeYear}>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid style={{ height: 800, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </Grid>
    </Grid>
  );
};