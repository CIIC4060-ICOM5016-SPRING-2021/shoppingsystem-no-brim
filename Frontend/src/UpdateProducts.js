import React, {Component, useState} from 'react';
import {Button, Card, Container, Modal, Tab, Select, Form} from "semantic-ui-react";
import axios from "axios";


function UpdatePorudcts(props) {
    // console.log(props)
    // props.info.forEach(value => console.log(value.name));
    const [data, setData] = useState([]);
    const [updateProduct, setUpdateProduct] = useState("");

    const [updateInputs, setUpdateInputs] = useState({});
    const [open, setOpen] = useState(false)

    const addWishlist = (value) => {
        setOpen(true);
        setUpdateProduct(value);

        setUpdateInputs({'Price': value.price, 'Inventory': value.inventory, 'User': parseInt(localStorage.getItem("user_id"))  });
        console.log(updateProduct)
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUpdateInputs(values => ({...values, [name]: parseInt(value)}))
    }

    const handleUpdate = (value) => {


        console.log(updateInputs);
        console.log(value);

        axios.put('http://127.0.0.1:5000//NO-BRIM/Products/products/update/' + updateProduct.product_id,updateInputs)
            .then(res => {
                console.log(res);
                console.log(res.data);
                window.location.reload(false);
            })


    }

    const deleteProduct = (value) => {
        let info = {"User": localStorage.getItem("user_id")}

        axios.put('https://db-class-22.herokuapp.com//NO-BRIM/Products/products/delete/' + value.product_id, info)
            .then(res => {

            })
    }

    return props.info.map(value => {return <Card>
        <Modal
            centered={false}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Modal.Header>Update Product: {updateProduct.name} </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    This is a modal but it serves to show how buttons and functions can be implemented.
                </Modal.Description>
                <Form>
                    <Form.Input
                        // iconPosition='left'
                        label='Price'
                        type="text"
                        name="Price"
                        value={updateInputs.Price || ""}
                        onChange={handleChange}
                    />
                    <Form.Input
                        // iconPosition='left'
                        label='Inventory'
                        type="text"
                        name="Inventory"
                        value={updateInputs.Inventory || ""}
                        onChange={handleChange}
                    />

                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button content='Update Product' primary onClick={() => handleUpdate(value)} />
            </Modal.Actions>
        </Modal>
        <Card.Content>
            <Card.Header>{value.name}</Card.Header>
            <Card.Meta>{value.price}</Card.Meta>
            <Card.Description>
                {value.description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
                <Button basic color='green' onClick={() => addWishlist(value)}>
                    Update
                </Button>
                <Button basic color='green' onClick={() => deleteProduct(value)}>
                    Delete
                </Button>
            </div>
        </Card.Content>
    </Card>});
}
export default UpdatePorudcts;