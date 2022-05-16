import React, {useState} from 'react';
import {Button, Divider, Form, Grid, Header, Segment} from 'semantic-ui-react';
import axios from "axios";



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


    return (
        <Segment  style={{ backgroundColor: '#F0F0F0' }}>
            {/*<h1 textAlign="center" style={{ fontSize: '325%',textAlign: 'center', paddingTop: '10%'}}>Welcome to No-Brim hat shop!</h1>*/}

            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header textAlign="center" style={{ fontSize: '325%',textAlign: 'center', paddingTop: '10%'}} >
                        Welcome to No-Brim hat shop!
                    </Header>
                    <Form size={'large'} style={{ marginTop: '15%' }}>
                        <Segment textAlign='left'>
                            <h1 style={{textAlign: "center"}}>Log In!</h1>
                            <Divider/>
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
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type="password"
                                name="password"
                                placeholder='Password'
                                value={inputs.password || ""}
                                onChange={handleChange}
                            />
                            <Button fluid content='Login' primary onClick={handleSubmit}/>
                        </Segment>
                    </Form>
                    <Segment>
                        <h4>New user?</h4>
                        <Button content='Sign up' icon='signup' size='big' onClick={() => setOpen(true)}/>
                    </Segment>
                </Grid.Column>
            </Grid>


                    {/*<Grid.Column verticalAlign='middle'>*/}
                    {/*    <Button content='Sign up' icon='signup' size='big' onClick={() => setOpen(true)}/>*/}
                    {/*    <Button content='Log Out' icon='signup' size='big' onClick={() => handleLogin()}/>*/}
                    {/*</Grid.Column>*/}

                {/*<Divider vertical>Or</Divider>*/}

        </Segment>
    )
}


export default HomePage;
