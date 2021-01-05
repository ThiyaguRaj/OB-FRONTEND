// import React, { Component } from "react";
// import "./product.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { withRouter } from "react-router-dom";
// import axios from "axios";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Button from '@material-ui/core/Button';

// class ViewProduct extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       detail: {},
//     };
//   }
//   componentDidMount() {
//     this.setState({ detail: JSON.parse(localStorage.getItem("product")) });
//     console.log(this.state.detail);
//   }
//   render() {
//     return (
//       <>
//         {/* <div className=" bg-light pt-5 pb-5 text-center comp"> */}
//           {/* <h1 className="text-center text-dark">
//             {this.state.detail.productName} ({this.state.detail.productType})
//           </h1> */}

//         {/* </div> */}
//         <Button variant="contained" size="large" color="primary" type="submit" className="ml-3"
//             onClick={() => {
//               this.props.history.push({
//                 pathname: "/plan",
//               });
//             }}
//           >
//             Add Plan
//           </Button>
//         <div className="mt-4">
//           {
//             <>
//               <div className="container">
//                 <TableContainer component={Paper} className="">
//                   <Table aria-label="simple table">
//                     <TableHead>
//                       <TableRow className="tab bg-dark">
//                         <TableCell className="hng">PlanAmount</TableCell>
//                         <TableCell className="hng">PlanFrequency</TableCell>
//                         <TableCell className="hng">Type</TableCell>
//                         <TableCell className="hng">Update</TableCell>
//                         <TableCell className="hng">Remove</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {JSON.parse(localStorage.getItem("product")).plan.map(
//                         (plan) => (
//                           <>
//                             <TableRow className="" key={plan.planId}>
//                               <TableCell component="th" scope="row">
//                                 RS. {plan.planAmount}
//                               </TableCell>
//                               <TableCell>
//                                 {plan.planFrequency} Day/s
//                               </TableCell>
//                               <TableCell>{plan.type}</TableCell>
//                               <TableCell>
//                                 <Button
//                                   variant="contained"
//                                   color="primary"
//                                   onClick={() => {
//                                     plan.product = {
//                                       productId: this.state.detail.productId,
//                                     };
//                                     localStorage.setItem(
//                                       "upplan",
//                                       JSON.stringify(plan)
//                                     );
//                                     this.props.history.push({
//                                       pathname: "/updateplan",
//                                     });
//                                   }}
//                                 >
//                                   Update
//                                 </Button>
//                               </TableCell>
//                               <TableCell>
//                                 <IconButton aria-label="delete"
//                                   onClick={() => {
//                                     axios({
//                                       method: "delete",
//                                       url: `http://localhost:8080/productbilling/plans/${plan.planId}`,
//                                     }).then((resp) => {
//                                       axios({
//                                         method: "get",
//                                         url: `http://localhost:8080/productbilling/products/${this.state.detail.productId}`,
//                                         headers: {
//                                           "Content-Type": "application/json",
//                                         },
//                                       }).then((resp) => {
//                                         axios({
//                                           method: "get",
//                                           url:
//                                             "http://localhost:8080/productbilling/products",
//                                           headers: {
//                                             "Content-Type": "application/json",
//                                           },
//                                         }).then((resp) => {
//                                           localStorage.setItem(
//                                             "products",
//                                             JSON.stringify(resp.data.data)
//                                           );
//                                         });
//                                         localStorage.setItem(
//                                           "product",
//                                           JSON.stringify(resp.data.data)
//                                         );
//                                         this.props.history.push({
//                                           pathname: "/view",
//                                         });
//                                       });
//                                     });
//                                   }}
//                                 >
//                                   <DeleteIcon />
//                                 </IconButton>
//                               </TableCell>
//                             </TableRow>
//                             <div className="detail text-center mt-5">
//                             </div>
//                             <div className="box">
//                               <div className="text-center">
//                                 <Button
//                                   variant="contained"
//                                   color="primary"
//                                   className="btn btn-primary addbtn"
//                                   onClick={() => {
//                                     plan.product = {
//                                       productId: this.state.detail.productId,
//                                     };
//                                     localStorage.setItem(
//                                       "plandet",
//                                       JSON.stringify(plan)
//                                     );
//                                     this.props.history.push({
//                                       pathname: "/adddetail",
//                                     });
//                                   }}
//                                 >
//                                   Add
//                                           </Button>
//                               </div>
//                               <TableContainer
//                                 component={Paper}
//                                 className="smtab mt-1 mb-5"
//                               >
//                                 <Table aria-label="simple table">
//                                   <TableHead>
//                                     <TableRow className=" tab bg-dark">
//                                       <TableCell className="hng" component="th" scope="row">Type</TableCell>
//                                       <TableCell className="hng">
//                                         Detail
//                                       </TableCell>
//                                       <TableCell className="hng" className="hng">Unit</TableCell>
//                                       <TableCell className="hng">
//                                         Update
//                                       </TableCell>
//                                       <TableCell className="hng">
//                                         Remove
//                                       </TableCell>

