import React, { Component } from 'react';
import './product.css';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { TextField } from '@material-ui/core';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            data: {}
        }
    }
    setName = (e) => {
        this.setState({ name: e.target.value });
    }
    setType = (e) => {
        this.setState({ type: e.target.value });
    }
    submitHandler = (event) => {
        event.preventDefault();
        let name = document.getElementById('name')
        let type = document.getElementById('type')
        if (name.value.length <= 30 && type.value.length <= 30) {
            var body = {
                productName: this.state.name,
                productType: this.state.type
            }
            let json = JSON.stringify(body);

            axios({
                method: 'post',
                url: 'http://localhost:8080/productbilling/products',
                data: json,
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
                    this.props.history.push({
                        pathname: "/products"
                    });
                })

            })
        } else {
            if (name.value.length > 30) {
                name.value = "";
                name.placeholder = "Name is too long"
            } else {
                type.value = "";
                type.placeholder = "Type is too long"
            }
        }
    }
    render() {
        return (
            <>

                <div className="logalert mt-5 bg-danger" id="err">
                    <span className="closebtn ml-auto">
                        <button className="float-right" onClick={() => { document.getElementById("err").style.display = "none"; }}
                        >
                            &times;
                 </button>
                    </span>
                    <label id="msg" className="text-center"></label>
                </div>
                <form id="frm" className="col-md-4 offset-md-4 card card-body mb-5 mt-5 p-4" onSubmit={this.submitHandler}>
                    <h2 className="text-muted">Product</h2>
                    <TextField id="name" label="Name" placeholder="Enter Product Name" variant="outlined" required type="text" onChange={this.setName} className=" mt-4 mb-4" />
                    <TextField id="type" label="Type" placeholder="Enter Product Type" variant="outlined" required type="text" onChange={this.setType} className=" mb-4" />
                    <button type="submit" className="btn mt-4 mb-4 btn-primary">
                        Submit
                    </button>
                </form>
            </>
        );
    }
}

export default withRouter(AddProduct);