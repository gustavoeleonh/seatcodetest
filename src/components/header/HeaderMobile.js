import React from "react";

// COMPONENT
import FilterIcon from "../UI/FilterIcon";

//STYLES
import "../header/styles/HeaderMobile.scss";

function HeaderMobile(props) {
  return (
    <header className="cardsDiv mobile">
      <svg
        version="1.1"
        className="titleLogo"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 225 234"
      >
        <g>
          <path
            className="st0"
            d="M90.5,60.7c6.4-0.1,14.3-0.2,24.3-0.2c34.9,0,106,2.6,106,2.6s-1.3-28.9-1.9-37.5c-0.8-10.7-1.1-12.8-3.8-14.6
                c-1.2-0.9-3.6-2-9.8-2.5C145,4.4,97,3.9,49.8,6.5c-20.4,1.1-29,2.7-36.3,9.1c-5.3,4.7-8,12.5-8.5,25.4S4,78.1,4,78.1l216.6,38.5
                h0.1V85.4L82.6,62C84.2,61.2,86.2,60.8,90.5,60.7z M71.6,36.3v-5.5c0-2.3,2.4-4.2,5.3-4.2h72.7c2.9,0,5.3,1.9,5.3,4.2v5.5
                c0,2.3-2.4,4.2-5.3,4.2H76.9C73.9,40.6,71.6,38.7,71.6,36.3z"
          />
          <path
            className="st0"
            d="M3.9,117.5l138.2,23.6c-1.6,0.8-3.7,1.2-8,1.3c-6.4,0.1-14.3,0.2-24.3,0.2c-34.9,0-106.1-2.6-106.1-2.6
                s1.4,28.9,1.8,37.4C6.4,188,6.7,190.1,9.4,192c1.2,0.9,3.6,2,9.8,2.5c5.2,0.4,10.4,0.7,15.4,1h-0.1l0.2,27.8c0,3.9,3.3,7.2,7.2,7.2
                h21.5c4,0,7.2-3.3,7.2-7.2v-26h-0.1c29.8,1.1,57,1.2,83.3,0.2v25.9c0,3.9,3.3,7.2,7.2,7.2h21.5c4,0,7.2-3.3,7.2-7.2v-27.9
                c10.1-1.3,15.9-3.4,21-7.9c5.3-4.7,8-12.5,8.5-25.4s1.1-37.1,1.1-37.1L3.6,86.6v30.9H3.9z"
          />
        </g>
      </svg>
      <div className="buttonFilter">
        <div>
          <FilterIcon
            click={props.click}
            showFilter={props.showFilter}
            ongoing={props.ongoing}
            scheduled={props.scheduled}
            cancelled={props.cancelled}
            finalized={props.finalized}
            all={props.all}
            asc={props.asc}
            dsc={props.dsc}
          />
        </div>
      </div>
    </header>
  );
}

export default HeaderMobile;
