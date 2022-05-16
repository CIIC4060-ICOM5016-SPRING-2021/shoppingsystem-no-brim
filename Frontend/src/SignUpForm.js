import React, {useState} from 'react';
import {Button, Form} from 'semantic-ui-react';
import axios from "axios";


function SignUpForm() {
    const [inputs, setInputs] = useState({'is_admin': false, 'phone': 12312});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(inputs);

        axios.post('https://db-class-22.herokuapp.com//NO-BRIM/Users/users/create_User', inputs)
            .then(res => {
                console.log(res);
                console.log(res.data);
                localStorage.setItem("user_id",JSON.stringify(res.data.user_id));
                localStorage.setItem("isAdmin",JSON.stringify(res.data.is_admin));
                localStorage.setItem("username",JSON.stringify(res.data.username));
                localStorage.setItem("first_name",JSON.stringify(res.data.first_name));
                localStorage.setItem("last_name",JSON.stringify(res.data.last_name));
                localStorage.setItem("email",JSON.stringify(res.data.email));
                localStorage.setItem("phone",JSON.stringify(res.data.phone));

            })


    }

    return (
        <Form>

            <Form.Input
                // iconPosition='left'
                label='First Name'
                type="text"
                name="first_name"
                placeholder='First Name'
                value={inputs.first_name || ""}
                onChange={handleChange}
            />
            <Form.Input
                // iconPosition='left'
                label='Last Name'
                type="text"
                name="last_name"
                placeholder='Last Name'
                value={inputs.last_name || ""}
                onChange={handleChange}
            />
            <Form.Input
                icon='user'
                iconPosition='left'
                label='Username'
                type="text"
                name="username"
                placeholder='Username'
                value={inputs.username || ""}
                onChange={handleChange}
            />
            <Form.Input
                icon='mail'
                iconPosition='left'
                label='Email'
                type="text"
                name="email"
                placeholder='Email'
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
                placeholder='Password'
                value={inputs.password || ""}
                onChange={handleChange}
            />
            <Button content='Signup' primary onClick={handleSubmit} style={{float: 'right'}} />
            <br/>
            <br/>

        </Form>
    )
}

export default SignUpForm;