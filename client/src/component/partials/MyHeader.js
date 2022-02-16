import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  setJWT } from '../../redux/ducks/auth';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiConstants';
import { getToken, removeUserStorage } from '../../helper/StorageFunction';
import { Nav, Navbar, Container } from 'react-bootstrap';
import logo from '../logo/logoHeader.svg';
import '../css/header.css';

function MyHeader() {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const token = getToken()
    //const authData = useSelector(state => state.token);

    function logout() {
        const user = {
            email: email
        }
        fetch(`${API_BASE_URL.root}/users/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json()
                .then(result => {
                    alert(` ` + result.message)
                   // dispatch(setLoggedIn(false));
                    removeUserStorage();
                    dispatch(setJWT(result.token));
                    navigate('/login')
                }

                ))
            .catch(err => alert(err))

    }
    return (
        
    
       <Navbar className="navbar">
           <Container >
        <Nav.Link href="/" className="link-image" >
            <img src={logo}  />
        </Nav.Link>

        <Nav className="nav" as='ul' >
            <Nav.Item as="li" className="nav-category">
                <Nav.Link href="/breakFast" className="link-category">BREAKFAST</Nav.Link>
            </Nav.Item>

            <Nav.Item as="li" className="nav-category" >
                <Nav.Link href="/braunch" className="link-category">BRUNCH</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="nav-category">
                <Nav.Link href="/lunch" className="link-category">LUNCH</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="nav-category">
                <Nav.Link href="/dinner" className="link-category">DINNER</Nav.Link>
            </Nav.Item>
        </Nav>

        {token ?
            <Nav className="second-nav-items">
                <Nav.Item as="li" className="nav-list-item-other">
                    <Nav.Link href="/myRecipes" className="link-myRecipe" >MY RECIPES</Nav.Link>
                </Nav.Item>
               
                <Nav.Item as="li" className="nav-list-item-other">
                    <Nav.Link href="/myProfile"  className="link-myProfile">MY PROFILE</Nav.Link>
                </Nav.Item>
                
                <Nav.Item as="li" className="nav-list-item-other">
                    <Nav.Link onClick={logout}     className="link-logout">LOG OUT</Nav.Link>
                </Nav.Item>
               
            </Nav>
            
            :

            <Nav className="first-nav-items">
                <Nav.Item >
                    <Nav.Link href="/login" >
                        <button type="button" className="button-login">LOG IN</button>
                    </Nav.Link>
                </Nav.Item>
                <p id="or"> or </p>
                <Nav.Item as="li">
                    <Nav.Link href="/register" >
                        <button type="button" className="button-create-account">CREATE ACCOUNT</button>

                    </Nav.Link>
                </Nav.Item>
            </Nav>


        }
        </Container>
</Navbar>



)
}

export default MyHeader