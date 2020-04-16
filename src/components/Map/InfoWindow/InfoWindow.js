import React from "react";

//ICONS

import busOngoing from "../../../assets/busOngoing.svg";
import busScheduled from "../../../assets/busScheduled.svg";
import busCancelled from "../../../assets/busCancelled.svg";
import check from "../../../assets/check.svg";
import cross from "../../../assets/cross.svg";

//STYLES

import "./styles/InfoWindow.scss";

//COMPONENTS

import Wrapper from "../../hoc/Wrapper";

function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0;
}

function InfoWindowDiv(props) {
  let where, Address, pay;
  if (!isEmpty(props.stopInfo)) {
    where = props.stopInfo.address.search(", ");
    Address = props.stopInfo.address.slice(0, where);
    pay = props.stopInfo.paid ? check : cross;
  }

  const busImage =
    props.status === "status-ongoing"
      ? busOngoing
      : props.status === "status-scheduled"
      ? busScheduled
      : busCancelled;

  const tra = !isEmpty(props.stopInfo) ? (
    <div className={`infoWindowParent ${props.status}`}>
      <div className="closeInfoWindow" onClick={props.click}></div>
      <p className="infoWindowAddress">{Address}</p>
      <p className="infoWindowHour">{props.hour}</p>
      <p className="infoWindowUser">{props.stopInfo.userName}</p>
      <div className="infoWindowPricePay">
        <p className="infoWindowPrice">{props.stopInfo.price}€</p>
        <img src={pay} className="infoWindowIcon" alt="Pay Icon" />
      </div>

      <img src={busImage} className="infoWindowBus" alt="Bus InfoWindow" />
    </div>
  ) : (
    <div className={`infoWindowParent ${props.status}`}>
      <div className="closeInfoWindow" onClick={props.click}></div>
      <p className="infoWindowNoInfo">No hay informacion disponible</p>
      <img src={busImage} className="infoWindowBus" alt="Bus InfoWindow" />
    </div>
  );
  return <Wrapper>{tra}</Wrapper>;
}
export default InfoWindowDiv;
