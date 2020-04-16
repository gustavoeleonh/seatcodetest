import React from "react";

import "../Welcome/styles/Welcome.scss";

//ICONS
import cardsLogo from "../../assets/seat-bus-left.svg";
import road from "../../assets/road.svg";

function Welcome(props) {
  let fadeOut = props.isSet ? "fadeOut" : "";
  return (
    <section className={`welcomeWrapper ${fadeOut}`}>
      <p className="titleLogo">
        Trip Manager
        <br />
        <span>by seat:code</span>
      </p>
      <p className="welcomeLoading">loading</p>
      <footer className="footerImageW">
        <img src={road} className="footerRoadW" alt="Road" />
        <img src={cardsLogo} className="footerLogoW" alt="Seat Bus Logo" />
      </footer>
    </section>
  );
}

export default Welcome;
