import React, { useState, useEffect, useRef } from 'react'
import LinearProgress from "@material-ui/core/LinearProgress"
import { GOOGLE_MAP_API_KEY, API_URL, AUTH_TOKEN } from './graph_util'

import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";
import axios from 'axios';
import { Typography } from '@material-ui/core';

function SchoolAreaComponent() {
  const [address, setAddress] = useState()
  const [loading, setLoading] = useState(false)
  const [loadingScript, setLoadingScript] = useState(true)
  const mapRef = useRef();

  const onLoad = () => { setLoadingScript(false) }
  useEffect(() => {
    // const googleMapScript = document.createElement("script")
    // googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`
    // window.document.body.appendChild(googleMapScript)
    // googleMapScript.addEventListener('load', () => {
    //   setLoaded(true)
    // })
    if (!window.google) {
      const script = document.createElement(`script`)
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`
      document.head.append(script)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()

  }, [])

  const onAddressChange = async (address) => {
    setAddress(address)
    const placeId = address.value.place_id
    console.log(address, placeId)
    console.log('mapRef', mapRef)
    const results = await geocodeByPlaceId(placeId)
    const { lat, lng } = await getLatLng(results[0])
    console.log("Successfully got latitude and longitude", { lat, lng })
    const params = {
      latitude: lat,
      longitude: lng,
    }
    setLoading(true)
    const resp = await axios.post(
      `${API_URL}/static/search?&authenticity_token=${AUTH_TOKEN}`,
      params
    );
    setLoading(false)
    console.log(resp.data);
    drawMap(resp.data)
  }

  const drawMap = (data) => {
    const center = {
      lat: parseFloat(data.latitude),
      lng: parseFloat(data.longitude),
    }
    console.log(mapRef)
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 12,
      center: center,
      zoomControl: true,
    });
    const marker = new window.google.maps.Marker({
      position: center,
      map: map,
    });
    data.schools.forEach((school) => {
      const geoJson = {
        type: "FeatureCollection",
        features: [{ type: "Feature", geometry: JSON.parse(school.geom) }],
      };
      //map.data.addGeoJson(geoJson);
      const temp =
        '<div><a href="/uc?school_id=' +
        school.school_id +
        '">' +
        school.school_name +
        "</a></div>";
      console.log(temp);
      const infowindow = new window.google.maps.InfoWindow({
        content:
          '<div><a href="/uc?school_id=' +
          school.school_id +
          '">' +
          school.school_name +
          "</a></div>",
      });
      if (school.latitude && school.longitude) {
        var marker = new window.google.maps.Marker({
          position: { lat: school.latitude, lng: school.longitude },
          title: school.school_name,
          icon: "http://maps.google.com/mapfiles/kml/pal3/icon21.png",
          map: map,
        });
        marker.addListener("click", function () {
          infowindow.open(map, marker);
          map.data.forEach(function (feature) {
            map.data.remove(feature);
          });
          map.data.addGeoJson(geoJson);
        });
      }
    });
  } 

  return (
    <div style={{padding: '10px'}}>
      <Typography variant='h5'>
        Search school attendance area
      </Typography>
      <div style={{ height: "700px", marginTop: "10px", zIndex: 1000}}>
        { loadingScript ? null : 
        <GooglePlacesAutocomplete
          autocompletionRequest={{
            componentRestrictions: {
              country: ["us"],
            },
          }}
          selectProps={{ address, onChange: onAddressChange }}
        />
        }
      </div>
      { loading ? 
        <div style={{position: "absolute", top: "110px", width: "100%" }}>
          <LinearProgress />
        </div> : null }
      <div
        id="google-map"
        ref={mapRef}
        style={{
          width: "100%",
          height: "600px",
          position: "absolute",
          top: "120px",
        }}
      />
    </div>
  );
}
export default SchoolAreaComponent