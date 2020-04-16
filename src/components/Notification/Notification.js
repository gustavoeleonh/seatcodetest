import React from "react";

//ICONS
import arrowNotify from "../../assets/arrow.svg";

//STYLES
import "./styles/Notification.scss";

function Notification(props) {
  return (
    <div className="route-cancelled-click">
      <img src={arrowNotify} className="notifyArrow" alt="Arrow Back" />
      <p>
        This route was cancelled due to restrictions from goverment, feel free
        to know more about it
      </p>
      <div className="notify-readmore">
        <a href="https://elpais.com/" target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
}
export default Notification;
