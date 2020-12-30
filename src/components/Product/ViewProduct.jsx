import React, { Component } from "react";
import "./product.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
    };
  }
  componentDidMount() {
    this.setState({ detail: JSON.parse(localStorage.getItem("product")) });
    console.log(this.state.detail);
  }
  render() {
    return (
      <>
        <div className=" bg-dark pt-5 pb-5 text-center">
          <h1 className="text-center text-light">
            {this.state.detail.productName} ({this.state.detail.productType})
          </h1>
          <button
            className="funcb btn btn-outline-primary mt-5 mb-5 "
            onClick={() => {
              this.props.history.push({
                pathname: "/plan",
              });
            }}
          >
            Add Plan
          </button>
        </div>
        <div className="mainview card card-body col-md-10 offset-md-1 mt-5">
          {
            <>
              <div className="container">
                <TableContainer component={Paper} className="">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow className="tab text-light">
                        <TableCell>PlanAmount</TableCell>
                        <TableCell>PlanFrequency</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Update</TableCell>
                        <TableCell>Remove</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {JSON.parse(localStorage.getItem("product")).plan.map(
                        (plan) => (
                          <>
                            <TableRow key={plan.planId}>
                              <TableCell component="th" scope="row">
                                RS. {plan.planAmount}
                              </TableCell>
                              <TableCell>
                                {plan.planFrequency} Day/s
                              </TableCell>
                              <TableCell>{plan.type}</TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    plan.product = {
                                      productId: this.state.detail.productId,
                                    };
                                    localStorage.setItem(
                                      "upplan",
                                      JSON.stringify(plan)
                                    );
                                    this.props.history.push({
                                      pathname: "/updateplan",
                                    });
                                  }}
                                >
                                  Update
                                </Button>
                              </TableCell>
                              <TableCell>
                                <IconButton aria-label="delete"
                                  onClick={() => {
                                    axios({
                                      method: "delete",
                                      url: `http://localhost:8080/productbilling/plans/${plan.planId}`,
                                    }).then((resp) => {
                                      axios({
                                        method: "get",
                                        url: `http://localhost:8080/productbilling/products/${this.state.detail.productId}`,
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                      }).then((resp) => {
                                        axios({
                                          method: "get",
                                          url:
                                            "http://localhost:8080/productbilling/products",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                        }).then((resp) => {
                                          localStorage.setItem(
                                            "products",
                                            JSON.stringify(resp.data.data)
                                          );
                                        });
                                        localStorage.setItem(
                                          "product",
                                          JSON.stringify(resp.data.data)
                                        );
                                        this.props.history.push({
                                          pathname: "/view",
                                        });
                                      });
                                    });
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                            <div className="detail text-center mt-5">
                            </div>
                            <div className="box">
                              <div className="text-center">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className="btn btn-primary addbtn"
                                  onClick={() => {
                                    plan.product = {
                                      productId: this.state.detail.productId,
                                    };
                                    localStorage.setItem(
                                      "plandet",
                                      JSON.stringify(plan)
                                    );
                                    this.props.history.push({
                                      pathname: "/adddetail",
                                    });
                                  }}
                                >
                                  Add
                                          </Button>
                              </div>
                              <TableContainer
                                component={Paper}
                                className="smtab mt-1 mb-5"
                              >
                                <Table aria-label="simple table">
                                  <TableHead>
                                    <TableRow className="bg-dark tab text-light">
                                      <TableCell>Type</TableCell>
                                      <TableCell>
                                        Detail
                                      </TableCell>
                                      <TableCell>Unit</TableCell>
                                      <TableCell>
                                        Update
                                      </TableCell>
                                      <TableCell>
                                        Remove
                                      </TableCell>

                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {plan.detail.map((det) => (
                                      <TableRow>
                                        <TableCell>
                                          {det.serviceType}
                                        </TableCell>
                                        <TableCell>
                                          {det.detail}
                                        </TableCell>
                                        <TableCell>
                                          {det.unit.toUpperCase()}
                                        </TableCell>
                                        <TableCell>
                                          <Button
                                            variant="contained"
                                            color="primary" onClick={() => {
                                              det.plan = {
                                                planId: plan.planId,
                                                product: {
                                                  productId: this.state.detail.productId
                                                }
                                              }

                                              localStorage.setItem("detail", JSON.stringify(det));
                                              this.props.history.push("/updatedetail")
                                            }}>
                                            Update
                                          </Button>
                                        </TableCell>
                                        <TableCell>
                                          <IconButton aria-label="delete"
                                            onClick={() => {
                                              det.plan = {
                                                planId: plan.planId,
                                              };
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
                                                  url: `http://localhost:8080/productbilling/products/${this.state.detail.productId}`,
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
                                                  });
                                                  localStorage.setItem(
                                                    "product",
                                                    JSON.stringify(
                                                      resp.data.data
                                                    )
                                                  );
                                                  this.props.history.push({
                                                    pathname: "/view",
                                                  });
                                                });
                                              });
                                            }}
                                          >
                                            <DeleteIcon />
                                          </IconButton>
                                        </TableCell>
                                      </TableRow>
                                    ))}

                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <div className="text-center mt-1">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className="btn btn-primary addbtn"
                                  onClick={() => {
                                    plan.product = {
                                      productId: this.state.detail.productId,
                                    };
                                    localStorage.setItem(
                                      "plandet",
                                      JSON.stringify(plan)
                                    );
                                    this.props.history.push({
                                      pathname: "/addcharge",
                                    });
                                  }}
                                >
                                  Add
                              </Button>
                              </div>
                              <TableContainer component={Paper} className="mt-1">
                                <Table aria-label="simple table">
                                  <TableHead>
                                    <TableRow className="tab text-light">
                                      <TableCell>Type</TableCell>
                                      <TableCell>
                                        Charge
                                      </TableCell>
                                      <TableCell>
                                        Document
                                      </TableCell>
                                      <TableCell>
                                        Update
                                      </TableCell>
                                      <TableCell>
                                        Remove
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {plan.charge.map((det) => (
                                      <TableRow>
                                        <TableCell>
                                          {det.chargeType}
                                        </TableCell>
                                        <TableCell>
                                          RS. {det.charge}
                                        </TableCell>
                                        <TableCell>
                                          {det.document}
                                        </TableCell>
                                        <TableCell>
                                          <Button
                                            variant="contained"
                                            color="primary" onClick={() => {
                                              det.plan = {
                                                planId: plan.planId,
                                                product: {
                                                  productId: this.state.detail.productId
                                                }
                                              }
                                              localStorage.setItem("charge", JSON.stringify(det));
                                              this.props.history.push("/updatecharge")
                                            }}>
                                            Update
                                          </Button>
                                        </TableCell>
                                        <TableCell>
                                          <IconButton aria-label="delete" onClick={() => {
                                            det.plan = {
                                              planId: plan.planId,
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
                                                url: `http://localhost:8080/productbilling/products/${this.state.detail.productId}`,
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
                                                });
                                                localStorage.setItem(
                                                  "product",
                                                  JSON.stringify(
                                                    resp.data.data
                                                  )
                                                );
                                                this.props.history.push({
                                                  pathname: "/view",
                                                });
                                              });
                                            });
                                          }}>
                                            <DeleteIcon />
                                          </IconButton>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <div className="text-center mt-5">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className="btn btn-primary addbtn"
                                  onClick={() => {
                                    plan.product = {
                                      productId: this.state.detail.productId,
                                    };
                                    localStorage.setItem(
                                      "plandet",
                                      JSON.stringify(plan)
                                    );
                                    this.props.history.push({
                                      pathname: "/addoverdue",
                                    });
                                  }}
                                >
                                  Add
                              </Button>
                              </div>
                              <TableContainer
                                component={Paper}
                                className="mt-1 mb-5 smtab"
                              >
                                <Table aria-label="simple table">
                                  <TableHead>
                                    <TableRow className=" tab text-light">
                                      <TableCell>Type</TableCell>
                                      <TableCell>Service</TableCell>
                                      <TableCell>Unit</TableCell>
                                      <TableCell>Cost</TableCell>
                                      <TableCell>Update</TableCell>
                                      <TableCell>Remove</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {plan.due.map((det) => (
                                      <TableRow>
                                        <TableCell>{det.overageType}</TableCell>
                                        <TableCell>
                                          {det.overageService}
                                        </TableCell>
                                        <TableCell>{det.unit}</TableCell>
                                        <TableCell>RS. {det.serviceCost}</TableCell>
                                        <TableCell>
                                          <Button
                                            variant="contained"
                                            color="primary" onClick={() => {
                                              det.plan = {
                                                planId: plan.planId,
                                                product: {
                                                  productId: this.state.detail.productId
                                                }
                                              }
                                              localStorage.setItem("due", JSON.stringify(det));
                                              this.props.history.push("/updateoverdue")
                                            }}>
                                            Update
                                          </Button>
                                        </TableCell>
                                        <TableCell>
                                          <IconButton aria-label="delete" onClick={() => {
                                            det.plan = {
                                              planId: plan.planId,
                                            };
                                            axios({
                                              method: "delete",
                                              url:
                                                "http://localhost:8080/productbilling/plans/overdue",
                                              data: JSON.stringify(det),
                                              headers: {
                                                "Content-Type":
                                                  "application/json",
                                              },
                                            }).then((resp) => {
                                              axios({
                                                method: "get",
                                                url: `http://localhost:8080/productbilling/products/${this.state.detail.productId}`,
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
                                                });
                                                localStorage.setItem(
                                                  "product",
                                                  JSON.stringify(
                                                    resp.data.data
                                                  )
                                                );
                                                this.props.history.push({
                                                  pathname: "/view",
                                                });
                                              });
                                            });
                                          }}>
                                            <DeleteIcon />
                                          </IconButton>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer><hr/>
                            </div>
                          </>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          }
        </div>
      </>
    );
  }
}

export default withRouter(ViewProduct);
