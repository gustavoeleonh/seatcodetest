import React from "react";

// COMPONENT
import FilterIcon from "../UI/FilterIcon";

//STYLES
import "../header/styles/HeaderDesktop.scss";

function HeaderMobile(props) {
  return (
    <header className="cardsDiv">
      <p className="titleLogo">
        Trip Manager
        <br />
        <span>by seat:code</span>
      </p>
      <div className="buttonFilter">
        <div>
          <FilterIcon click={props.click} />
        </div>
      </div>
    </header>
  );
}

export default HeaderMobile;
