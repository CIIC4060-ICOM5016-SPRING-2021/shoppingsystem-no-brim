import React, {useState} from 'react';
import {Container, Divider, Header, Tab} from "semantic-ui-react";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Wishlist from "./Wishlist";
import Profile from "./Profile";
import UserStatistics from "./UserStatistics";
import Cart from "./Cart";
import UserUpdateForm from "./UserUpdateForm";


function UserView(){
    const [isAuth, setIsAuth] = useState(true)
    const [notShow, setNotShow] = useState(false)
    let username = localStorage.getItem("username");
    username = username.replace(/"/g, '');
    const panes = [
        {

            menuItem: 'Products', render: () => <Tab.Pane active={isAuth}><Container><Header as='h1' textAlign={'center'}>Welcome to No-Brim hat shop, {username}!</Header><Divider/></Container><Products/></Tab.Pane>
        },
        {
            menuItem: 'WishList', render: () => <Tab.Pane active={isAuth}><Wishlist/></Tab.Pane>
        },
        {
            menuItem: 'Cart', render: () => <Tab.Pane active={isAuth}><Cart/></Tab.Pane>
        },
        {
            menuItem: 'Profile', render: () => <Tab.Pane active={isAuth}><Profile/><UserStatistics/><UserUpdateForm/></Tab.Pane>
        },
        {
            menuItem: 'Dashboard', render: () => <Tab.Pane active={isAuth}><Dashboard/></Tab.Pane>
        }
    ]

    return <Tab panes={panes}/>

}
export default UserView;
