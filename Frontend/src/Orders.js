import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Modal, Segment, Select, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import axios from "axios";
import UserOrder from "./UserOrder";

function Orders() {
    const [data, setData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const getOrders = () => {
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Order/orders/user/" + localStorage.getItem("user_id"))
            .then((response)=>{
                setData(response.data)
                // console.log(response.data)
            })
    }

    useEffect(getOrders,[])

    let orderItems = data.map ( value=>
        <div>
       <UserOrder info={value}/></div>

    )

    console.log(orderItems)

    if (!data) return null;


    return <Segment>


        <Card.Group>

            {orderItems}

        </Card.Group>
    </Segment>
}

export default Orders;