import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Form, Modal, Segment, Select, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import axios from "axios";
import UpdatePorudcts from "./UpdateProducts";

function ProductsModify() {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false)
    const [inputs, setInputs] = useState({'User': parseInt(localStorage.getItem("user_id"))})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name == "Description" || name == "Name"){
            setInputs(values => ({...values, [name]: value}))
        }
        else{
            setInputs(values => ({...values, [name]: parseInt(value)}))
        }

    }

    const createProduct = () => {

        console.log(inputs);


        axios.post('https://db-class-22.herokuapp.com//NO-BRIM/Products/products/add' ,inputs)
            .then(res => {
                console.log(res);
                console.log(res.data);
                window.location.reload(false);
            })


    }


    const getProducts = () => {
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Products/products")
            .then((response)=>{
                setData(response.data)
            })

    }

    useEffect(getProducts,[])




    if (localStorage.getItem("isAdmin") == "false"){
        console.log("i am here")
        return "not admin"
    }



    return <Segment>
        <Modal
            centered={false}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Modal.Header>Create New Product </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    This is a modal but it serves to show how buttons and functions can be implemented.
                </Modal.Description>
                <Form>

                    <Form.Input
                        // iconPosition='left'
                        label='Name'
                        type="text"
                        name="Name"
                        value={inputs.Name|| ""}
                        onChange={handleChange}
                    />
                    <Form.Input
                        // iconPosition='left'
                        label='Description'
                        type="text"
                        name="Description"
                        value={inputs.Description || ""}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label='Category'
                        type="text"
                        name="Category"
                        value={inputs.Category || ""}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label='Price'
                        type="text"
                        name="Price"
                        value={inputs.Price || ""}
                        onChange={handleChange}
                    />

                    <Form.Input

                        label='Inventory'
                        type="text"
                        name="Inventory"
                        value={inputs.Inventory || ""}
                        onChange={handleChange}
                    />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button content='Update Product' primary onClick={() => createProduct()} />
            </Modal.Actions>
        </Modal>
        <Button onClick={() => setOpen(true)}>Add New Product</Button>

        <Card.Group>

            <UpdatePorudcts info={data}/>
        </Card.Group>
    </Segment>
}

export default ProductsModify;