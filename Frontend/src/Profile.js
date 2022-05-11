import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Modal, Segment, Select, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import axios from "axios";


function Profile(){

    return <Segment>

        <b>Name: </b> {localStorage.getItem("first_name")} {localStorage.getItem("last_name")}<br/>
        <b>Username: </b> {localStorage.getItem("username")} <br/>
        <b>Email: </b> {localStorage.getItem("email")} <br/>
        <b>Phone: </b> {localStorage.getItem("phone")} <br/>

    </Segment>
}
export default Profile;