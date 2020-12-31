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
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import ViewCarouselRoundedIcon from '@material-ui/icons/ViewCarouselRounded';

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
            if (Array.isArray(resp.data.data)) {
                localStorage.setItem(
                    "products",
                    JSON.stringify(resp.data.data)
                );
                this.setState({ products: JSON.parse(localStorage.getItem("products")) });
            }
        }).catch(err => {
            let table = document.getElementById('tab');
            table.style.display = "none"
            document.getElementById('err').style.display = "block";
            document.getElementById('err').innerText = "No Products Found "
        })

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
                <Alert id="err" variant="filled" className="text-center p-4" severity="error"></Alert>
                <TableContainer component={Paper} className="mb-5 tablist ml-auto mr-auto" id="tab">
                    <Table aria-label="simple table">
                        <TableHead className="hd">
                            <TableRow>
                                <TableCell className="hng">Id</TableCell>
                                <TableCell className="hng" align="center">Name</TableCell>
                                <TableCell align="center" className="hng">Type</TableCell>
                                <TableCell className="hng" align="center">Details</TableCell>
                                <TableCell align="center" className="hng">Update</TableCell>
                                <TableCell align="center" className="hng">Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.products.map((detail) => (
                                    <TableRow key={detail.productId}>
                                        <TableCell component="td" scope="row">{detail.productId}</TableCell>
                                        <TableCell align="center">{detail.productName}</TableCell>
                                        <TableCell align="center">{detail.productType}</TableCell>
                                        <TableCell align="center"><button className="view" onClick={() => {
                                            localStorage.setItem(
                                                "product",
                                                JSON.stringify(detail)
                                            );
                                            this.props.history.push({
                                                pathname: "/view",
                                                userData: detail
                                            })
                                        }}><ViewCarouselRoundedIcon /></button></TableCell>
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
                                                }).catch(err => {
                                                    localStorage.setItem(
                                                        "products",
                                                        []
                                                    );
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