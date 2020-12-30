import React from 'react';
import './nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from '../Product/AddProduct';
import Product from '../Product/Product';
import { NavLink, Route } from 'react-router-dom';
import View from '../Product/ViewProduct';
import Update from '../Product/UpdateProduct';
import Remove from '../Product/RemoveProduct';
import List from '../Product/ProductList';
import Plan from '../Product/AddPlan';
import PlanUpdate from '../Plan/UpdatePlan'
import AddCharge from '../PlanDetail/AddCharge';
import AddDetail from '../PlanDetail/AddDetail';
import AddOverdue from '../PlanDetail/AddOverdue';
import UpdateCharge from '../PlanDetail/UpdateCharge';
import UpdateDetail from '../PlanDetail/UpdateDetail';
import UpdateOverdue from '../PlanDetail/UpdateOverdue';


function Nav(props){
    return(
        <>
        <div className="main">
            <nav class="navbar navbar-light text-light bg-dark">
                <div class="container ">
                    <NavLink to="/" className="ml-auto btnlog"><button className="mt-2 mb-2 mr-0 float-right btn btn-dark sigbtn">Home</button></NavLink>
                </div>
            </nav>
        </div>  
        <Route exact path="/" component={Product}/> 
        <Route path="/product" component={AddProduct}/> 
        <Route path="/update" component={Update}/> 
        <Route path="/view" component={View}/> 
        <Route path="/remove" component={Remove}/> 
        <Route path="/products" component={List}/> 
        <Route path="/home" component={Product}/> 
        <Route path="/plan" component={Plan}/> 
        <Route path="/updateplan" component={PlanUpdate}/> 
        <Route path="/addcharge" component={AddCharge}/> 
        <Route path="/adddetail" component={AddDetail}/> 
        <Route path="/addoverdue" component={AddOverdue}/> 
        <Route path="/updatecharge" component={UpdateCharge}/> 
        <Route path="/updatedetail" component={UpdateDetail}/> 
        <Route path="/updateoverdue" component={UpdateOverdue}/> 

        </>
    );
}
 
export default Nav;