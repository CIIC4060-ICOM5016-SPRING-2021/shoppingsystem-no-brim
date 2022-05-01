import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Modal, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import axios from "axios";

function WishList() {
    const [data, setData] = useState('');

    const getWishlist = () => {
        axios.get("https://db-class-22.herokuapp.com/NO-BRIM/Liked/liked_items/"+ localStorage.getItem("user_id"))
            .then((response)=>{
                setData(response.data)
            })
    }

    useEffect(getWishlist,[])

    if (!data) return null;


    return data.map(value => {return <Card>
        <Card.Content>
            <Card.Header>{value.products_name}</Card.Header>
            <Card.Meta>{value.products_price}</Card.Meta>
            <Card.Description>
                {value.products_description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
                <Button basic color='green'>
                    Remove
                </Button>
            </div>
        </Card.Content>
    </Card>});
}

export default WishList;