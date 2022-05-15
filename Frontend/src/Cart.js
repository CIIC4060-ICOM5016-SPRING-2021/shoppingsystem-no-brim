import React, {Component, useEffect, useState} from 'react';
import {Card, Grid, Segment} from "semantic-ui-react";
import axios from "axios";
import { Button,Icon,Confirm} from 'semantic-ui-react';

function Cart() {

    // window.state = { open: false }
    // window.open = () => this.setState({ open: true })
    // window.close = () => this.setState({ open: false })

   
    const [data, setData,cartData] = useState("");
    let cartItems = null; 

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

    function refreshPage() {
        window.location.reload(false);
      }

    // const deleteCartItem = async (id) =>{
    //     await axios.delete("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/delete/" 
    //     +id)
    //     const newCart = data.filter((data) => {
    //         return 
    //     });
    //     setData(newCart); 
    // }

    const clearCart = () =>{
        axios.delete("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/clear/"+localStorage.getItem("user_id"))
        .then((response)=>{
            setData(response.data)
        })
    }


    useEffect(getCart,[])  //Posible URL in empty brackets


    if (!data) return null;

    let username = localStorage.getItem("username");
    username = username.replace(/"/g, '');

    let user_cart = null
    user_cart = getCart(localStorage.getItem("user_id"))
    let cart_subtotal = 0
    // if (user_cart){
    //     for (const item of user_cart){
    //         cart_subtotal += item.products_price;
    //     }
    // }

    
    cartItems= 
        data.map( value =>
            <Card>
                <Card.Content>
                    <Card.Header>{value.products_name}</Card.Header>
                    <Card.Meta>{value.products_price}</Card.Meta>
                    <Card.Description>{value.quantity} in your cart</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button fluid animated='vertical' size="big" basic color = "red" onClick={() => [deleteCartItem(value.cart_item_id),refreshPage()]}>
                        <Button.Content hidden>Remove</Button.Content>
                        <Button.Content visible>
                        <Icon name='trash alternate'/>
                        </Button.Content>
                    </Button>
                </Card.Content>
            </Card>)

    console.log(user_cart.data);


        return(
            <Grid centered>
                <Grid.Row columns={2}>
                    <Grid.Column width={12}>
                        <h1 style={{marginTop: "1%", marginBottom: '2%', textAlign: 'center'}}>Items in {username}'s cart:</h1>
                        <Card.Group centered>
                            {cartItems}
                        </Card.Group>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Segment>
                            <h2>Subtotal: </h2>
                            <Button style={{width: "100%"}} animated="vertical" size='massive' basic color='red'
                                    onClick={()=> clearCart()}>
                                <Button.Content hidden>Clear Cart</Button.Content>
                                <Button.Content visible>
                                    <Icon name='remove circle'/>
                                </Button.Content>
                            </Button>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
}


export default Cart;
