import React, {useEffect, useState} from 'react';
import {Button, Card} from "semantic-ui-react";
import axios from "axios";

function WishList() {
    const [data, setData] = useState('');

    const getWishlist = () => {
        axios.get("https://db-class-22.herokuapp.com/NO-BRIM/Liked/liked_items/"+ localStorage.getItem("user_id"))
            .then((response)=>{
                setData(response.data)
            })
    }

    // Need to test
    const addToCart = (value) => {
        let itemToAdd = {"Product":value.product_id, "User": localStorage.getItem("user_id"), "Quantity":1}
        axios.post("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/add/", itemToAdd)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    // Need to test
    const removeFromWishlist = (liked_item_id) => {
        axios.delete("https://db-class-22.herokuapp.com/NO-BRIM/Liked/liked_items/delete/"+ liked_item_id)
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
                <Button basic color='green' onClick={() => addToCart(value)}>
                    Add to cart
                </Button>
                <Button basic color='red' onClick={() => removeFromWishlist(value.liked_item_id)}>
                    Remove
                </Button>
            </div>
        </Card.Content>
    </Card>});
}

export default WishList;