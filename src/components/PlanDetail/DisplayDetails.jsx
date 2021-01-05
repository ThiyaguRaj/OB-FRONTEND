import React, { Component } from 'react';
import axios from 'axios';
import { Table } from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import '../Product/product.css'

class DisplayDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    componentDidMount() {
        this.setState({ data: JSON.parse(localStorage.getItem("plandet")) });
    }
    render() {
        return (
            <>
                <div className="row">
                    <div className="col-md-6">
                        <Table responsive className="mb-5 tablist ml-auto mr-auto">
                            <thead>
                                <tr className="tab text-light">
                                    <th>Type</th>
                                    <th>
                                        Detail
                                      </th>
                                    <th>Unit</th>
                                    <th>
                                        Update
                                      </th>
                                    <th>
                                        Remove
                                      </th>

                                </tr>
                            </thead>
                            <tbody>
                                {JSON.parse(localStorage.getItem("plandet")).detail.map((det) => (
                                    <tr>
                                        <td>
                                            {det.serviceType}
                                        </td>
                                        <td>
                                            {det.detail}
                                        </td>
                                        <td>
                                            {det.unit.toUpperCase()}
                                        </td>
                                        <td>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary" onClick={() => {
                                                    det.plan = {
                                                        planId: this.state.data.planId,
                                                        product: {
                                                            productId: JSON.parse(localStorage.getItem("product")).productId
                                                        }
                                                    }

                                                    localStorage.setItem("detail", JSON.stringify(det));
                                                    this.props.history.push("/updatedetail")
                                                }}>
                                                Update
                                          </Button>
                                        </td>
                                        <td>
                                            <IconButton aria-label="delete"
                                                onClick={() => {
                                                    det.plan = {
                                                        planId: this.state.data.planId,
                                                    };
                                                    console.log(det);

                                                    axios({
                                                        method: "delete",
                                                        url:
                                                            "http://localhost:8080/productbilling/plans/detail",
                                                        data: JSON.stringify(det),
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json",
                                                        },
                                                    }).then((resp) => {
                                                        axios({
                                                            method: "get",
                                                            url: `http://localhost:8080/productbilling/products/${JSON.parse(localStorage.getItem("product")).productId}`,
                                                            headers: {
                                                                "Content-Type":
                                                                    "application/json",
                                                            },
                                                        }).then((resp) => {
                                                            axios({
                                                                method: "get",
                                                                url:
                                                                    "http://localhost:8080/productbilling/products",
                                                                headers: {
                                                                    "Content-Type":
                                                                        "application/json",
                                                                },
                                                            }).then((resp) => {
                                                                localStorage.setItem(
                                                                    "products",
                                                                    JSON.stringify(
                                                                        resp.data.data
                                                                    )
                                                                );
                                                                axios({
                                                                    method: 'get',
                                                                    url:
                                                                        `http://localhost:8080/productbilling/plans/plan/${this.state.data.planId}`,
                                                                    headers: {
                                                                        "Content-Type":
                                                                            "application/json",
                                                                    }
                                                                }).then(resp => {
                                                                    let val = resp.data.data;
                                                                    val.product = {
                                                                        productId: JSON.parse(localStorage.getItem("product")).productId
                                                                    }
                                                                    localStorage.setItem(
                                                                        "plan",
                                                                        JSON.stringify(val)
                                                                    );
                                                                    localStorage.setItem(
                                                                        "plandet",
                                                                        JSON.stringify(resp.data.data)

                                                                    );
                                                                    this.props.history.push({
                                                                        pathname: "/details",
                                                                    });
                                                                })
                                                            });
                                                            localStorage.setItem(
                                                                "product",
                                                                JSON.stringify(
                                                                    resp.data.data
                                                                )
                                                            );
                                                        });
                                                    })
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </div>
                    <div className="col-md-6">
                        <Table responsive className="mb-5 tablist ml-auto mr-auto">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>
                                        Charge
                                      </th>
                                    <th>
                                        Document
                                      </th>
                                    <th>
                                        Update
                                      </th>
                                    <th>
                                        Remove
                                      </th>
                                </tr>
                            </thead>
                            <tbody>
                                {JSON.parse(localStorage.getItem("plandet")).charge.map((det) => (
                                    <tr>
                                        <td>
                                            {det.chargeType}
                                        </td>
                                        <td>
                                            RS. {det.charge}
                                        </td>
                                        <td>
                                            {det.document}
                                        </td>
                                        <td>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary" onClick={() => {
                                                    det.plan = {
                                                        planId: this.state.data.planId,
                                                        product: {
                                                            productId: JSON.parse(localStorage.getItem("product")).productId
                                                        }
                                                    }
                                                    localStorage.setItem("charge", JSON.stringify(det));
                                                    this.props.history.push("/updatecharge")
                                                }}>
                                                Update
                                          </Button>
                                        </td>
                                        <td>
                                            <IconButton aria-label="delete" onClick={() => {
                                                det.plan = {
                                                    planId: this.state.data.planId,
                                                };
                                                axios({
                                                    method: "delete",
                                                    url:
                                                        "http://localhost:8080/productbilling/plans/charge",
                                                    data: JSON.stringify(det),
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                }).then((resp) => {
                                                    axios({
                                                        method: "get",
                                                        url: `http://localhost:8080/productbilling/products/${JSON.parse(localStorage.getItem("product")).productId}`,
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json",
                                                        },
                                                    }).then((resp) => {
                                                        axios({
                                                            method: "get",
                                                            url:
                                                                "http://localhost:8080/productbilling/products",
                                                            headers: {
                                                                "Content-Type":
                                                                    "application/json",
                                                            },
                                                        }).then((resp) => {
                                                            localStorage.setItem(
                                                                "products",
                                                                JSON.stringify(
                                                                    resp.data.data
                                                                )
                                                            );
                                                            this.props.history.push({
                                                                pathname: "/view",
                                                            });
                                                        });
                                                        localStorage.setItem(
                                                            "product",
                                                            JSON.stringify(
                                                                resp.data.data
                                                            )
                                                        );
                                                        
                                                    });
                                                });
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                </div>
            </div>
            </>
        );
    }
}

export default DisplayDetails;