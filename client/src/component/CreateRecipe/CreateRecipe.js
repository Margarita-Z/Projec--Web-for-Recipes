import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Button, Form, Col, Container, Row, ButtonGroup, ToggleButton } from "react-bootstrap";
import { API_BASE_URL } from '../../constants/apiConstants';
import { getToken, removeUserStorage } from '../../helper/StorageFunction';
import './CreateRecipe.css';
import icon_bakc from '../icons/icon_bakc.svg';


export function CreateRecipe() {
    const token = getToken();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [time, setTime] = useState("");
    const [noPeople, setNoPeople] = useState("");
    const [description, setDescription] = useState("");
    const [shortRecipe, setShortRecipe] = useState("");
    const [photo, setPhoto] = useState('');
    const [image, setImage] = useState(null)
    let navigate = useNavigate();

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
    };
    function createRecipe(e) {

        e.preventDefault();
        const formData = new FormData();
        const imageUpload = document.querySelector('input[type="file"]');
        formData.append("image", imageUpload.files[0]);
        formData.append('title', title);
        formData.append('shortRecipe', shortRecipe);
        formData.append('category', category);
        formData.append('time', time);
        formData.append('noPeople', noPeople);
        formData.append('description', description);

        fetch(`${API_BASE_URL.root}/recipes/newRecipe`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.message)
                    removeUserStorage()
                    navigate('/login')


                } else {
                    //navigate('/myRecipes')
                    alert(data.message)
                }
            })
            .catch(err =>  alert(err) )
    }

    return (
        <div className='create'>
           
            <Container>
            
                    <div className='prvBlok'>
                    <h3 id="createRecipe-title">My recipes </h3> <hr id="hrCreateRecipe" />
                    <Button className='createRecipe-button' variant="warning" href='/myRecipes'> <img src={icon_bakc} alt="" className="iconBack" /></Button>
                    </div>
               
                <Row  className='blok' onSubmit={createRecipe}>
                    <Col xs={5} md={3}>
                        <Col className='RecipeImage'>
                        <p>Resipe Image</p>
                        </Col>
                        <Col>
                        {image === null ? <Image src={image ? `${API_BASE_URL.root}/${image}` :  "https://cdn4.vectorstock.com/i/1000x1000/92/18/food-recipe-vector-5409218.jpg"} alt="" className="imageInfo" />
                                : <Image src={photo} alt="" className="imageInfo" />}
                        </Col>
                        <br/>
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
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                     />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridState">
                                <Form.Label className="categoryText">Category</Form.Label>
                                        <Form.Select
                                            required
                                            className="categoryInput"
                                            defaultValue="Choose..."
                                            value={category}
                                            onChange={e => setCategory(e.target.value)}
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
                                       value={time}
                                       onChange={e => setTime(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label className='noPiople'>No. People</Form.Label>
                                    <Form.Control
                                     required
                                     className="noPeopleInput"
                                     type="number"
                                     value={noPeople}
                                     onChange={e => setNoPeople(e.target.value)}
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
                                value={description}
                                onChange={e => setDescription(e.target.value)}
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
                                 value={shortRecipe}
                                 onChange={e => setShortRecipe(e.target.value)}/>
                            </Form.Group>
                    </Col>
                </Row>

            </Container>
        </div>


    )
}
export default CreateRecipe;