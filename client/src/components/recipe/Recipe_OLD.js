import React, { Component } from "react";
import Ingredient from "../ingredient/Ingredient";
import { Button } from "@material-ui/core";

export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: "tsp",
      userUnit: "tsp"
    };
  }

  render() {
    const { history } = this.props;

    return (
      <>
        <Button onClick={() => history.goBack()}>Back</Button>
        <div>
          <Ingredient />
        </div>
        <button onClick={this.handleSave}>Save this</button>
        <div>
          <label>
            View Ingredients as:
            <select onChange={this.handleUserUnit}>
              <option value="tsp">tsp</option>
              <option value="tbsp">tbsp</option>
              <option value="cup">cup</option>
              <option value="ml">ml</option>
            </select>
          </label>
          <ul>
            <li>
              {this.handleUserConversion()} {this.state.userUnit}{" "}
              {this.state.Description}
            </li>
          </ul>
        </div>
      </>
    );
  }

  handleQuantity = e => {
    const quantity = e.target.value;
    const measurement = this.handleMlConversion(
      e.target.value,
      this.state.unit
    );

    this.setState({
      quantity,
      measurement
    });
  };

  handleUnit = e => {
    const measurement = this.handleMlConversion(
      this.state.quantity,
      e.target.value
    );

    this.setState({
      measurement,
      unit: e.target.value
    });
  };

  handleSave = () => {
    const request = new Request("/api/v1/ingredient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredient: this.state })
    });

    fetch(request)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleUserUnit = e => {
    this.setState({
      userUnit: e.target.value
    });
  };

  handleUserConversion = () => {
    switch (this.state.userUnit) {
      case "tsp":
        return Math.floor(this.state.measurement * 0.20288);
      case "tbsp":
        return Math.floor(this.state.measurement * 0.067628);
      case "cup":
        return (this.state.measurement * 0.0042268).toFixed(2);
      case "ml":
        return this.state.measurement;
      default:
        console.log("oops");
    }
  };

  handleMlConversion = (qty, unit) => {
    switch (unit) {
      case "tsp":
        return qty / 0.20288;
      case "tbsp":
        return qty / 0.067628;
      case "cup":
        return qty / 0.0042268;
      case "ml":
        return qty;
      default:
        console.log("oops");
    }
  };
}