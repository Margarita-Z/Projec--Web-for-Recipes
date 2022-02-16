import React, { useState, useEffect } from "react";
import { Button, Form, Col, Container, Row, Image, ToggleButton, ButtonGroup } from "react-bootstrap";
import { API_BASE_URL } from '../../constants/apiConstants';
import { getToken, removeUserStorage } from '../../helper/StorageFunction';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import '../CreateRecipe/CreateRecipe.css';
import icon_bakc from '../icons/icon_bakc.svg';


export default function EditRecipe() {


    const { id } = useParams();
    let navigate = useNavigate();
    const token = getToken();
    const [recipe, setRecipe] = useState({})
    const [image, setImage] = useState(null)
    const [photo, setPhoto] = useState('');

    function getRecipeByID() {

        fetch(`${API_BASE_URL.root}/recipes/one/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.message)
                    removeUserStorage()
                    navigate('/login ')
                }
                else { setRecipe(data.recipe) }
            })
            .catch(err => alert(err))
    }
    useEffect(() => {
        getRecipeByID();

    }, []);

    function updateRecipe() {


        fetch(`${API_BASE_URL.root}/recipes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify(recipe)
        })
            .then(res => res.json())
            .then(res => {
                alert(res.message)
                navigate('/myRecipes')
            })
            .catch(err => alert(err))
    }

    function editImage() {
        console.log(image);
        let formData = new FormData()
        const imageUpload = document.querySelector('input[type="file"]');
        formData.append('image', imageUpload.files[0]);
        if (imageUpload) {
            axios({
                method: 'put',
                url: `${API_BASE_URL.root}/recipes/${id}/image`,
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
    }
    const handleUpdate = (event) => {
        event.preventDefault();
        updateRecipe();
        editImage();

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

        <div className='create'>

            <Container>

                <div className='prvBlok'>
                    <h3 id="createRecipe-title">My recipes </h3> <hr id="hrCreateRecipe" />
                    <Button className='createRecipe-button' variant="warning" href='/myRecipes'> <img src={icon_bakc} alt="" className="iconBack" /></Button>
                </div>

                <Row className='blok' onSubmit={handleUpdate} key={recipe.id}>
                    <Col xs={5} md={3}>
                        <Col className='RecipeImage'>
                            <p>Resipe Image</p>
                        </Col>
                        <Col>
                        <Image src={photo ? photo : recipe.image === "https://cdn4.vectorstock.com/i/1000x1000/92/18/food-recipe-vector-5409218.jpg" ? recipe.image : `${API_BASE_URL.root}/${recipe.image}`} alt="" className="imageInfo" />
                           {/*{image == null ? <img src={recipe.image ? `${API_BASE_URL.root}/${recipe.image}` : "https://drmasley.com/wp-content/uploads/2019/09/104579996-buddha-bowl-salads-background.jpeg"} alt="" className="imageInfo" />
                                : <img src={photo} alt="" className="imageInfo" />}*/}
                        </Col>
                        <br />
                        <Col>
                            <ButtonGroup className="image-buttonGroup">
                                <ToggleButton

                                    className="imageButton"
                                    id="toggle-check"
                                    type="file"
                                    variant="secondary"
                                    onChange={saveFile}
                                >
                                    UPLOAD IMAGE
                                </ToggleButton>
                            </ButtonGroup>
                        </Col>
                    </Col>
                    <Col xs={7} md={5} className="Blok2">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='RecipeTitle'>Recipe Title</Form.Label>
                                <Form.Control
                                    required
                                    className="recipeTitleInput"
                                    type="text"
                                    value={recipe.title}
                                    onChange={e => setRecipe({ ...recipe, title: e.target.value })}
                                />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label className="categoryText">Category</Form.Label>
                                    <Form.Select
                                        required
                                        className="categoryInput"
                                        defaultValue="Choose..."
                                        value={recipe.category}
                                        onChange={e => setRecipe({ ...recipe, category: e.target.value })}
                                    >
                                        <option >Select category</option>
                                        <option>Breakfast</option>
                                        <option>Brunch</option>
                                        <option>Lunch</option>
                                        <option>Dinner</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label className='timePrep'>Preparation Time</Form.Label>
                                    <Form.Control
                                        required
                                        className="timeInput"
                                        type="number"
                                        value={recipe.time}
                                        onChange={e => setRecipe({ ...recipe, time: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label className='noPiople'>No. People</Form.Label>
                                    <Form.Control
                                        required
                                        className="noPeopleInput"
                                        type="number"
                                        value={recipe.noPeople}
                                        onChange={e => setRecipe({ ...recipe, noPeople: e.target.value })}
                                    />
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label className='descriptionText'>Short Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    maxlength="330"
                                    required
                                    className="short-description-input"
                                    value={recipe.description}
                                    onChange={e => setRecipe({ ...recipe, description: e.target.value })}
                                />
                            </Form.Group>
                            <Button className="recipeSaveButton" variant="success" type='submit'>SAVE</Button>
                        </Form>
                    </Col>
                    <Col xs={6} md={4}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className='recipeText'>Recipe</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                maxlength="1200"
                                required
                                className="main-recipe-input"
                                value={recipe.shortRecipe}
                                onChange={e => setRecipe({ ...recipe, shortRecipe: e.target.value })} />
                        </Form.Group>
                    </Col>
                </Row>

            </Container>
        </div>




    )

}

