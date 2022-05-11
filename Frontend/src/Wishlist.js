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

    // Need to work on this method because this method uses a json response to identify which item to add to cart
    const addToCart = () => {
        axios.post("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/add/")
            .then((response)=>{
                setData(response.data)
            })
    }

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
                <Button basic color='green' onClick={() => addToCart(value)}> // Must fix
                    Add to cart
                </Button>
                <Button basic color='red' onClick={() => removeFromWishlist(value.liked_item_id)}> // Figure out how to redirect
                    Remove
                </Button>
            </div>
        </Card.Content>
    </Card>});
}

export default WishList;