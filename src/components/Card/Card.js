import React from "react";

//STYLES
import "./styles/Card.scss";

import busDriver from "../../assets/busDriver.jpg";

function Card(props) {
  let str = props.busLine.description;
  let n = str.search(" a ");
  let origin = props.busLine.description.slice(0, n);
  let destination = props.busLine.description.slice(
    n + 3,
    props.busLine.description.length
  );
  let strorg = props.busLine.origin.address;
  let norg = strorg.search(", ");
  let originAddress = props.busLine.origin.address.slice(0, norg);
  let strdest = props.busLine.destination.address;
  let ndest = strdest.search(", ");
  let destinationAddress = props.busLine.destination.address.slice(0, ndest);

  let d1 = new Date(props.busLine.startTime);
  let d1Min = d1.getMinutes() === 0 ? "00" : d1.getMinutes();
  let hoursStart = `${d1.getHours()}:${d1Min}`;

  let d2 = new Date(props.busLine.endTime);
  let d2Min = d2.getMinutes() === 0 ? "00" : d2.getMinutes();
  let hoursStop = `${d2.getHours()}:${d2Min}`;

  let date = new Date(props.busLine.startTime);
  let dateFull = `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()}`;

  let busDriverName = props.busLine.driverName.split(" ");
  busDriverName = `${busDriverName[0]} ${
    busDriverName[1] !== undefined ? busDriverName[1] : ""
  }`;

  let statusColor =
    props.busLine.status === "ongoing"
      ? "status-ongoing"
      : props.busLine.status === "scheduled"
      ? "status-scheduled"
      : props.busLine.status === "cancelled"
      ? "status-cancelled"
      : "status-finalized";
  let changeClass =
    props.busLine.status === "finalized"
      ? "route-finalized"
      : props.busLine.status === "cancelled"
      ? "route-cancelled"
      : props.busLine.status === "scheduled"
      ? "route-scheduled"
      : "route-ongoing";

  const classActivedefault =
    props.index === props.setActive ? "card-active" : "";

  return (
    <div
      className={`card ${changeClass} ${classActivedefault}`}
      onClick={props.click}
    >
      <div className="paddingCard">
        <div className="cardDiv">
          <h6 className="cardDate">{dateFull}</h6>
          <h6 className={statusColor}>{props.busLine.status}</h6>
        </div>
        <div className="divInfoParent">
          <div className="divInfo1">
            <p style={{ textTransform: "uppercase" }}>{origin}</p>
            <h6>{originAddress}</h6>
          </div>
          <div className="divInfo2">
            <div>
              <div className="arrowCenter"></div>
            </div>
            <div className="hoursCenter">
              <p className="hoursCenterStart">{hoursStart}</p>
              <p className="hoursCenterStop">{hoursStop}</p>
            </div>
          </div>
          <div className="divInfo3" style={{ textAlign: "right" }}>
            <p style={{ textTransform: "uppercase" }}>{destination}</p>
            <h6>{destinationAddress}</h6>
          </div>
        </div>
      </div>
      <div className="cardInfoHoverClicked">
        <p className="cihcRoute">DRIVER</p>
        <img src={busDriver} className="cihcPhoto" alt="Bus Driver" />
        <p className="cihcName">{busDriverName}</p>
      </div>
    </div>
  );
}
export default Card;
