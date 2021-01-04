import React from 'react';
import { create } from 'react-test-renderer';
import Nav from '../components/Navbar/Nav';

describe("Test nav Component",()=>{
    test("test button",()=>{
        const root=create(<Nav/>).root;
        const ele=root.findAllByType("button");
        expect(ele.props.className.includes("sigbtn")).toBe(true);
    })
})