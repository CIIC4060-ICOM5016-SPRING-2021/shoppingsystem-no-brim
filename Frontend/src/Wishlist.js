import React, {useEffect, useState} from 'react';
import {Button, Card, Grid, GridColumn, GridRow, Icon} from "semantic-ui-react";
import axios from "axios";

function WishList() {
    const [data, setData] = useState('');

    const getWishlist = () => {
        axios.get("https://db-class-22.herokuapp.com/NO-BRIM/Liked/liked_items/"+ localStorage.getItem("user_id"))
            .then((response)=>{
                setData(response.data)
            })
    }

    const addToCart = (value) => {
        let itemToAdd = {"Product":value.product_id, "User": localStorage.getItem("user_id"), "Quantity":1}
        axios.post("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/add", itemToAdd)
            .then(res => {
                console.log(res);
                console.log(res.data);
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

    let username = localStorage.getItem("username");
    username = username.replace(/"/g, '');
    let wishlistItems = null;

    wishlistItems =
        data.map(value =>
            <Card>
                <Card.Content>
                    <Card.Header>{value.products_name}</Card.Header>
                    <Card.Meta>{value.products_price}</Card.Meta>
                    <Card.Description>
                        {value.products_description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button animated='vertical' basic color='green' onClick={() => addToCart(value)}>
                            <Button.Content hidden>Add to Cart</Button.Content>
                            <Button.Content visible>
                                <Icon name='shop' />
                            </Button.Content>
                        </Button>
                        <Button animated='vertical' basic color='red' onClick={() => removeFromWishlist(value.liked_item_id)}>
                            <Button.Content hidden>Remove</Button.Content>
                            <Button.Content visible>
                                <Icon name='trash alternate' />
                            </Button.Content>
                        </Button>
                    </div>
                </Card.Content>
            </Card>)

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column width={12}>
                    <h1 style={{marginTop: "1%", marginBottom: '2%', textAlign: 'center'}}>Items in {username}'s wishlist:</h1>
                    <Card.Group centered>
                        {wishlistItems}
                    </Card.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

   
}

export default WishList;