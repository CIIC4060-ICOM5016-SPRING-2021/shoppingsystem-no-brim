import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Modal, Segment, Select, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import axios from "axios";


function UserStatistics(){
    const [topCat, setTopCat] = useState("")


    const [topProd, setTopProd] = useState("")
    const [exProd, setExProd] = useState("")
    const [cheapProd, setCheapProd] = useState("")
    if (localStorage.getItem("user_id")){

        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/User/rank-most-bought-category/"+ localStorage.getItem("user_id"))
            .then((response)=>{
                console.log(response.data)
                setTopCat(response.data[0].name +" " + response.data[0].amount) ;

            })
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/User/rank-most-bought-product/"+ localStorage.getItem("user_id"))
            .then((response)=>{
                console.log(response.data)
                setTopProd(response.data[0].name +" " + response.data[0].amount) ;
            })
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/User/most-expensive-product-bought/"+ localStorage.getItem("user_id"))
            .then((response)=>{
                console.log(response.data)
                setExProd(response.data.name) ;
            })
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/User/cheapest-product-bought/"+ localStorage.getItem("user_id"))
            .then((response)=>{
                console.log(response.data)
                setCheapProd(response.data.name) ;
            })



    }
    return <Segment>



            <b>Most Expensive Product: </b> {exProd} <br/>
            <b>Cheapest Product: </b> {cheapProd} <br/>
        <Card>
            <b>Most Bought Category: </b>  {topCat}<br/>

        </Card>
        <Card>
            <b>Most Bought Product: </b> {topProd} <br/>
        </Card>

    </Segment>
}
export default UserStatistics;