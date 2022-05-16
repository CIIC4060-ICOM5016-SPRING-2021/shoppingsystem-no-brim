import React, {Component, useState} from 'react';
import {Button, Card, Container, Modal, Tab, Select, Icon} from "semantic-ui-react";
import axios from "axios";


function AllProducts(props) {
    // console.log(props)
    // props.info.forEach(value => console.log(value.name));

    const addWishlist = (value) => {
        console.log(value)
        let info = {"Product":value.product_id, "User": localStorage.getItem("user_id")}

        axios.post('https://db-class-22.herokuapp.com//NO-BRIM/Liked/liked_items/add', info)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    const addCart = (value) => {
        let info = {"Product":value.product_id, "User": localStorage.getItem("user_id"), "Quantity":1}

        axios.post('https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/add', info)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    return props.info.map(value => {return <Card>
        <Card.Content>
            <Card.Header>{value.name}</Card.Header>
            <Card.Meta style={{marginTop: '3%'}}><Icon name='dollar sign'/>{value.price}</Card.Meta>
            <Card.Description>
                {value.description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
                <Button animated='vertical' basic color='pink' onClick={() => addWishlist(value)}>
                    <Button.Content hidden>Add to Wish List</Button.Content>
                    <Button.Content visible>
                        <Icon name='like' />
                    </Button.Content>
                </Button>
                <Button animated='vertical' basic color='green' onClick={() => addCart(value)}>
                    <Button.Content hidden>Add to Cart</Button.Content>
                    <Button.Content visible>
                        <Icon name='shop' />
                    </Button.Content>
                </Button>
            </div>
        </Card.Content>
    </Card>});
}
export default AllProducts;