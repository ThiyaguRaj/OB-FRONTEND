import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import "../Product/product.css";

class AddDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      unit:''
    };
  }
  componentDidMount() {
    document.getElementById('type').focus();
    this.setState({ plan: JSON.parse(localStorage.getItem("plandet")) });
  }
  submitHandler = (e) => {
    e.preventDefault();
    const docdocument = document.getElementById("unit");
      let object = {};
      let formData = new FormData(e.target);
      formData.forEach((value, key) => {
        object[key] = value;
      });
      object.plan = this.state.plan;
      let json = JSON.stringify(object);
      axios({
        method: "post",
        url: "http://localhost:8080/productbilling/plans/detail",
        data: json,
        headers: { "Content-Type": "application/json" }
      }).then(resp => {
        axios({
          method: "get",
          url: `http://localhost:8080/productbilling/products/${this.state.plan.product.productId}`,
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
      }).catch(err => {
        if (err.response.data.error) {
          document.getElementById('detail').value = "";
          document.getElementById('detail').focus();

          let er = document.getElementById('err');
          er.style.display = "block";
          er.innerText = err.response.data.data;
        }
      })
    
  };
  handleChange = (event) => {
    this.setState({ type: event.target.value });
  };
  handleChangeUnit = (event) => {
    this.setState({ unit: event.target.value });
  };
  render() {
    return (
      <>
        <Alert id="err" className="text-center p-4" severity="error"></Alert>
        <form
          onSubmit={this.submitHandler}
          className="col-md-4 offset-md-4 card card-body mt-5 p-4"
        >
          <h2 className="text-center text-muted mt-5 mb-5">Detail</h2><hr />
          <FormControl className=" mt-2 mb-2" variant="outlined">
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select required
              labelId="demo-simple-select-outlined-label"
              id="type"
              name="serviceType"
              value={this.state.type}
              onChange={this.handleChange}
              label="Type"
            >
              <MenuItem value="Data">Data</MenuItem>
              <MenuItem value="SMS">Sms</MenuItem>
              <MenuItem value="Voice">Voice</MenuItem>
              <MenuItem value="Bedroom">Bedroom</MenuItem>
              <MenuItem value="Hall">Hall</MenuItem>
              <MenuItem value="Kitchen">Kitchen</MenuItem>
              <MenuItem value="Seat">Seat</MenuItem>
              <MenuItem value="Airbags">Airbags</MenuItem>
            </Select>
          </FormControl>

          <div className="row">
            <div className="col-md-6">
              <TextField
                id="detail"
                label="Detail"
                variant="outlined"
                required
                type="number"
                name="detail"
                className=" mt-2 mb-2"
              />
            </div>
            <div className="col-md-6">
              <FormControl className="unit mt-2 mb-2" variant="outlined">
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select required
                  id="unit"
                  name="unit"
                  value={this.state.unit}
                  onChange={this.handleChangeUnit}
                  label="Unit"
                >
                  <MenuItem value="GB">GB</MenuItem>
                  <MenuItem value="SMS">Sms</MenuItem>
                  <MenuItem value="Min">Min</MenuItem>
                  <MenuItem value="Room/s">Room/s</MenuItem>
                  <MenuItem value="Seat/s">Seat/s</MenuItem>
                  <MenuItem value="bag/s">bag/s</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <Button variant="contained" size="large" color="primary" type="submit" className="mt-4 mb-4">
            Submit
          </Button>
        </form>
      </>
    );
  }
}

export default AddDetail;
