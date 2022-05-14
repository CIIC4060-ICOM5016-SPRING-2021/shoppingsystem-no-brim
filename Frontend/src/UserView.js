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
    const panes = [
        {
            menuItem: 'Products', render: () => <Tab.Pane active={isAuth}><Container><Header>Anything you need to put here</Header><Divider/></Container><Products/></Tab.Pane>
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
        },
        { // must finish
            menuItem: 'Logout', render: () => <Tab.Pane active={isAuth}></Tab.Pane>
        }
    ]

    // Must add logout button or functionality somewhere in this page
    // Could just make a logout js file, poner este code y hacer un redirect cuando complete
    //
    // const handleLogin = () => {
    //     localStorage.setItem("isLogged",JSON.stringify(false))
    //     localStorage.setItem("user_id",JSON.stringify(null));
    //     localStorage.setItem("isAdmin",JSON.stringify(null));
    //     localStorage.setItem("username",JSON.stringify(null));
    //     localStorage.setItem("first_name",JSON.stringify(null));
    //     localStorage.setItem("last_name",JSON.stringify(null));
    //     localStorage.setItem("email",JSON.stringify(null));
    //     localStorage.setItem("phone",JSON.stringify(null));
    // }
    // <Button content='Log Out' icon='signup' size='big' onClick={() => handleLogin()}/>


    return <Tab panes={panes}/>

}
export default UserView;
