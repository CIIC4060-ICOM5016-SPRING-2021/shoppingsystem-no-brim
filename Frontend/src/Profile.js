import React from 'react';
import {Button, Segment} from "semantic-ui-react";


function Profile(){

    const handleLogout = () => {
        localStorage.setItem("isLogged",JSON.stringify(false))
        localStorage.setItem("user_id",JSON.stringify(null));
        localStorage.setItem("isAdmin",JSON.stringify(null));
        localStorage.setItem("username",JSON.stringify(null));
        localStorage.setItem("first_name",JSON.stringify(null));
        localStorage.setItem("last_name",JSON.stringify(null));
        localStorage.setItem("email",JSON.stringify(null));
        localStorage.setItem("phone",JSON.stringify(null));
    }

    return <Segment>
        <Button content='Log Out' icon='sign out' size='big' floated='right' onClick={() => handleLogout()}/>
        <b>Name: </b> {localStorage.getItem("first_name")} {localStorage.getItem("last_name")}<br/>
        <b>Username: </b> {localStorage.getItem("username")} <br/>
        <b>Email: </b> {localStorage.getItem("email")} <br/>
        <b>Phone: </b> {localStorage.getItem("phone")} <br/>

    </Segment>
}
export default Profile;