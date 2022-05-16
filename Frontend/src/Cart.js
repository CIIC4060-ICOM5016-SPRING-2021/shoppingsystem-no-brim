import React, {Component, useEffect, useState} from 'react';
import {Card, Grid, Input, Segment} from "semantic-ui-react";
import axios from "axios";
import { Button,Icon,Confirm} from 'semantic-ui-react';


function Cart() {

    // window.state = { open: false }
    // window.open = () => this.setState({ open: true })
    // window.close = () => this.setState({ open: false })

   
    const [data, setData,cartData] = useState("");
    let cartItems = null;
    let user_cart = null;


    const getCart = () => {
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/" + localStorage.getItem("user_id"))
            .then((response)=>{
                setData(response.data)
            })
    }

    const deleteCartItem = (id) => {
        axios.delete("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/delete/" 
        +id).then((response)=>{
            axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/" + localStorage.getItem("user_id"))
                .then((response)=>{
                    setData(response.data)
                })
            })
    }

    const buyCart = () => {
        axios.post("https://db-class-22.herokuapp.com//NO-BRIM/Order/buy-cart/" + localStorage.getItem("user_id"))
            .then((response)=>{
                axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/" + localStorage.getItem("user_id"))
                    .then((response)=>{
                        setData(response.data)
                    })
            })
    }

    const updateCart = () => {
        axios.put("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/update/" + localStorage.getItem("cart_item_id"))
            .then((response)=>{
                setData(response.data)
            })
    }

    const handleChange = (event) => {
        const quantity = event.target.quantity;
        const value = event.target.value;

    }


    function refreshPage() {
        window.location.reload(false);
      }

    const clearCart = () =>{
        axios.delete("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/clear/"+localStorage.getItem("user_id"))
        .then((response)=>{
            axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/" + localStorage.getItem("user_id"))
                .then((response)=>{
                    setData(response.data)
                })
        })
    }

    // Need to finish this (update buttons - onClick())
    function UpdateQuantity(value){
        let qty = value;
        let [setQty] = useState(0);
        let incrementQty = () =>{
            if(qty < 10){
                setQty(Number(qty)+1);
            }
        };
        let decrementQty = () =>{
            if(qty > 0){
                setQty(Number(qty)-1);
            }
        }
        let handleChange = (event) =>{
            setQty(event.target.value);
        }

        return(
            <>
                <div>
                    <button class={"ui icon button"} onClick={decrementQty}><i aria-hidden={"true"} class={"minus icon"}></i></button>
                    <input type={"text"} class={"form-control"} value={qty} onChange={handleChange}></input>
                    <button class={"ui icon button"} onClick={incrementQty}><i aria-hidden={"true"} class={"plus icon"}></i></button>
                </div>);
            </>);
    }


    useEffect(getCart,[])  //Possible URL in empty brackets


    if (!data) return null;

    let username = localStorage.getItem("username");
    username = username.replace(/"/g, '');

    let cart_subtotal = 0;
    let cart_quantity = 0;

    user_cart = data.map(
        value => {
            cart_subtotal += value.products_price;
            cart_quantity += value.quantity;
        })

    cartItems= 
        data.map( value =>
            <Card>
                <Card.Content>
                    <Card.Header>{value.products_name}</Card.Header>
                    <Card.Meta>{value.products_price}</Card.Meta>
                    <Card.Description>{value.quantity} in your cart</Card.Description>
                </Card.Content>
                <Card.Content extra style={{marginLeft: '5%', marginRight: '5%'}}>
                    <Button.Group >
                        {UpdateQuantity(value.quantity)}
                        <Button fluid animated='vertical' size="big" basic color = "red" onClick={() => [deleteCartItem(value.cart_item_id),refreshPage()]}>
                            <Button.Content hidden>Remove</Button.Content>
                            <Button.Content visible>
                                <Icon name='trash alternate'/>
                            </Button.Content>
                        </Button>
                    </Button.Group>

                </Card.Content>
            </Card>)

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
                            <h1 style={{marginTop: "1%", marginBottom: '2%', textAlign: 'center'}}>Order Summary</h1>
                            <h3>Total number of items: {cart_quantity}</h3>
                            <h3>Cart Subtotal: ${cart_subtotal}</h3>
                            <Button fluid animated="vertical" size='massive' basic color='red'
                                    onClick={()=> clearCart()}>
                                <Button.Content hidden>Clear Cart</Button.Content>
                                <Button.Content visible>
                                    <Icon name='remove circle'/>
                                </Button.Content>
                            </Button>
                            <Button fluid animated="vertical" size='massive' basic color='green'
                                    onClick={()=> buyCart()}>
                                <Button.Content hidden>Buy Cart</Button.Content>
                                <Button.Content visible>
                                    <Icon name='shopping bag'/>
                                </Button.Content>
                            </Button>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
}


export default Cart;
