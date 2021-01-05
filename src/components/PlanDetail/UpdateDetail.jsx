import React, { Component } from 'react';
import { TextField } from "@material-ui/core";
import axios from "axios";
import "../Product/product.css";

class UpdateDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            detail:{}
         }
    }
    componentDidMount(){
        this.setState({detail:JSON.parse(localStorage.getItem("detail"))})
    }
    submitHandler = (e) => {
        e.preventDefault();
        const doctype = document.getElementById("type");
        const docdocument = document.getElementById("unit");
        if (doctype.value.length <= 30 && docdocument.value.length <= 10) {
          let object = {};
          let formData = new FormData(e.target);
          formData.forEach((value, key) => {
            object[key] = value;
          });
          object.plan=this.state.detail.plan
          let json = JSON.stringify(object);
          axios({
            method: "put",
            url: "http://localhost:8080/productbilling/plans/detail",
            data: json,
            headers: { "Content-Type": "application/json" }
          }).then(resp=>{
            axios({
                method: "get",
                url: `http://localhost:8080/productbilling/products/${this.state.detail.plan.product.productId}`,
                headers: { "Content-Type": "application/json" },
              }).then((resp) => {
                axios({
                  method: "get",
                  url: "http://localhost:8080/productbilling/products",
                  headers: { "Content-Type": "application/json" },
                }).then((resp) => {
                  axios({
                    method: "get",
                    url: `http://localhost:8080/productbilling/plans/plan/${this.state.detail.plan.planId}`,
                    headers: { "Content-Type": "application/json" },
                  }).then((resp) => {
                      localStorage.setItem("plandet", JSON.stringify(resp.data.data));
                      this.props.history.push({
                        pathname: "/details",
                      });
                    })
                  localStorage.setItem("products", JSON.stringify(resp.data.data));
                });
                localStorage.setItem("product", JSON.stringify(resp.data.data));
                // this.props.history.push({
                //   pathname: "/details",
                // });
              });
          })
        } else {
          if (doctype.value.length > 30) {
            doctype.value = "";
            doctype.placeholder = "Unrecognized Type";
          } else {
            docdocument.value = "";
            docdocument.placeholder = "Unrecognized Unit";
          }
        }
      };
    render() { 
        return ( 
            <>
                <form
          onSubmit={this.submitHandler}
          className="col-md-4 offset-md-4 card card-body mt-5 p-4"
        >
          <h2 className="text-center text-muted mt-5 mb-5">Update Detail</h2>
          <TextField
            id="type"
            label="Type"
            variant="outlined"
            required
            type="text"
            name="serviceType"
            value={this.state.detail.serviceType}
            className=" mt-2 mb-2"
          />

          <TextField
            id="detail"
            label="Detail"
            variant="outlined"
            required
            type="number"
            name="detail"
            className=" mt-2 mb-2"
          />

          <TextField
            id="unit"
            label="Unit"
            variant="outlined"
            type="text"
            required
            value={this.state.detail.unit}
            name="unit"
            className=" mt-2 mb-2"
          />

          <button className="btn btn-primary mt-5 mb-5" type="submit">
            Submit
          </button>
        </form>
            </>
         );
    }
}
 
export default UpdateDetail;