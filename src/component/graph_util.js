import axios from 'axios';

const AUTH_TOKEN = "token";
const GOOGLE_MAP_API_KEY = 'AIzaSyBaUGdx3nt-x6-X3NZgmJAQ1vRtq2u5Li4';
const campusName={
  1: 'Universitywide',
  2: 'Berkeley',
  3: 'Davis',
  4: 'Los Angeles',
  5: 'Riverside',
  6: 'San Diego',
  7: 'Irvine',
  8: 'Merced',
  9: 'Santa Barbara',
  10: 'Santa Cruze'
};
const categoryName={
  0: 'applied',
  1: 'admitted'
};

const races = ['all_races'];
const racesList=[
  'asian',
  'black',
  'indian',
  'latino',
  'white',
  'domestic_unknown',
  'international',
  'na'
];
const API_URL = 'https://api.yibar.com';

async function searchSchools(gData, schools, campusId, categoryId, races, top){
  var params = {
    school_id: schools.map(s=>s.schoolId),
    campus_id: campusId,
    category_id: categoryId,
    race: races,
    top: top
  }
  //mainChart.showLoading();
  const resp = await axios.post(`${API_URL}/enrollments/search?&authenticity_token=${AUTH_TOKEN}`, params)
  console.log(resp.data);
  processData(gData, resp.data);
  return;
}

async function searchLocation(gData, schools, location, locationType, campusId, categoryId, races, top){
  var params = {
    location: location,
    location_type: locationType,
    top: top,
    campus_id: campusId,
    category_id: categoryId,
    race: races
  }
  //mainChart.showLoading();
  if (location === '' || locationType === ''){
    return;
  }
  const resp = await axios.post(`${API_URL}/enrollments/search?&authenticity_token=${AUTH_TOKEN}`, params)
  resp.data.schools.forEach((school)=>{
    if (!schools.find((s)=>s.schoolId == school.school_id)) {
      schools.push({
      schoolId: school.school_id,
      schoolName: school.school_name  
      });
    }
  });
  processData(gData, resp.data);
  return;
}


async function searchRace(gData, schools, year, schoolName, campusId, categoryId, top){
  console.log('searchRace', year, schoolName);
  const schoolId = (schools.find(s=>s.schoolName == schoolName) || {}).schoolId;
  if (!schoolId) {
    return;
  }
  var params = {
    school_id: schoolId,
    campus_id: campusId,
    category_id: categoryId,
    year: year,
    top:top
  }
  //mainChart.showLoading();
  const resp = await axios.post(`${API_URL}/enrollments/search?&authenticity_token=${AUTH_TOKEN}`, params);
  console.log('resp:', resp);
  processRaceData(gData, resp.data);
  return;   
}

function processRaceData(gData, data){
  if (!data.data || data.data.length === 0){
    return;
  }
  var schoolName = data.schools[0].school_name;
  var year = data.years[0];
  Object.keys(data.data[schoolName]).forEach((campus)=>{
    var raceData=[];
    Object.keys(data.data[schoolName][campus]).forEach((race)=>{
      if (race === 'all_races'){
        return;
      }
      raceData.push({
        name: race,
        value: data.data[schoolName][campus][race]
      })
    });
    var serieData = gData.series.find((d)=> d.name === 'race data');
    if (serieData) {
      serieData.data = raceData;
    } else {
      gData.series.push({
        name: 'race data',
        type: 'pie',
        center: ['60%', '15%'],
        radius: '25%',
        data: raceData
      });  
    }
  });
  return;
}

function processData(gData, data) {
  if (!data.data || data.data.length === 0){
    return;
  }
  gData.years = data.years;
  gData.series = [];
  gData.legend = Object.keys(data.data);
  Object.keys(data.data).forEach((schoolName) => {
    var schoolData = data.data[schoolName];
    Object.keys(schoolData).forEach((campusName)=>{
      var campusData = schoolData[campusName];
      Object.keys(campusData).forEach((race)=>{
        var raceData = campusData[race];
        gData.series.push({
          name: schoolName,
          type: 'bar',
          data: raceData
        });
      });
    });
  });
  //mainChart.hideLoading();
  console.log('gData:', gData);
  return;
}


/*function updateData(schoolName, gData, data) {

  data.forEach((d) =>{
    var year = d.attributes.year;
    
    if (gData.years.indexOf(year) < 0) {
      var index = 0;
      while(gData.years[index] < year) {
        index += 1;
      }
      gData.years.splice(index, 0, year);
      gData.series.forEach((seria) => {
        seria.data.splice(index, 0, 0);
      });
    }
  });
  gData.legend = schools.map(s=>s.schoolName);

  var campus = campusName[campusId];
  var category = categoryName[categoryId];
  races.forEach((race) => {
    var seriaData = gData.years.map((year) => {
      var element = data.find((d)=>{
        return d.attributes.school_name === schoolName &&
          d.attributes.year === year &&
          d.attributes.campus_name === campus &&
          d.attributes.category === category &&
          d.attributes.race === race
        })
      return element ? element.attributes.number : 0;
    });
    var schoolData = gData.series.find((s)=>s.name === schoolName);
    if (schoolData) {
      schoolData.data = seriaData;
    } else {
      gData.series.push({
        name: schoolName,
        type: 'bar',
        data: seriaData
      });    
    }
  });
  console.log(gData);
}*/
export function draw(chart, gData) {

  var zoomStart = gData.years.length <=5 ? 0 : Math.floor((gData.years.length - 5)*100/gData.years.length);
  var option = {
    tooltip: {},
    legend: {
        data:gData.legend
    },
    xAxis: [{
        data: gData.years
    }],
    yAxis: [{type: 'value'}],
    dataZoom: [
      {   // 这个dataZoom组件，默认控制x轴。
          type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
          start: zoomStart,      // 左边在 10% 的位置。
          end: 100         // 右边在 100% 的位置。
      },
      {   // 这个dataZoom组件，也控制x轴。
          type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
          start: zoomStart,      // 左边在 10% 的位置。
          end: 100         // 右边在 100% 的位置。
      }
    ],
    series: gData.series
  };
  chart.setOption(option);  
}

function graphInfo(categoryId, campusId){
  return "Students " + categoryName[categoryId] + " to UC " + campusName[campusId];
}

function autoSizeAll(gridOptions) {
  var allColumnIds = [];
  gridOptions.columnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
  });
  gridOptions.columnApi.autoSizeColumns(allColumnIds);
}

async function searchLocationRank(campusId, location, locationType, year){
  var params = {
    location: location,
    location_type: locationType,
    year: year,
    top: 100,
    campus_id: campusId,
    race: 'all_races',
    rank: true
  }
  const resp = await axios.post(`${API_URL}/enrollments/search?&authenticity_token=${AUTH_TOKEN}`, params);
  return resp.data.map((d)=> {
    return({
      ...d,
      id: d.index
    }
  )});
//  $('#rank-info').text("Ranking for UC "+campusName[campusId]+ " admitted and applied rank for " + 
//    location+ " " + locationType + " in year " + year);
}

export {
  API_URL,
  AUTH_TOKEN,
  GOOGLE_MAP_API_KEY,
  searchLocation,
  searchLocationRank,
  searchRace,
  searchSchools,
  processData
}