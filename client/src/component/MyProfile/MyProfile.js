import React, { useState, useEffect } from "react";
import { Form, Col, Row, Container, Button, ButtonGroup, ToggleButton, Image } from "react-bootstrap";
import { API_BASE_URL } from "../../constants/apiConstants";
import { getToken, removeUserStorage } from '../../helper/StorageFunction';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../MyProfile/MyProfile.css';
import ProfileAvatar from '../../Images/avatar-image.png';


export default function MyProfile() {
     const [user, setUser] = useState([]);
    const [photo, setPhoto] = useState('');
    const [image, setImage] = useState(ProfileAvatar);
    let navigate = useNavigate();
    const { id } = useParams();
    const token = getToken();

  

 const profile = () => {

        fetch(`${API_BASE_URL.root}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.message)
                    removeUserStorage()
                    navigate('/login')
                }
                else {
                    setUser(data.user)
                   
                }
            })
            .catch(err => alert(err))
    }

    useEffect(() => {
        profile();

    }, []);


    function editMyProfile() {
        fetch(`${API_BASE_URL.root}/users/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (res.status === 401) {
                    removeUserStorage()
                    navigate('/login')
                }
                return res.json();
            })
            .then(data => alert(data.message))
            .catch(err => alert(err))
    }
    function editImage() {

        let formData = new FormData()
        formData.append('image', image);

        axios({
            method: 'put',
            url: `${API_BASE_URL.root}/users/image`,
            data: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res);
            })
            
            .catch(err => {
                console.log(err);
            })
    }
    const handleSave = (event) => {
        editMyProfile();
        editImage();

        event.preventDefault();

    }
    const saveFile = (e) => {

        setImage(e.target.files[0]);
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        let res = null;
        reader.onload = () => {
            res = reader.result;
            setPhoto(res);
        }
        reader.onerror = () => {
            res = null;
        }
    

    }

    return (
        <div className="container-myProfile">
            <Container>
                <div className="div-my-profile">
                    <h3 id="myprofile-title"> My Profile </h3> <hr id="hr9" />
                </div>
            </Container>
            <Container key={user.id} >
                <div >
                    <Form onSubmit={handleSave} className="form-wrapper">

                        <div className="first-box-image">
                       
                        <Image src={photo ? photo : user.image === ProfileAvatar ? user.image : `${API_BASE_URL.root}/${user.image}`} alt="" className="photo" />
                                
                               

                            <ButtonGroup className="button-group">
                                <ToggleButton
                                    className='button-image'
                                    id='toggle-check'
                                    type='file'
                                    variant='secondary'
                                    onChange={saveFile} >
                                    CHANGE AVATAR
                                </ToggleButton>
                            </ButtonGroup>
                        </div>

                        <Col className="the-column">
                            <div className="form-boxes">
                                < div >
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Label className='tekst' >First Name</Form.Label>
                                            <Form.Control
                                             className='formaTekst'
                                                required
                                                type="text"
                                                value={user.first_name}
                                                onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label className='tekst'>Last Name</Form.Label>
                                            <Form.Control
                                             className='formaTekst'
                                                required
                                                type="text"
                                                value={user.last_name}
                                                onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Label className='tekst'>Email</Form.Label>
                                            <Form.Control
                                             className='formaTekst'
                                                required
                                                value={user.email}
                                                type="email"
                                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label className='tekst'>Birthday</Form.Label>
                                            <Form.Control
                                             className='formaTekst'
                                                required
                                                type='date'
                                                value={user.birthday}
                                                onChange={(e) => setUser({ ...user, birthday: e.target.value })}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col>
                                            <Form.Label className='tekst'>Password</Form.Label>
                                            <Form.Control
                                             className='formaTekst'
                                                required
                                                type="password"
                                                value={user.password}
                                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label className='tekst'>Repeat password</Form.Label>
                                            <Form.Control
                                             className='formaTekst'
                                                required
                                                type="password"
                                                value={user.password}
                                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                            />
                                        </Col>
                                    </Row>
                                    <Button className='button' type="submit" variant="success">SAVE</Button>
                                </div>
                            </div>
                        </Col>
                    </Form>

                </div>
            </Container>
        </div >

    )
}
