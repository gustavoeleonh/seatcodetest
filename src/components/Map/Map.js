//LIBRARIES
import React, { useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline,
  Marker,
  InfoWindow
} from "react-google-maps";
//import axios from "axios";

// VAR
import credentials from "./var/credentials";

//STYLES
import "./styles/Map.scss";
import mapStyles from "./styles/mapStyles";

//ICONS
import markerInitOngoing2 from "../../assets/markerInitOngoing2.svg";
import markerDestOngoing2 from "../../assets/markerDestOngoing2.svg";
import markerInitScheduled2 from "../../assets/markerInitScheduled2.svg";
import markerDestScheduled2 from "../../assets/markerDestScheduled2.svg";
import markerInitFinalized2 from "../../assets/markerInitFinalized2.svg";
import markerDestFinalized2 from "../../assets/markerDestFinalized2.svg";
import markerInitCancelled2 from "../../assets/markerInitCancelled2.svg";
import markerDestCancelled2 from "../../assets/markerDestCancelled2.svg";

//COMPONENTS
import InfoWindowDiv from "./InfoWindow/InfoWindow";

function MyMapComponent(props) {
  //STATES
  const [selectedStop, setSelectedStop] = useState(null);
  const [selectedStopInfo, setSelectedStopInfo] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);

  //USE FUNCTIONS
  function emptyInfoWindow() {
    setSelectedStop(null);
    setSelectedStopInfo(null);
    setSelectedHour(null);
  }
  function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
  }
  function closeInfoWindow() {
    document.addEventListener("click", function() {
      setSelectedStopInfo(null);
      setSelectedHour(null);
    });
  }
  closeInfoWindow();

  //VAR
  const polylineStroke =
    props.allInfo.status === "cancelled"
      ? "#d63c3c"
      : props.allInfo.status === "scheduled"
      ? "#8d2fb4"
      : props.allInfo.status === "finalized"
      ? "#cccccc"
      : "#0cae5a";

  const itemOpacity =
    props.allInfo.status === "finalized" || props.allInfo.status === "cancelled"
      ? 0.7
      : 1;

  const markerStart =
    props.allInfo.status === "scheduled"
      ? markerInitScheduled2
      : props.allInfo.status === "ongoing"
      ? markerInitOngoing2
      : props.allInfo.status === "finalized"
      ? markerInitFinalized2
      : markerInitCancelled2;
  const markerEnd =
    props.allInfo.status === "scheduled"
      ? markerDestScheduled2
      : props.allInfo.status === "ongoing"
      ? markerDestOngoing2
      : props.allInfo.status === "finalized"
      ? markerDestFinalized2
      : markerDestCancelled2;
  const markerNormal =
    props.allInfo.status === "scheduled"
      ? markerDestScheduled2
      : props.allInfo.status === "ongoing"
      ? markerDestOngoing2
      : props.allInfo.status === "finalized"
      ? markerDestFinalized2
      : markerDestCancelled2;

  const status =
    props.allInfo.status === "ongoing"
      ? "status-ongoing"
      : props.allInfo.status === "scheduled"
      ? "status-scheduled"
      : props.allInfo.status === "cancelled"
      ? "status-cancelled"
      : "status-finalized";

  return (
    <GoogleMap
      defaultZoom={10.7}
      center={{ lat: props.origin[0], lng: props.origin[1] }}
      defaultOptions={{
        styles: mapStyles,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false
      }}
    >
      <Polyline
        path={props.polylinePath}
        options={{
          strokeColor: polylineStroke,
          strokeOpacity: itemOpacity,
          strokeWeight: 5
        }}
      />
      <Marker
        position={{
          lat: props.origin[0],
          lng: props.origin[1]
        }}
        cursor="normal"
        opacity={itemOpacity}
        icon={{
          url: markerStart,
          scaledSize: { width: 24, height: 24 }
        }}
      />
      <Marker
        position={{
          lat: props.destination[0],
          lng: props.destination[1]
        }}
        cursor="normal"
        opacity={itemOpacity}
        icon={{
          url: markerEnd,
          scaledSize: { width: 32, height: 32 }
        }}
      />
      {!isEmpty(props.allInfo.stops[0])
        ? props.allInfo.stops.map(stop => (
            <Marker
              key={stop.id}
              position={{
                lat: stop.point._latitude,
                lng: stop.point._longitude
              }}
              animation={4}
              onClick={() => {
                setSelectedStop(stop);
                setSelectedStopInfo(null);
                setTimeout(() => {
                  let LocalStops = localStorage.getItem("stops");
                  let stopsParsed = JSON.parse(LocalStops);
                  let stopId = stop.id - 1;
                  let stopFiltered = stopsParsed.filter(
                    (stop, index) => index === stopId
                  )[0];
                  if (stopFiltered !== undefined) {
                    setSelectedStopInfo(stopFiltered);
                    let d = new Date(stopFiltered.stopTime);
                    let hours = `${d.getUTCHours()}:${d.getUTCMinutes()}`;
                    setSelectedHour(hours);
                  } else {
                    setSelectedStopInfo({});
                    setSelectedHour("0");
                  }
                }, 0);
              }}
              icon={{
                url: markerNormal,
                scaledSize: { width: 16, height: 16 }
              }}
            />
          ))
        : null}
      {selectedStop && selectedStopInfo && (
        <InfoWindow
          position={{
            lat: selectedStop.point._latitude,
            lng: selectedStop.point._longitude
          }}
          onCloseClick={() => {
            setSelectedStop(null);
            setSelectedStopInfo(null);
          }}
        >
          <InfoWindowDiv
            stopInfo={selectedStopInfo}
            hour={selectedHour}
            status={status}
            click={() => {
              emptyInfoWindow();
            }}
          />
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(MyMapComponent));

class Map extends React.PureComponent {
  state = {
    isMarkerShown: false
  };

  render() {
    return (
      <div className="Mapper">
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          origin={this.props.origin}
          destination={this.props.destination}
          polylinePath={this.props.polylinePath}
          allInfo={this.props.allInfo}
        />
      </div>
    );
  }
}

export default Map;
