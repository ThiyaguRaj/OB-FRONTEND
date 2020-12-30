import React, { Component } from 'react';
import axios from 'axios';
import './product.css';
import { withRouter } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';  

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            render: false
        }
    }
    componentDidMount() {
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
        this.setState({ products: JSON.parse(localStorage.getItem("products")) });
    }
    clickFunc = () => {
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
        this.setState({ products: JSON.parse(localStorage.getItem("products")) });
    }

    render() {
        return (
            <>
                <TableContainer component={Paper} className="mt-5 mb-5 tablist ml-auto mr-auto mt-5">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow className="bg-dark text-light">
                                <TableCell>Id</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Type</TableCell>
                                <TableCell align="center">Details</TableCell>
                                <TableCell align="center">Update</TableCell>
                                <TableCell align="center">Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.products.map((detail) => (
                                    <TableRow key={detail.productId}>
                                        <TableCell component="td" scope="row">{detail.productId}</TableCell>
                                        <TableCell align="center">{detail.productName}</TableCell>
                                        <TableCell align="center">{detail.productType}</TableCell>
                                        <TableCell align="center"><button className="btn btn-success" onClick={() => {
                                            localStorage.setItem(
                                                "product",
                                                JSON.stringify(detail)
                                            );
                                            this.props.history.push({
                                                pathname: "/view",
                                                userData: detail
                                            })
                                        }}>View</button></TableCell>
                                        <TableCell align="center"><Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                            localStorage.setItem("uppro", JSON.stringify(detail))
                                            this.props.history.push({
                                                pathname: "/update",
                                            })
                                        }}>Update</Button></TableCell>
                                        
                                        <TableCell align="center"><IconButton aria-label="delete" onClick={() => {
                                            axios({
                                                method: 'delete',
                                                url: `http://localhost:8080/productbilling/products/${detail.productId}`,
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
                                                    this.clickFunc();
                                                })
                                            })
                                        }}> <DeleteIcon /> </IconButton></TableCell>

                                    </TableRow>
                                )
                                )
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default withRouter(ProductList);