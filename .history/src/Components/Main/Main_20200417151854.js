import React from "react";
import "./Main.scss";
import BabyDisplay from "../BabyDisplay/BabyDisplay";
import NewLogEntry from "../../Components/NewLogEntry/NewLogEntry";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state({
      date: "",
    });
  }
  render() {
    return (
      <div className="main">
        <BabyDisplay />
        <NewLogEntry />
      </div>
    );
  }
}
