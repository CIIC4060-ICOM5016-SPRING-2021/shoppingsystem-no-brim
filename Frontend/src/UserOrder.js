import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Icon, Modal, Segment, Select, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import axios from "axios";

function UserOrder(props) {

    const [data, setData] = useState('');
    console.log(props.info)
    const [orderInfo, setOrderInfo] = useState(props.info[0]);
    props.info.shift()
    console.log(props.info)
    const [orderItems, setOrderItems] = useState(props.info)

    // console.log(orderInfo)
    // console.log(orderItems)



    let renderItems = orderItems.map( value =>
        <Card>
            <Card.Content>
                <Card.Header>{value.pname}</Card.Header>
                <Card.Meta>${value.price}</Card.Meta>
                <Card.Description>{value.quantity} bought</Card.Description>
            </Card.Content>

        </Card>)






    return<Segment>
       <b>Order On: {orderInfo.date_ordered}</b> Total Cost: ${orderInfo.total_cost}
        <Card.Group>

            {renderItems}


        </Card.Group>
    </Segment>

}

export default UserOrder;