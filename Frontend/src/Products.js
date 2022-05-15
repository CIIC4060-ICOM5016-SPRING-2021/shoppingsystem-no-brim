import React, {Component, useEffect, useState} from 'react';
import {Button, Card, Container, Modal, Segment, Select, Tab} from "semantic-ui-react";
import AllProducts from "./AllProducts";
import axios from "axios";

function Products() {
    const [data, setData] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const filterOptions = [{key: 'N', value: 'N', text: 'No Filter'},
        { key: 'PHL', value: 'PHL', text: 'Price High-Low' },
        { key: 'PLH', value: 'PLH', text: 'Price Low-High' },
        { key: 'NHL', value: 'NHL', text: 'Name High-Low' },
        { key: 'NLH', value: 'NLH', text: 'Name Low-High' },
    ]
    const categoryOptions =[
        {key: 'B', value: '1', text:'Beanie'},
        {key: 'BC', value: '2', text:'Baseball Cap'},
        {key: 'C', value: '3', text:'Cowboy'},
        {key: 'T', value: '4', text:'Top'},
        {key: 'F', value: '5', text:'Fedora'},
        {key: 'S', value: '6', text:'Sunhat'},
        {key: 'V', value: '7', text:'Visor'},
        {key: 'BT', value: '8', text:'Beret'},
        {key: 'BH', value: '9', text:'Bucket Hats'},
        {key: 'BW', value: '10', text:'Bowler'},
    ]

    const getProducts = () => {
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Products/products")
            .then((response)=>{
                setData(response.data)
            })
    }

    useEffect(getProducts,[])

    function changeFilter(e, data){
        console.log(data)
        console.log(data.value)
        setSelectedFilter(data.value)
        if(data.value == "N"){
            axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Products/products")
                .then((response)=>{
                    setData(response.data)
                })
        }
        else if(data.value == "PHL"){
            axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Products/products/price/DESC")
                .then((response)=>{
                    setData(response.data)
                })
        }
        else if(data.value == "PLH"){
            axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Products/products/price/ASC")
                .then((response)=>{
                    setData(response.data)
                })
        }
        else if(data.value == "NHL"){
            axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Products/products/name/ASC")
                .then((response)=>{
                    setData(response.data)
                })
        }
        else if(data.value == "NLH"){
            axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Products/products/name/DESC")
                .then((response)=>{
                    setData(response.data)
                })
        }
    }

    function changeCategory(e,data){
        console.log(data.value)
        setSelectedCategory(data.value)
        axios.get("https://db-class-22.herokuapp.com//NO-BRIM/Products/products/category/"+data.value)
            .then((response)=>{
                setData(response.data)
            })

    }

    if (!data) return null;


    return <Segment>
        <Select
            placeholder='Filter'
            options={filterOptions}
            value={selectedFilter}
            onChange={(e,data) => changeFilter(e,data)}

        />
        <Select
            placeholder='Choose Category'
            options={categoryOptions}
            value={selectedCategory}
            onChange={(e,data) => changeCategory(e,data)}

        />
        <Card.Group style={{marginTop: "0.5%", marginBottom: '1%', textAlign: 'center'}}>

        <AllProducts info={data}/>
    </Card.Group>
    </Segment>
}

export default Products;