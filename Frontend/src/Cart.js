import React, {Component, useEffect, useState} from 'react';
import {Card} from "semantic-ui-react";
import axios from "axios";
import { Button,Icon,Confirm} from 'semantic-ui-react';
import {Link} from 'react-router-dom' 

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



        return(<>
            <div>
                <Button style={{width: "10%"}} floated='right' animated="vertical" size='massive' basic color='red' 
                onClick={()=> clearCart()}>
                    <Button.Content hidden>Clear Cart</Button.Content>
                    <Button.Content visible>
                    <Icon name='remove circle'/>
                    </Button.Content>
                </Button>
            </div>

            <div>
                {cartItems}
            </div>
        </>);


}


export default Cart;
