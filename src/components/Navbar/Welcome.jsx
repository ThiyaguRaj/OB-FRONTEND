import React from 'react';
import { Link } from '@material-ui/core';
import './wel.css'

export default function Welcome(params) {
    return (
        <>
            <div className="con card card-body mt-0 bg-light">
                <div className="text-dark thd text-center mb-1">
                    <h1 className="head text-muted">
                        Lead to Revenue
                        Redefined
                </h1><hr />
                    <p className="text-center">
                        <small> An intelligent end-to-end
                        subscription management and
                    billing solution in ONE platform</small></p>
                </div>
            </div>
            <div className="con card card-body mt-2 bg-light">
                <div className="text-dark thd text-center mb-1">
                    <h1 className="head text-muted">
                        What we do ?
                </h1><hr />
                    <p className="text-center">
                        <small> In recent years, we have seen a significant shift where customers are increasingly wanting product experiences that are more optimized, instantaneous, flexible and streamlined.</small></p>
                </div>
            </div>
        </>
    )
}