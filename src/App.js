//LIBRARIES
import React, { Component } from "react";
import axios from "axios";
import SimpleBar from "simplebar-react";
import $ from "jquery";

//STYLES
import "./App.scss";
import "simplebar/dist/simplebar.min.css";

//COMPONENTS
import Layout from "./components/Container/Layout";
import Map from "./components/Map/Map";
import Card from "./components/Card/Card";
import Notification from "./components/Notification/Notification";
import HeaderMobile from "./components/header/HeaderMobile";
import HeaderDesktop from "./components/header/HeaderDesktop";
import Welcome from "./components/Welcome/Welcome";
import FilterSection from "./components/FilterSection/FilterSection";

//ICONS
import cardsLogo from "./assets/seat-bus-left.svg";
import road from "./assets/road.svg";

//VAR
const polyUtil = require("polyline-encoded");
let _ = require("underscore");
let active_filter = false;
let active_move_mobile = false;

class App extends Component {
  state = {
    dataOrg: [],
    dataOrg2: [],
    data: [],
    origin: [],
    destination: [],
    polylinePath: [],
    isSet: false,
    showFilter: false,
    setActive: 0
  };

  componentDidMount() {
    // GET PETITION DATA (CHECKS IF DATA IS STORED IN LOCALSTORAGE IF NOT, GET FROM THE API)
    const data = localStorage.getItem("data");
    if (data) {
      let dataParsed = JSON.parse(data);
      let dataParsedFiltered = _.sortBy(dataParsed, "startTime");
      let dataParsedFiltered0 = dataParsedFiltered[0];
      let setActiveDefault = 0;
      if (dataParsedFiltered[0].status === "finalized") {
        dataParsedFiltered0 = dataParsedFiltered[1];
        setActiveDefault = 1;
      }
      let setPolylinePath = polyUtil.decode(dataParsedFiltered0.route);
      let polylineArr = setPolylinePath.map(value => ({
        lat: value[0],
        lng: value[1]
      }));
      this.setState({
        dataOrg: dataParsedFiltered,
        dataOrg2: dataParsedFiltered,
        data: dataParsedFiltered0,
        origin: [
          dataParsedFiltered0.origin.point._latitude,
          dataParsedFiltered0.origin.point._longitude
        ],
        destination: [
          dataParsedFiltered0.destination.point._latitude,
          dataParsedFiltered0.destination.point._longitude
        ],
        polylinePath: polylineArr,
        isSet: true,
        showFilter: false,
        setActive: setActiveDefault
      });
    } else {
      axios
        .get(
          "https://europe-west1-metropolis-fe-test.cloudfunctions.net/api/stops/"
        )
        .then(response => {
          localStorage.setItem("stops", JSON.stringify(response.data));
        });
      axios
        .get(
          "https://europe-west1-metropolis-fe-test.cloudfunctions.net/api/trips"
        )
        .then(response => {
          let dataParsedFiltered = _.sortBy(response.data, "startTime");
          let dataParsedFiltered0 = dataParsedFiltered[0];
          let setActiveDefault = 0;
          if (dataParsedFiltered[0].status === "finalized") {
            dataParsedFiltered0 = dataParsedFiltered[1];
            setActiveDefault = 1;
          }
          let setPolylinePath = polyUtil.decode(dataParsedFiltered0.route);
          let polylineArr = setPolylinePath.map(value => ({
            lat: value[0],
            lng: value[1]
          }));
          this.setState({
            dataOrg: dataParsedFiltered,
            dataOrg2: dataParsedFiltered,
            data: dataParsedFiltered0,
            origin: [
              dataParsedFiltered0.origin.point._latitude,
              dataParsedFiltered0.origin.point._longitude
            ],
            destination: [
              dataParsedFiltered0.destination.point._latitude,
              dataParsedFiltered0.destination.point._longitude
            ],
            polylinePath: polylineArr,
            isSet: true,
            showFilter: false,
            setActive: setActiveDefault
          });
          localStorage.setItem("data", JSON.stringify(response.data));
        });
    }
  }

  // NOTIFICATION ACTION
  handleNotification = el => {
    if (el.status === "cancelled") {
      let element = document.getElementsByClassName("route-cancelled-click")[0];
      element.style.right = "2%";
      element.style.opacity = "1";
      let moveOut = setTimeout(() => {
        element.style.right = "-260px";
        element.style.opacity = "0";
      }, 5000);
      document.querySelector(".route-cancelled-click").addEventListener(
        "mouseover",
        event => {
          clearTimeout(moveOut);
        },
        false
      );
      document.querySelector(".route-cancelled-click").addEventListener(
        "mouseout",
        event => {
          moveOut = setTimeout(() => {
            element.style.right = "-260px";
            element.style.opacity = "0";
          }, 1000);
        },
        false
      );
      document.querySelector(".notifyArrow").addEventListener("click", () => {
        element.style.right = "-260px";
        element.style.opacity = "0";
      });
    }
  };

  // CHANGE MAP INFO (MARKERS AND POLYLINE) WHEN USER CLICKS ON A CARD
  handleChange = (el, e) => {
    //USAGE OF JQUERY FOR EASE OF CODE (REMOVE THE ACTIVE FROM THE CARD AND ADD TO THE NEW ONE)
    let elementActive = $(".card")
      .toArray()
      .filter(card => $(card).hasClass("card-active"))[0];
    if (elementActive !== undefined) {
      $(elementActive).removeClass("card-active");
    }
    let elementClicked = $(e.target)
      .parents()
      .toArray()
      .filter(item => $(item).hasClass("card"))[0];
    $(elementClicked).addClass("card-active");
    //
    let setPolylinePath = polyUtil.decode(el.route);
    let polylineArr = setPolylinePath.map(value => ({
      lat: value[0],
      lng: value[1]
    }));
    this.setState({
      data: el,
      origin: [el.origin.point._latitude, el.origin.point._longitude],
      destination: [
        el.destination.point._latitude,
        el.destination.point._longitude
      ],
      polylinePath: polylineArr,
      isSet: true
    });
    this.handleNotification(el);
  };

