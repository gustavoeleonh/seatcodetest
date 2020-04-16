import React from "react";

import "./styles/FilterSection.scss";

function FilterSection(props) {
  return (
    <div
      className={`filterSection ${
        props.showFilter ? "activeFilterSection" : ""
      }`}
    >
      <ul>
        <li onClick={props.asc} className="arrowButton" tabIndex="1">
          <div className="buttonasc"></div>
        </li>
        <li onClick={props.dsc} className="arrowButton" tabIndex="2">
          <div className="buttondsc"></div>
        </li>
        <li onClick={props.ongoing} tabIndex="3">
          <div className="circleong"></div>
          <p>Ongoing</p>
        </li>
        <li onClick={props.scheduled} tabIndex="4">
          <div className="circlesch"></div>
          <p>Scheduled</p>
        </li>
        <li onClick={props.cancelled} tabIndex="5">
          <div className="circlecanc"></div>
          <p>Cancelled</p>
        </li>
        <li onClick={props.finalized} tabIndex="6">
          <div className="circleend"></div>
          <p>Ended</p>
        </li>
        <li onClick={props.all}>Show All</li>
      </ul>
    </div>
  );
}

export default FilterSection;
