import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Modal, Tab} from "semantic-ui-react";
import axios from "axios";


function Cart() {
    const [data, setData,cartData] = useState('');

    const getCart = () => {
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/" + localStorage.getItem("user_id"))
            .then((response)=>{
                setData(response.data)
            })
    }

    const deleteCartItem = (id) => {
        axios.delete("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/delete/" 
        +id).then((response)=>{
                setData(response.data)
            })
    }

    useEffect(getCart,[])

    if (!data) return null;


    return data.map(value => {return <Card>
        <Card.Content>
            <Card.Header>{value.quantity}</Card.Header>
            <Card.Meta>{value.products_price}</Card.Meta>
            <Card.Description>
                {value.products_description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
                <Button onClick={() => deleteCartItem(value.cart_item_id)} basic color='green'>
                    Remove
                </Button>
            </div>
        </Card.Content>
    </Card>});
}

export default Cart;