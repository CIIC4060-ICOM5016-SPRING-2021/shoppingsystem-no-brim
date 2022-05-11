import React, {Component, useState} from 'react';
import {Button, Divider, Form, Grid, Header, Modal, Segment, Tab} from 'semantic-ui-react';
import axios from "axios";
import SignUpForm from "./SignUpForm";



function HomePage() {
    const [open, setOpen] = useState(false);
    console.log(open);
    const [inputs, setInputs] = useState({});
    const [signupInputs, setSignupInputs] = useState({});


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

    }
    if(!localStorage.getItem("isLogged")){
        localStorage.setItem("isLogged",JSON.stringify(false));
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(inputs);
        axios.post('https://db-class-22.herokuapp.com//NO-BRIM/Users/users/login', inputs)
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
                localStorage.setItem("isLogged",JSON.stringify(true));

            })
    }

    const handleLogin = () => {
        localStorage.setItem("isLogged",JSON.stringify(false))
        localStorage.setItem("user_id",JSON.stringify(null));
        localStorage.setItem("isAdmin",JSON.stringify(null));
        localStorage.setItem("username",JSON.stringify(null));
        localStorage.setItem("first_name",JSON.stringify(null));
        localStorage.setItem("last_name",JSON.stringify(null));
        localStorage.setItem("email",JSON.stringify(null));
        localStorage.setItem("phone",JSON.stringify(null));
    }


    return (<Segment><Header dividing textAlign="center" size="huge">Welcome to DB Demo</Header>
            <Modal
                centered={false}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Modal.Header>Signup!</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        This is a modal but it serves to show how buttons and functions can be implemented.
                    </Modal.Description>
                    <SignUpForm/>
                    {/*    <Button onClick={() => setOpen(false)}>OK</Button>*/}
                </Modal.Content>
                {/*<Modal.Actions>*/}

                {/*</Modal.Actions>*/}
            </Modal>
            <Segment placeholder>

                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Form>
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
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type="password"
                                name="password"
                                value={inputs.password || ""}
                                onChange={handleChange}
                            />
                            <Button content='Login' primary onClick={handleSubmit}/>
                        </Form>
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <Button content='Sign up' icon='signup' size='big' onClick={() => setOpen(true)}/>
                    </Grid.Column>
                </Grid>
                <Button content='Log Out' icon='signup' size='big' onClick={() => handleLogin()}/>
                <Divider vertical>Or</Divider>
            </Segment>
        </Segment>
    )
}


export default HomePage;
