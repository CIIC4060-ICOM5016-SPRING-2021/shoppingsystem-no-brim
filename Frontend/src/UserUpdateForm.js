import React, {Component, useState} from 'react';
import {Button, Divider, Form, Grid, Header, Modal, Segment, Tab} from 'semantic-ui-react';
import axios from "axios";
import WishList from "./Wishlist";


function UserUpdateForm() {
    const [inputs, setInputs] = useState({"is_admin": localStorage.getItem("isAdmin"), "email": localStorage.getItem("email") ,
        "username": localStorage.getItem("username") ,"first_name": localStorage.getItem("first_name"), "last_name": localStorage.getItem("last_name") ,
        "phone": localStorage.getItem("phone"), "password": localStorage.getItem("password")}) ;



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }



    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(inputs);

        axios.put('https://db-class-22.herokuapp.com//NO-BRIM/Users/users/update/' + localStorage.getItem("user_id"), inputs )
            .then(res => {
                console.log(res);
                console.log(res.data);
                localStorage.setItem("isAdmin",JSON.stringify(res.data.is_admin));
                localStorage.setItem("username",JSON.stringify(res.data.username));
                localStorage.setItem("first_name",JSON.stringify(res.data.first_name));
                localStorage.setItem("last_name",JSON.stringify(res.data.last_name));
                localStorage.setItem("email",JSON.stringify(res.data.email));
                localStorage.setItem("phone",JSON.stringify(res.data.phone));

            })


    }

    return (
        <Segment>
        <Form>

            <Form.Input
                // iconPosition='left'
                label='First Name'
                type="text"
                name="first_name"
                value={inputs.first_name || ""}
                onChange={handleChange}
            />
            <Form.Input
                // iconPosition='left'
                label='Last Name'
                type="text"
                name="last_name"
                value={inputs.last_name || ""}
                onChange={handleChange}
            />
            <Form.Input
                icon='user'
                iconPosition='left'
                label='Username'
                type="text"
                name="username"
                value={inputs.username || ""}
                onChange={handleChange}
            />
            <Form.Input
                icon='mail'
                iconPosition='left'
                label='Email'
                type="text"
                name="email"
                value={inputs.email || ""}
                onChange={handleChange}
            />
            {/*<Form.Input*/}
            {/*    icon='phone'*/}
            {/*    iconPosition='left'*/}
            {/*    label='Phone Number'*/}
            {/*    type="text"*/}
            {/*    name="phone"*/}
            {/*    value={inputs.email || ""}*/}
            {/*    onChange={handleChange}*/}
            {/*/>*/}
            <Form.Input
                icon='lock'
                iconPosition='left'
                label='Password'
                type="password"
                name="password"
                value={inputs.password || ""}
                onChange={handleChange}
            />
            <Button content='Update Info' primary onClick={handleSubmit} />
            <br/>
            <br/>

        </Form>
        </Segment>
    )
}

export default UserUpdateForm;