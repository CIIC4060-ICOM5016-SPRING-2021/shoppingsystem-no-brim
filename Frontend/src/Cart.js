import React, {Component, useEffect, useState} from 'react';
import {Card} from "semantic-ui-react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';



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

    const clearCart = () =>{
        axios.delete("https://db-class-22.herokuapp.com//NO-BRIM/Cart/cart/clear/"+localStorage.getItem("user_id"))
        .then((response)=>{
            setData(response.data)
        })
    }


    // const Test = () =>
    // <Button onClick={clearCart()} className='btn btn-danger ms-auto'>Clear Cart</Button>
     
    //     //  data.map(value =>{
    //     //     return (
    //     //         <Card>
    //     //             <Card.Content>
    //     //                 <Card.Header>{value.quantity}</Card.Header>
    //     //                 <Card.Meta>{value.products_price}</Card.Meta>
    //     //                 <Card.Description>
    //     //                     {value.products_description}
    //     //                 </Card.Description>
    //     //             </Card.Content>
    //     //             <Card.Content extra>
    //     //                 <div className='ui two buttons'>
    //     //                     <Button onClick={() => deleteCartItem(value.cart_item_id)} className="btn btn-success">
    //     //                         Remove
    //     //                     </Button>
    //     //                 </div>
    //     //             </Card.Content>
    //     //         </Card>)
                
    //     //     });
        


    useEffect(getCart,[])
    if (!data) return null;
    
    return data.map(value =>{
        return<>
      <Card>
            <Card.Content>
                <Card.Header>{value.quantity}</Card.Header>
                <Card.Meta>{value.products_price}</Card.Meta>
                <Card.Description>
                    {value.products_description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button onClick={() => deleteCartItem(value.cart_item_id)} className="btn btn-success">
                        Remove
                    </Button>
                </div>
            </Card.Content>
        </Card></>});
    }

export default Cart;