//                                     </TableRow>
//                                   </TableHead>
//                                   <TableBody>
//                                     {plan.detail.map((det) => (
//                                       <TableRow>
//                                         <TableCell>
//                                           {det.serviceType}
//                                         </TableCell>
//                                         <TableCell>
//                                           {det.detail}
//                                         </TableCell>
//                                         <TableCell>
//                                           {det.unit.toUpperCase()}
//                                         </TableCell>
//                                         <TableCell>
//                                           <Button
//                                             variant="contained"
//                                             color="primary" onClick={() => {
//                                               det.plan = {
//                                                 planId: plan.planId,
//                                                 product: {
//                                                   productId: this.state.detail.productId
//                                                 }
//                                               }

//                                               localStorage.setItem("detail", JSON.stringify(det));
//                                               this.props.history.push("/updatedetail")
//                                             }}>
//                                             Update
//                                           </Button>
//                                         </TableCell>
//                                         <TableCell>
//                                           <IconButton aria-label="delete"
//                                             onClick={() => {
//                                               det.plan = {
//                                                 planId: plan.planId,
//                                               };
//                                               axios({
//                                                 method: "delete",
//                                                 url:
//                                                   "http://localhost:8080/productbilling/plans/detail",
//                                                 data: JSON.stringify(det),
//                                                 headers: {
//                                                   "Content-Type":
//                                                     "application/json",
//                                                 },
//                                               }).then((resp) => {
//                                                 axios({
//                                                   method: "get",
//                                                   url: `http://localhost:8080/productbilling/products/${this.state.detail.productId}`,
//                                                   headers: {
//                                                     "Content-Type":
//                                                       "application/json",
//                                                   },
//                                                 }).then((resp) => {
//                                                   axios({
//                                                     method: "get",
//                                                     url:
//                                                       "http://localhost:8080/productbilling/products",
//                                                     headers: {
//                                                       "Content-Type":
//                                                         "application/json",
//                                                     },
//                                                   }).then((resp) => {
//                                                     localStorage.setItem(
//                                                       "products",
//                                                       JSON.stringify(
//                                                         resp.data.data
//                                                       )
//                                                     );
//                                                   });
//                                                   localStorage.setItem(
//                                                     "product",
//                                                     JSON.stringify(
//                                                       resp.data.data
//                                                     )
//                                                   );
//                                                   this.props.history.push({
//                                                     pathname: "/view",
//                                                   });
//                                                 });
//                                               });
//                                             }}
//                                           >
//                                             <DeleteIcon />
//                                           </IconButton>
//                                         </TableCell>
//                                       </TableRow>
//                                     ))}

