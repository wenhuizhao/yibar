import React, { useState, useEffect, createRef } from 'react'
import axios from 'axios'
import { API_URL, AUTH_TOKEN, GOOGLE_MAP_API_KEY } from "./graph_util"
const campusId = 2; //berkeley
const campusName = {
  1: "Universitywide",
  2: "Berkeley",
  3: "Davis",
  4: "Los Angeles",
  5: "Riverside",
  6: "San Diego",
  7: "Irvine",
  8: "Merced",
  9: "Santa Barbara",
  10: "Santa Cruze",
};

function UcMapComponent() {
  const googleMapRef = React.createRef()
  const bayarea = { lat: 37.453, lng: -122.1817 }
  let googleMap;
  let marker;

  useEffect(() => {
    //const googleMapScript = document.createElement('script')
    //googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`
    //googleMapScript.async = true
    //window.document.body.appendChild(googleMapScript)

    if (!window.google) {
      const script = document.createElement(`script`)
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`
      document.head.append(script)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()
  }, [])


  const onLoad = () => {
    console.log('google map script loaded')
    createGoogleMap()
    console.log('googleMap', googleMap)
    //marker = createMarker(googleMap)
    axios.get(`${API_URL}/map?&authenticity_token=${AUTH_TOKEN}`)
      .then((resp)=> {
        const schools = resp.data;
        console.log(schools);
        schools.forEach((school) => {
          const temp =
            '<div><a href="/graph?school_id=' +
            school.school_id +
            '">' +
            school.school +
            "</a></div>" +
            "<div>2018 UC " +
            campusName[campusId] +
            " admitted:" +
            school.adm +
            "</div>";
          //console.log(temp)
          const infowindow = new window.google.maps.InfoWindow({
            content:
              '<div><a href="/uc?schoolId=' +
              school.school_id +
              '">' +
              school.school +
              "</a></div>" +
              "<div>2018 UC " +
              campusName[campusId] +
              " admitted:" +
              school.adm +
              "</div>",
          });
          if (!school.longitude || !school.latitude) {
            console.log('Error school:', school, school.latitude, school.longitude);
            return;
          }
          console.log('create marker', googleMap, school.latitude, school.longitude);
          const marker = new window.google.maps.Marker({
            position: { lat: school.latitude, lng: school.longitude },
            title: school.name,
            icon: "http://maps.google.com/mapfiles/kml/pal3/icon21.png",
            map: googleMap,
          });
          marker.addListener("click", function () {
            infowindow.open(googleMap, marker);
          });
        });
      })
    }


  const createGoogleMap = () => {
    googleMap = new window.google.maps.Map(googleMapRef.current, {
      zoom: 10,
      center: bayarea,
      zoomControl: true,
      disableDefaultUI: true,
    })
    console.log(googleMap)
  }
  const createMarker = (map) => {
    new window.google.maps.Marker({
      position: { lat: 43.642567, lng: -79.387054 },
      map: map,
    })
  }

  return (
    <div
      id="google-map"
      ref={googleMapRef}
      style={{ width: '100%', height: '600px' }}
    />
  )
}
export default UcMapComponent