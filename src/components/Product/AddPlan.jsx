import React, { Component } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";

class AddPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }
  componentDidMount() {
    this.setState({ product: JSON.parse(localStorage.getItem("product")) });
  }
  submitHandler = (e) => {
    e.preventDefault();
    let type = document.getElementById("type");
    if (type.value.length <= 30) {
      let object = {};
      let formData = new FormData(e.target);
      formData.forEach((value, key) => {
        object[key] = value;
      });
      object.product = this.state.product;
      let json = JSON.stringify(object);
      axios({
        method: "post",
        url: "http://localhost:8080/productbilling/plans",
        data: json,
        headers: { "Content-Type": "application/json" }
      }).then((resp) => {
        axios({
          method: "get",
          url: `http://localhost:8080/productbilling/products/${this.state.product.productId}`,
          headers: { "Content-Type": "application/json" },
        }).then((resp) => {
          axios({
            method: "get",
            url: "http://localhost:8080/productbilling/products",
            headers: { "Content-Type": "application/json" },
          }).then((resp) => {
            localStorage.setItem("products", JSON.stringify(resp.data.data));
          });
          localStorage.setItem("product", JSON.stringify(resp.data.data));
          this.props.history.push({
            pathname: "/view",
          });
        });
      });
    } else {
      type.value = "";
      type.placeholder = "Type is too long";
      type.style.border = "2px solid red";
    }
  };
  render() {
    return (
      <>
        <form
          className="col-md-4 offset-md-4 card card-body mt-5"
          onSubmit={this.submitHandler}
        >
          <h2 className="text-center text-muted mb-5">Add Plan</h2>
          <TextField
            id="type"
            label="Type"
            variant="outlined"
            required
            type="text"
            name="type"
            className=" mt-2 mb-2"
          />
          <TextField
            id="duration"
            label="Duration"
            variant="outlined"
            required
            type="number"
            name="planFrequency"
            className=" mt-2 mb-2"
          />
          <TextField
            id="cost"
            label="Amount"
            variant="outlined"
            required
            type="number"
            name="planAmount"
            className=" mt-2 mb-4"
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default AddPlan;
