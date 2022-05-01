import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Modal, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import axios from "axios";

function Products() {
    const [data, setData] = useState('');
    let random_info = [{"pname": "p1", "pprice": 1.01, "pdescription": "description"},
        {"pname": "p2", "pprice": 1.01, "pdescription": "description"},
        {"pname": "p3", "pprice": 1.01, "pdescription": "description"},
        {"pname": "p4", "pprice": 1.01, "pdescription": "description"},
        {"pname": "p5", "pprice": 1.01, "pdescription": "description"},
        {"pname": "p6", "pprice": 1.01, "pdescription": "description"}];

    const getProducts = () => {
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Products/products")
            .then((response)=>{
                setData(response.data)
            })
    }

    useEffect(getProducts,[])

    if (!data) return null;


    return <Card.Group>
        <AllProducts info={data}/>
    </Card.Group>
}

export default Products;