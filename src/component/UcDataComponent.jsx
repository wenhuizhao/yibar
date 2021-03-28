import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NavBar from './NavBar'
import * as echarts from 'echarts'
import { API_URL, searchSchools, searchLocation, searchRace, processData, draw} from './graph_util'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import { VerticalAlignTop } from '@material-ui/icons';
import axios from 'axios';

const containerStyle = {
  padding: 10
}
const  formControlStyle = {
  margin: 5,
  minWidth: 120,
};
const  selectEmptyStyle = {
  marginTop: 10,
}
const chartStyle = {
  width: '100%',
  height: '500px'
}
class UcDataComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campusId: 2,
      categoryId: 1,
      top: 10,
      schoolOption: [],
      locationOption: [],
      locationValue: 'Bay Area'
    };
    this.locationData = [];
    this.schoolData = [];
    this.data = {};
    this.schools = [];
    this.location = "";
    this.locationType = "";
    this.races = ["all_races"];
    this.gData = {
      title: "",
      years: [],
      legend: [],
      series: [],
    };
  }

  clearRace(year, schoolName) {
    var serieData = this.gData.series.find((d) => d.name === "race data");
    if (serieData) {
      serieData.data = [];
      draw(this.chart, this.gData);
    }
  }
  clearChart() {
    this.gData.years = [];
    this.gData.series = [];
    this.schools = [];

    this.chart.clear();
  }

  async componentDidMount() {
    this.chart = echarts.init(document.getElementById("mainChart"));
    this.chart.on("click", async (params) => {
      //console.log("mainChart click", params);
      if (params.seriesType === "bar") {
        await searchRace(
          this.gData,
          this.schools,
          params["name"],
          params["seriesName"],
          this.state.campusId,
          this.state.categoryId,
          this.state.top
        );
        //console.log("gData", this.gData);
        draw(this.chart, this.gData);
      }
    });

    this.chart.on("mouseover", async (params) => {
      if (params.seriesType === "bar") {
        await searchRace(
          this.gData,
          this.schools,
          params["name"],
          params["seriesName"],
          this.state.campusId,
          this.state.categoryId,
          this.state.top
        );
        //console.log("gData", this.gData);
        draw(this.chart, this.gData);
      }
    });
    this.chart.on("mouseout", (params) => {
      //console.log("mainChart mouseout", params);
      this.clearRace(params["name"], params["seriesName"]);
    });
    if (this.props.query.schoolId) {
      this.schools.push(this.props.query);
      await searchSchools(
        this.gData,
        this.schools,
        this.state.campusId,
        this.state.categoryId,
        this.races,
        this.state.top
      );
      draw(this.chart, this.gData);
    }
  }

  componentDidUpdate = async (prevProps) => {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      if (this.props.query.schoolId) {
        this.schools.push(this.props.query);
        await searchSchools(
          this.gData,
          this.schools,
          this.state.campusId,
          this.state.categoryId,
          this.races,
          this.state.top
        );
        draw(this.chart, this.gData);
      }
    }
  }

  onChangeCampus = async (event) => {
    const campusId = event.target.value;
    this.setState({ campusId: campusId });
    await searchSchools(
      this.gData,
      this.schools,
      campusId,
      this.state.categoryId,
      this.races,
      this.state.top
    );
    draw(this.chart, this.gData);
  };
  onChangeCategory = async (event) => {
    const categoryId = event.target.value;
    this.setState({ categoryId: categoryId });
    await searchSchools(
      this.gData,
      this.schools,
      this.state.campusId,
      categoryId,
      this.races,
      this.state.top
    );
    draw(this.chart, this.gData);
  };
  onChangeRace = async (race) => {
    this.races = [race];
    await searchSchools(
      this.gData,
      this.schools,
      this.campusId,
      this.categoryId,
      this.races,
      this.top
    );
    draw(this.chart, this.gData);
  };
  onChangeTop = async (event) => {
    const top = event.target.value;
    this.chart.clear();
    this.setState({ top: top });
    await searchLocation(
      this.gData,
      this.schools,
      this.location,
      this.locationType,
      this.state.campusId,
      this.state.categoryId,
      this.races,
      top
    );
    draw(this.chart, this.gData);
  };

  onLocationInputChange = (event, value, reason) => {
    axios
      .get(`${API_URL}/enrollments/autocomplete_location.json`, {
        params: { term: value },
      })
      .then((resp) => {
        this.locationData = resp.data;
        this.setState({
          locationOption: resp.data.map((d) => d.label),
        });
      });
  };

  onLocationChange = async (event, value, reason) => {
    //console.log("location change to:", value);
    if (!value || value.length === 0) {
      return;
    }
    this.setState({locationValue: value});
    const loc = this.locationData.find((d) => d.label === value);
    if (!loc) {
      return;
    }
    this.location = loc.value;
    this.locationType = loc.type;
    await searchLocation(
      this.gData,
      this.schools,
      this.location,
      this.locationType,
      this.state.campusId,
      this.state.categoryId,
      this.races,
      this.state.top
    );
    //console.log(this.gData);
    draw(this.chart, this.gData);
  };

  onSchoolInputChange = (event, value, reason) => {
    axios
      .get(`${API_URL}/enrollments/autocomplete_school_name.json`, {
        params: { term: value },
      })
      .then((resp) => {
        this.schoolData = resp.data;
        this.setState({
          schoolOption: resp.data.map((d) => d.label),
        });
      });
  };

  onSchoolChange = async (event, value, reason) => {
    if (!value || value.length === 0) {
      return;
    }
    const sch = this.schoolData.find((d) => d.label === value);
    if (!sch) {
      return;
    }
    this.schoolId = sch.id;
    await this.addSchool(sch.id, sch.value);
    //console.log(this.gData);
    draw(this.chart, this.gData);
  };

  addSchool = async (schoolId, schoolName) => {
    const school = {
      schoolId: schoolId,
      schoolName: schoolName,
    };
    if (this.schools.find((s) => s.schoolId === school.schoolId)) {
      return;
    }
    //console.log(school);
    this.schools.push(school);
    await searchSchools(
      this.gData,
      this.schools,
      this.state.campusId,
      this.state.categoryId,
      this.races,
      this.state.top
    );
  };

  render() {
    const { value, setValue, query } = this.props;
    //console.log("render query:", query);
    return (
      <div>
        <Grid container direction="column" style={containerStyle}>
          <Grid container item>
            <Typography variant="h5">
              Search University of California application and admission data by
              city, county or high schools (Data Source: California Education
              Department).
            </Typography>
          </Grid>
          <Grid container item justify="flex-end">
            <FormControl style={formControlStyle}>
              <InputLabel>Type</InputLabel>
              <Select
                id="category-select"
                value={this.state.categoryId}
                onChange={this.onChangeCategory}
              >
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={0}>Apply</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={formControlStyle}>
              <InputLabel>Campus</InputLabel>
              <Select
                id="campus-select"
                value={this.state.campusId}
                onChange={this.onChangeCampus}
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
            <FormControl style={formControlStyle}>
              <InputLabel>Top</InputLabel>
              <Select
                id="top"
                value={this.state.top}
                onChange={this.onChangeTop}
              >
                <MenuItem value={5}>Top 5</MenuItem>
                <MenuItem value={10}>Top 10</MenuItem>
                <MenuItem value={20}>Top 20 </MenuItem>
                <MenuItem value={50}>Top 50</MenuItem>
                <MenuItem value={100}>Top 100</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container item justify="space-around" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={this.state.locationOption}
                onChange={this.onLocationChange}
                onInputChange={this.onLocationInputChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={this.state.locationValue}
                    label="city/county/zip"
                    margin="normal"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={this.state.schoolOption}
                onChange={this.onSchoolChange}
                onInputChange={this.onSchoolInputChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="school"
                    margin="normal"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
          <div id="mainChart" style={chartStyle} />
        </Grid>
      </div>
    );
  }
}
export default UcDataComponent;