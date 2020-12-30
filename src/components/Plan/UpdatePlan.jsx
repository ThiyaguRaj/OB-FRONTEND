import React, { Component } from "react";
import { TextField } from '@material-ui/core';
import axios from 'axios';

class UpdatePlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: {},
    };
  }
  componentDidMount() {
    this.setState({ plan: JSON.parse(localStorage.getItem("upplan")) });    
  }

  submitHandler = (e) => {
    e.preventDefault();
    let type = document.getElementById('type');
    if (type.value.length <= 30) {
      let object = {};
      let formData = new FormData(e.target);
      formData.forEach((value, key) => {
        object[key] = value;
      });
      object.planId=this.state.plan.planId;
      object.product = this.state.plan.product;
      let json = JSON.stringify(object);
      axios({
        method: 'put',
        url: 'http://localhost:8080/productbilling/plans',
        data: json,
        headers: { "Content-Type": "application/json" }
      }).then(resp => {
        axios({
          method: 'get',
          url: `http://localhost:8080/productbilling/products/${this.state.plan.product.productId}`,
          headers: { "Content-Type": "application/json" }
        }).then(resp => {
          axios({
            method: 'get',
            url: "http://localhost:8080/productbilling/products",
            headers: { "Content-Type": "application/json" }
          }).then(resp => {
            localStorage.setItem(
              "products",
              JSON.stringify(resp.data.data)
            );
          })
          localStorage.setItem(
            "product",
            JSON.stringify(resp.data.data)
          );
          this.props.history.push({
            pathname: "/view"
          });
        })
      })
    } else {
      type.value = "";
      type.placeholder = "Type is too long";
      type.style.border = "2px solid red"
    }
  }

  render() {
    return (
      <form
        className="col-md-4 offset-md-4 card card-body mt-5"
        onSubmit={this.submitHandler}
      >
        <h2 className="text-center text-muted mb-5">Update Plan</h2>
        <TextField
          id="type"
          label="Type"
          variant="outlined"
          required
          value={this.state.plan.type}
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
    );
  }
}

export default UpdatePlan;
