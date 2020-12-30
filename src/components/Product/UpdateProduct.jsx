import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { TextField } from "@material-ui/core";

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }
  componentDidMount() {
    this.setState({ product: JSON.parse(localStorage.getItem("uppro")) });
  }
  submitHandler = (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const type = document.getElementById("type");

    if (name.value.length <= 30 && type.value.length <= 30) {
      var body = {
        productId: this.state.product.productId,
        productName: name.value,
        productType: type.value,
      };
      let json = JSON.stringify(body);

      axios({
        method: "put",
        url: "http://localhost:8080/productbilling/products",
        data: json,
        headers: { "Content-Type": "application/json" },
      }).then((resp) => {
        axios({
          method: "get",
          url: "http://localhost:8080/productbilling/products",
          headers: { "Content-Type": "application/json" },
        }).then((resp) => {
          localStorage.setItem("products", JSON.stringify(resp.data.data));
          this.props.history.push({
            pathname: "/home",
            userData: resp.data.data,
          });
        });
      });
    } else {
      if (name.value.length > 30) {
        name.value = "";
        name.placeholder = "Name is too long";
        name.style.border = "2px solid red";
      } else {
        type.value = "";
        type.placeholder = "Type is too long";
        type.style.border = "2px solid red";
      }
    }
  };
  render() {
    return (
      <>
        <form
          className="up card card-body col-md-6 offset-md-3 mt-5"
          onSubmit={this.submitHandler}
        >
          <h2 className="text-center mt-5 mb-5"> Update Product</h2>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={this.state.product.productName}
            required
            type="text"
            name="productName"
            className=" mt-2 mb-2"
          />
          <TextField
            id="type"
            label="Type"
            variant="outlined"
            required
            type="text"
            name="productType"
            className=" mt-2 mb-2"
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default withRouter(UpdateProduct);