  // FILTER THE CARDS WHEN USER CLICK ON A FILTER OPTION
  handleFilter = (el, filter) => {
    let dataFiltered;
    switch (filter) {
      case "all":
        dataFiltered = el;
        break;
      case "ascending":
        dataFiltered = el;
        dataFiltered = _.sortBy(el, "startTime");
        break;
      case "descending":
        dataFiltered = el;
        dataFiltered = _.sortBy(el, "startTime").reverse();
        break;
      default:
        dataFiltered = el.filter(card => card.status === filter);
    }
    let dataParsedFiltered0 = dataFiltered[0];
    let setActiveDefault = 0;
    if (filter !== "finalized") {
      if (dataFiltered[0].status === "finalized") {
        dataParsedFiltered0 = dataFiltered[1];
        setActiveDefault = 1;
      }
    }
    let setPolylinePath = polyUtil.decode(dataParsedFiltered0.route);
    let polylineArr = setPolylinePath.map(value => ({
      lat: value[0],
      lng: value[1]
    }));
    this.setState({
      dataOrg: dataFiltered,
      data: dataParsedFiltered0,
      origin: [
        dataParsedFiltered0.origin.point._latitude,
        dataParsedFiltered0.origin.point._longitude
      ],
      destination: [
        dataParsedFiltered0.destination.point._latitude,
        dataParsedFiltered0.destination.point._longitude
      ],
      polylinePath: polylineArr,
      isSet: true,
      setActive: setActiveDefault
    });
    this.handleNotification(dataParsedFiltered0);
    document.getElementsByClassName("card")[0].style.marginTop = "8px";
  };

  //SHOW FILTER
  showFilter = e => {
    active_filter = !active_filter;
    let element = document.querySelectorAll(".filterIcon");
    window.innerWidth > 1016
      ? active_filter
        ? element[1].classList.add("filter-active")
        : element[1].classList.remove("filter-active")
      : active_filter
      ? element[0].classList.add("filter-active")
      : element[0].classList.remove("filter-active");

    this.setState({ showFilter: !this.state.showFilter });
  };

  handleMoveMobile = () => {
    active_move_mobile = !active_move_mobile;
    if (active_move_mobile) {
      $(".cards").css("bottom", "-43%");
    } else {
      $(".cards").css("bottom", "0");
    }
  };
  render() {
    // CREATE THE OPTION CARDS
    const cards = this.state.dataOrg.map((busLine, index) => {
      return (
        <Card
          key={`card${index}`}
          index={index}
          setActive={this.state.setActive}
          busLine={busLine}
          click={e => this.handleChange(busLine, e)}
        />
      );
    });
    const setMap = this.state.isSet ? (
      <div className="App">
        <Layout>
          <HeaderMobile click={e => this.showFilter(e)} />
          <FilterSection
            showFilter={this.state.showFilter}
            ongoing={() => this.handleFilter(this.state.dataOrg2, "ongoing")}
            all={() => this.handleFilter(this.state.dataOrg2, "all")}
            asc={() => this.handleFilter(this.state.dataOrg2, "ascending")}
            dsc={() => this.handleFilter(this.state.dataOrg2, "descending")}
            scheduled={() =>
              this.handleFilter(this.state.dataOrg2, "scheduled")
            }
            cancelled={() =>
              this.handleFilter(this.state.dataOrg2, "cancelled")
            }
            finalized={() =>
              this.handleFilter(this.state.dataOrg2, "finalized")
            }
          />
          <div className="cards">
            <div
              className="triggerMobileDiv"
              onClick={() => this.handleMoveMobile()}
            ></div>
            <HeaderDesktop
              click={e => this.showFilter(e)}
              showFilter={this.state.showFilter}
              ongoing={() => this.handleFilter(this.state.dataOrg2, "ongoing")}
              all={() => this.handleFilter(this.state.dataOrg2, "all")}
              asc={() => this.handleFilter(this.state.dataOrg2, "ascending")}
              dsc={() => this.handleFilter(this.state.dataOrg2, "descending")}
              scheduled={() =>
                this.handleFilter(this.state.dataOrg2, "scheduled")
              }
              cancelled={() =>
                this.handleFilter(this.state.dataOrg2, "cancelled")
              }
              finalized={() =>
                this.handleFilter(this.state.dataOrg2, "finalized")
              }
            />
            <SimpleBar className="simpleBar">{cards}</SimpleBar>
            <div className="fadeDiv"></div>
            <footer className="footerImage">
              <img src={road} className="footerRoad" alt="Road" />
              <img src={cardsLogo} className="footerLogo" alt="Seat Bus Logo" />
            </footer>
          </div>

          <Map
            origin={this.state.origin}
            destination={this.state.destination}
            polylinePath={this.state.polylinePath}
            allInfo={this.state.data}
          />
          <Notification />
        </Layout>
      </div>
    ) : null;
    return (
      <div className="App">
        <Welcome isSet={this.state.isSet} />
        {setMap}
      </div>
    );
  }
}

export default App;
