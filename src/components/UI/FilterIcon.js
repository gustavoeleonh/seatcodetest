import React from "react";

//STYLES
import "./FilterIcon.scss";
//COMPONENT
import Wrapper from "../hoc/Wrapper";

function FilterIcon(props) {
  return (
    <Wrapper>
      <svg
        version="1.1"
        className="filterIcon"
        onClick={props.click}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 194 122"
      >
        <g>
          <g>
            <g>
              <line className="st0" x1="3.5" y1="103.8" x2="189.5" y2="103.8" />
              <path
                className="st1"
                d="M189.5,107.8H3.5c-2.2,0-4-1.8-4-4s1.8-4,4-4h186c2.2,0,4,1.8,4,4S191.7,107.8,189.5,107.8z"
              />
            </g>
            <g className="b3">
              <circle className="st2" cx="47" cy="104" r="14" />
              <path
                className="st1"
                d="M47,122c-9.9,0-18-8.1-18-18s8.1-18,18-18s18,8.1,18,18S56.9,122,47,122z M47,94c-5.5,0-10,4.5-10,10
				s4.5,10,10,10s10-4.5,10-10S52.5,94,47,94z"
              />
            </g>
          </g>
          <g>
            <g>
              <line className="st0" x1="189.5" y1="61.2" x2="3.5" y2="61.2" />
              <path
                className="st1"
                d="M189.5,65.2H3.5c-2.2,0-4-1.8-4-4s1.8-4,4-4h186c2.2,0,4,1.8,4,4S191.7,65.2,189.5,65.2z"
              />
            </g>
            <g className="b2">
              <circle className="st2" cx="146" cy="61" r="14" />
              <path
                className="st1"
                d="M146,79c-9.9,0-18-8.1-18-18s8.1-18,18-18s18,8.1,18,18S156,79,146,79z M146,51c-5.5,0-10,4.5-10,10
				s4.5,10,10,10s10-4.5,10-10S151.5,51,146,51z"
              />
            </g>
          </g>
          <g>
            <line className="st0" x1="3.5" y1="17.8" x2="189.5" y2="17.8" />
            <path
              className="st1"
              d="M189.5,21.8H3.5c-2.2,0-4-1.8-4-4s1.8-4,4-4h186c2.2,0,4,1.8,4,4S191.7,21.8,189.5,21.8z"
            />
          </g>
          <g className="b1">
            <circle className="st2" cx="47" cy="18" r="14" />
            <path
              className="st1"
              d="M47,36c-9.9,0-18-8.1-18-18S37.1,0,47,0s18,8.1,18,18S56.9,36,47,36z M47,8c-5.5,0-10,4.5-10,10s4.5,10,10,10
			s10-4.5,10-10S52.5,8,47,8z"
            />
          </g>
        </g>
      </svg>
    </Wrapper>
  );
}
export default FilterIcon;
