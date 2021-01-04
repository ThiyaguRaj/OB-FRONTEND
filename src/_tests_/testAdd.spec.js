import React from 'react';
import {create} from 'react-test-renderer';
import Add from '../components/PlanDetail/AddDetail';

describe("Test add detail component",()=>{
    test("test from class",()=>{
        const root=create(<Add/>).root;
        const ele=root.findByType("form");
        expect(ele.props.className.includes("col-md-4")).toBe(true);
    })
})