//                                   </TableBody>
//                                 </Table>
//                               </TableContainer>
//                               <div className="text-center mt-1">
//                                 <Button
//                                   variant="contained"
//                                   color="primary"
//                                   className="btn btn-primary addbtn"
//                                   onClick={() => {
//                                     plan.product = {
//                                       productId: this.state.detail.productId,
//                                     };
//                                     localStorage.setItem(
//                                       "plandet",
//                                       JSON.stringify(plan)
//                                     );
//                                     this.props.history.push({
//                                       pathname: "/addcharge",
//                                     });
//                                   }}
//                                 >
//                                   Add
//                               </Button>
//                               </div>
//                               <TableContainer component={Paper} className="mt-1">
//                                 <Table aria-label="simple table">
//                                   <TableHead>
//                                     <TableRow className="tab bg-dark">
//                                       <TableCell className="hng">Type</TableCell>
//                                       <TableCell className="hng">
//                                         Charge
//                                       </TableCell>
//                                       <TableCell className="hng">
//                                         Document
//                                       </TableCell>
//                                       <TableCell className="hng">
//                                         Update
//                                       </TableCell>
//                                       <TableCell className="hng">
//                                         Remove
//                                       </TableCell>
//                                     </TableRow>
//                                   </TableHead>
//                                   <TableBody>
//                                     {plan.charge.map((det) => (
//                                       <TableRow>
//                                         <TableCell>
//                                           {det.chargeType}
//                                         </TableCell>
//                                         <TableCell>
//                                           RS. {det.charge}
//                                         </TableCell>
//                                         <TableCell>
//                                           {det.document}
//                                         </TableCell>
//                                         <TableCell>
//                                           <Button
//                                             variant="contained"
//                                             color="primary" onClick={() => {
//                                               det.plan = {
//                                                 planId: plan.planId,
//                                                 product: {
//                                                   productId: this.state.detail.productId
//                                                 }
//                                               }
//                                               localStorage.setItem("charge", JSON.stringify(det));
//                                               this.props.history.push("/updatecharge")
//                                             }}>
//                                             Update
//                                           </Button>
//                                         </TableCell>
//                                         <TableCell>
//                                           <IconButton aria-label="delete" onClick={() => {
//                                             det.plan = {
//                                               planId: plan.planId,
//                                             };
//                                             axios({
//                                               method: "delete",
//                                               url:
//                                                 "http://localhost:8080/productbilling/plans/charge",
//                                               data: JSON.stringify(det),
//                                               headers: {
//                                                 "Content-Type":
//                                                   "application/json",
//                                               },
//                                             }).then((resp) => {
//                                               axios({
//                                                 method: "get",
//                                                 url: `http://localhost:8080/productbilling/products/${this.state.detail.productId}`,
//                                                 headers: {
//                                                   "Content-Type":
//                                                     "application/json",
//                                                 },
//                                               }).then((resp) => {
//                                                 axios({
//                                                   method: "get",
//                                                   url:
//                                                     "http://localhost:8080/productbilling/products",
//                                                   headers: {
//                                                     "Content-Type":
//                                                       "application/json",
//                                                   },
//                                                 }).then((resp) => {
//                                                   localStorage.setItem(
//                                                     "products",
//                                                     JSON.stringify(
//                                                       resp.data.data
//                                                     )
//                                                   );
//                                                 });
//                                                 localStorage.setItem(
//                                                   "product",
//                                                   JSON.stringify(
//                                                     resp.data.data
//                                                   )
//                                                 );
//                                                 this.props.history.push({
//                                                   pathname: "/view",
//                                                 });
//                                               });
//                                             });
//                                           }}>
//                                             <DeleteIcon />
//                                           </IconButton>
//                                         </TableCell>
//                                       </TableRow>
//                                     ))}
//                                   </TableBody>
//                                 </Table>
//                               </TableContainer>
//                               <div className="text-center mt-5">
//                                 <Button
//                                   variant="contained"
//                                   color="primary"
//                                   className="btn btn-primary addbtn"
//                                   onClick={() => {
//                                     plan.product = {
//                                       productId: this.state.detail.productId,
//                                     };
//                                     localStorage.setItem(
//                                       "plandet",
//                                       JSON.stringify(plan)
//                                     );
//                                     this.props.history.push({
//                                       pathname: "/addoverdue",
//                                     });
//                                   }}
//                                 >
//                                   Add
//                               </Button>
//                               </div>
//                               <TableContainer
//                                 component={Paper}
//                                 className="mt-1 mb-5 smtab"
//                               >
//                                 <Table aria-label="simple table">
//                                   <TableHead>
//                                     <TableRow className="bg-dark">
//                                       <TableCell className="hng">Type</TableCell>
//                                       <TableCell className="hng">Service</TableCell>
//                                       <TableCell className="hng">Unit</TableCell>
//                                       <TableCell className="hng">Cost</TableCell>
//                                       <TableCell className="hng">Update</TableCell>
//                                       <TableCell className="hng">Remove</TableCell>
//                                     </TableRow>
//                                   </TableHead>
//                                   <TableBody>
//                                     {plan.due.map((det) => (
//                                       <TableRow>
//                                         <TableCell>{det.overageType}</TableCell>
//                                         <TableCell>
//                                           {det.overageService}
//                                         </TableCell>
//                                         <TableCell>{det.unit}</TableCell>
//                                         <TableCell>RS. {det.serviceCost}</TableCell>
//                                         <TableCell>
//                                           <Button
//                                             variant="contained"
//                                             color="primary" onClick={() => {
//                                               det.plan = {
//                                                 planId: plan.planId,
//                                                 product: {
//                                                   productId: this.state.detail.productId
//                                                 }
//                                               }
//                                               localStorage.setItem("due", JSON.stringify(det));
//                                               this.props.history.push("/updateoverdue")
//                                             }}>
//                                             Update
//                                           </Button>
//                                         </TableCell>
//                                         <TableCell>
//                                           <IconButton aria-label="delete" onClick={() => {
//                                             det.plan = {
//                                               planId: plan.planId,
//                                             };
//                                             axios({
//                                               method: "delete",
//                                               url:
//                                                 "http://localhost:8080/productbilling/plans/overdue",
//                                               data: JSON.stringify(det),
//                                               headers: {
//                                                 "Content-Type":
//                                                   "application/json",
//                                               },
//                                             }).then((resp) => {
//                                               axios({
//                                                 method: "get",
//                                                 url: `http://localhost:8080/productbilling/products/${this.state.detail.productId}`,
//                                                 headers: {
//                                                   "Content-Type":
//                                                     "application/json",
//                                                 },
//                                               }).then((resp) => {
//                                                 axios({
//                                                   method: "get",
//                                                   url:
//                                                     "http://localhost:8080/productbilling/products",
//                                                   headers: {
//                                                     "Content-Type":
//                                                       "application/json",
//                                                   },
//                                                 }).then((resp) => {
//                                                   localStorage.setItem(
//                                                     "products",
//                                                     JSON.stringify(
//                                                       resp.data.data
//                                                     )
//                                                   );
//                                                 });
//                                                 localStorage.setItem(
//                                                   "product",
//                                                   JSON.stringify(
//                                                     resp.data.data
//                                                   )
//                                                 );
//                                                 this.props.history.push({
//                                                   pathname: "/view",
//                                                 });
//                                               });
//                                             });
//                                           }}>
//                                             <DeleteIcon />
//                                           </IconButton>
//                                         </TableCell>
//                                       </TableRow>
//                                     ))}
//                                   </TableBody>
//                                 </Table>
//                               </TableContainer>
//                             </div>
//                           </>
//                         )
//                       )}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </div>
//             </>
//           }
//         </div>
//       </>
//     );
//   }
// }

