import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { API_BASE_URL } from '../../constants/apiConstants';
import './Account.css';
import PhotoAvatar from '../../Images/avatar-image.png'


function Account() {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [image, setImage] = useState(PhotoAvatar)

    const registerUser = () => {
        const register = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            birthday: birthday,
            password: password,
            confirmationPassword: confirmationPassword ,
            image: image
        }
        fetch(`${API_BASE_URL.root}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(register)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error === false) {
                    alert(data.message)
                    const redirect = () => {
                        window.location = "/login"
                    }
                    redirect()
                } else {
                    alert(data.message)
                }
            })
            .catch(err => alert(err))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser();
    }

    return (
        <div className="container-createAccount">
            <Container>
                <div className="div-create-Account">
                    <h3 id="account-title">Create Account </h3> <hr id="hr7" />
                </div>
                <div className="create-acc-form">
                    <div id="left-box">
                        <p>
                            <span id="orange-letters">Create your</span><br />
                            <span id="black-letters">account</span>
                        </p>
                        <p className="left-text-box">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus omnis eligendi repellat incidunt commodi similique nam adipisci eum inventore consectetur labore veniam, suscipit asperiores ipsa numquam atque accusantium quibusdam eaque. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        </p>
                    </div>
                    <div className="right-box">
                        <div className="form-boxes">
                            <Form onSubmit={handleSubmit} >
                                <Row className="mb-4">
                                    <Col>
                                        <Form.Label className='tekst'>First Name</Form.Label>
                                        <Form.Control
                                            className='formaTekst'
                                            type="text"
                                            placeholder="First Name"
                                            value={first_name}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label className='tekst'>Last Name</Form.Label>
                                        <Form.Control
                                            className='formaTekst'
                                            type="text"
                                            placeholder="Last Name"
                                            value={last_name}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col>
                                        <Form.Label className='tekst'>Email</Form.Label>
                                        <Form.Control
                                            className='formaTekst'
                                            placeholder="example@example.com"
                                            value={email}
                                            type="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label className='tekst'>Birthday</Form.Label>
                                        <Form.Control
                                            className='formaTekst'
                                            type="date"
                                            value={birthday}
                                            onChange={(e) => setBirthday(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col>
                                        <Form.Label className='tekst'>Password</Form.Label>
                                        <Form.Control
                                            className='formaTekst'
                                            type="password"
                                            placeholder="***"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label className='tekst'>Repeat password</Form.Label>
                                        <Form.Control
                                            className='formaTekst'
                                            type="password"
                                            placeholder="***"
                                            value={confirmationPassword}
                                            onChange={(e) => setConfirmationPassword(e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Button className="button-save-account" type="submit" variant="success">Create Account</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default Account;