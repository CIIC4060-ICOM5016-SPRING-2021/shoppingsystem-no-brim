import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Modal, Segment, Select, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import axios from "axios";


function UserStatistics(){
    const [topCat, setTopCat] = useState([])
    const [topProd, setTopProd] = useState([])
    const [exProd, setExProd] = useState([])
    const [cheapProd, setCheapProd] = useState([])

    if (localStorage.getItem("user_id")){

        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/User/rank-most-bought-category/"+ localStorage.getItem("user_id"))
            .then((response)=>{

                setTopCat(response.data) ;

            })
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/User/rank-most-bought-product/"+ localStorage.getItem("user_id"))
            .then((response)=>{

                setTopProd(response.data) ;
            })
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/User/most-expensive-product-bought/"+ localStorage.getItem("user_id"))
            .then((response)=>{

                setExProd([response.data]) ;
            })
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/User/cheapest-product-bought/"+ localStorage.getItem("user_id"))
            .then((response)=>{

                setCheapProd([response.data]) ;
            })

    }

    let mostBoughtCategory= topCat.map( value =>
            <Card>
                <Card.Content>
                    Name: {value.name} - Amount: {value.amount}

                </Card.Content>
                <Card.Content extra>
                </Card.Content>
            </Card>)

    let mostBoughtProducts= topProd.map( value =>
        <Card>
            <Card.Content>
                Name: {value.name} - Amount: {value.amount}

            </Card.Content>
            <Card.Content extra>
            </Card.Content>
        </Card>)


    let ExpensiveProduct= exProd.map( value =>
        <Card>
            <Card.Content>
                Name: {value.name} - Price: {value.price}

            </Card.Content>
            <Card.Content extra>
            </Card.Content>
        </Card>)

    let CheapestProduct= cheapProd.map( value =>
        <Card>
            <Card.Content>
                Name: {value.name} - Price: {value.price}

            </Card.Content>
            <Card.Content extra>
            </Card.Content>
        </Card>)

    return <Segment>

            <b>Most Expensive Product: </b> {ExpensiveProduct} <br/>
            <b>Cheapest Product: </b> {CheapestProduct} <br/>
            <b>Most Bought Category: </b> {mostBoughtCategory}  <br/>
            <b>Most Bought Product: </b> {mostBoughtProducts} <br/>


    </Segment>
}
export default UserStatistics;