import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Modal} from "semantic-ui-react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import axios from "axios";




function Dashboard(){
    const [data, setData] = useState([{"name": 1, "Counts": 5},
                                                {"name": 2, "Counts": 4},
                                                {"name": 3, "Counts": 3},
                                                {"name": 4, "Counts": 2},
                                                {"name": 5, "Counts": 1}]);

    const[mboughtCategory,setMboughtCategory]=useState('null');
    const[mboughtProduct,setmboughtProduct]=useState([{}]); 
    const[CheapestProduct,setCheapest]=useState('null');
    const[mLikedProduct,setMlikedProduct]=useState('null'); 
    const[mExpensiveProduct,setmExpensiveProduct]=useState('null');
    let  mostBoughtItems=null;


    useEffect(() => {
            axios.get("https://db-class-22.herokuapp.com//NO-BRIM/ProductCategories/categories/bought")
                .then((response)=>{
                    setMboughtCategory(response.data)
                })
        
    },"https://db-class-22.herokuapp.com//NO-BRIM/ProductCategories/categories/bought")
        
    
    
    useEffect(() => {
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Products/products/global/expensive")
            .then((response)=>{
                setmExpensiveProduct(response.data)
            })
    
        },"https://db-class-22.herokuapp.com//NO-BRIM/Products/products/global/expensive")
    
    useEffect(() => {
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Products/products/global/bought")
            .then((response)=>{
                setmboughtProduct(response.data)
            })
    
    },"https://db-class-22.herokuapp.com//NO-BRIM/Products/products/global/bought")


    useEffect(() => {
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Products/products/global/cheapest")
            .then((response)=>{
                setCheapest(response.data)
            })
    
    },"https://db-class-22.herokuapp.com//NO-BRIM/Products/products/global/cheapest")
    
    useEffect(() => {
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Products/products/global/liked")
            .then((response)=>{
                setMlikedProduct(response.data)
            })
    
    },"https://db-class-22.herokuapp.com//NO-BRIM/Products/products/global/liked")
   

    if(!data) return null;

  
    mostBoughtItems= 
        mboughtProduct.map( value =>
             <Card>
                <Card.Content style={{textAlign: 'center'}}>
                    <Card.Header>{value.name}</Card.Header>
                    <Card.Meta>Category: {value.category}</Card.Meta>
                    <Card.Meta>Amount bought: {value.ammount}</Card.Meta>
                    <Card.Description>{value.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                </Card.Content>
            </Card>)


    return <Container style={{}}>
    
        <> <div>
            <h1>Global Statistics</h1>
            <h2> The most bought category:</h2>
                <div>
                    <Card>
                        <Card.Content style={{textAlign: 'center'}}>
                            <Card.Header>{mboughtCategory.description}</Card.Header>
                            <Card.Meta>Category: {mboughtCategory.name}</Card.Meta>
                            <Card.Meta>Amount bought: {mboughtCategory.amount}</Card.Meta>
                        </Card.Content>
                        <Card.Content extra></Card.Content>
                    </Card>
                </div>
            <h2>Most bought products:</h2>
                <div>
                    {mostBoughtItems}
                </div>
                <h2> Cheapest product:</h2>
                    <div>
                        <Card>
                            <Card.Content style={{textAlign: 'center'}}>
                                <Card.Header>{CheapestProduct.name}</Card.Header>
                                <Card.Meta>Category: {CheapestProduct.category}</Card.Meta>
                            </Card.Content>
                            <Card.Content extra></Card.Content>
                        </Card>
                    </div>
                <h2> Most liked product:</h2>
                    <div>
                        <Card>
                            <Card.Content style={{textAlign: 'center'}}>
                                <Card.Header>{mLikedProduct.name}</Card.Header>
                                <Card.Meta>Category: {mLikedProduct.category}</Card.Meta>
                                <Card.Meta>Amount bought: {mLikedProduct.ammount}</Card.Meta>
                            </Card.Content>
                            <Card.Content extra></Card.Content>
                        </Card>
                    </div>
                <h2> Most expensive product:</h2>
                    <div>
                        <Card>
                            <Card.Content style={{textAlign: 'center'}}>
                                <Card.Header>{mExpensiveProduct.name}</Card.Header>
                                <Card.Meta>Category: {mExpensiveProduct.category}</Card.Meta>
                            </Card.Content>
                            <Card.Content extra></Card.Content>
                        </Card>
                    </div>
        </div></> 
    </Container>


}
export default Dashboard;