// export default withRouter(ViewProduct);


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
import { Alert } from '@material-ui/lab';

class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
    };
  }
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("product")).plan === []) {
      document.getElementById("plans").style.display = "none";
      let er = document.getElementById('err');
      er.style.display = "block";
      er.innerText = "No plans found";
    }
    this.setState({ detail: JSON.parse(localStorage.getItem("product")) });
  }
  // componentWillUnmount() {
  //   localStorage.removeItem("plandet")
  // }
  render() {
    return (
      <>
        <Alert id="err" className="text-center p-4" severity="error"></Alert>
        <div className="mt-4" id="plans">
          {
            <>
              <div className="container">
                <TableContainer component={Paper} className="">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow className="tab">
                        <TableCell className="hng">PlanAmount</TableCell>
                        <TableCell className="hng">PlanFrequency</TableCell>
                        <TableCell className="hng">Type</TableCell>
                        <TableCell className="hng">Update</TableCell>
                        <TableCell className="hng">Remove</TableCell>
                        <TableCell className="hng">Detail</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {JSON.parse(localStorage.getItem("product")).plan.map(
                        (plan) => (
                          <>
                            <TableRow className="" key={plan.planId}>
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
                                  size="small"
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
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  className=""
                                  onClick={() => {
                                    plan.product = {
                                      productId: this.state.detail.productId,
                                    };
                                    localStorage.setItem(
                                      "plandet",
                                      JSON.stringify(plan)
                                    );
                                    this.props.history.push({
                                      pathname: "/details",
                                    });
                                  }}
                                >
                                  Details
                                          </Button>
                              </TableCell>
                            </TableRow>

                            {/* <div className="box">
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
                                    <TableRow className=" tab bg-dark">
                                      <TableCell className="hng" component="th" scope="row">Type</TableCell>
                                      <TableCell className="hng">
                                        Detail
                                      </TableCell>
                                      <TableCell className="hng" className="hng">Unit</TableCell>
                                      <TableCell className="hng">
                                        Update
                                      </TableCell>
                                      <TableCell className="hng">
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
                                    <TableRow className="tab bg-dark">
                                      <TableCell className="hng">Type</TableCell>
                                      <TableCell className="hng">
                                        Charge
                                      </TableCell>
                                      <TableCell className="hng">
                                        Document
                                      </TableCell>
                                      <TableCell className="hng">
                                        Update
                                      </TableCell>
                                      <TableCell className="hng">
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
                                    <TableRow className="bg-dark">
                                      <TableCell className="hng">Type</TableCell>
                                      <TableCell className="hng">Service</TableCell>
                                      <TableCell className="hng">Unit</TableCell>
                                      <TableCell className="hng">Cost</TableCell>
                                      <TableCell className="hng">Update</TableCell>
                                      <TableCell className="hng">Remove</TableCell>
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
                              </TableContainer>
                            </div> */}
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