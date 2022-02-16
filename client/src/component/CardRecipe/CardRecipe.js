import React, { useState } from 'react';
import { Card, Col, Modal, Row } from 'react-bootstrap';
import { API_BASE_URL } from '../../constants/apiConstants';
import './CardRecipe.css';
import icon_plate from '../icons/icon_plate.svg';
import icon_time from '../icons/icon_time.svg';
import icon_star from '../icons/icon_star.svg';
import icon_button_card from '../icons/icon_button_card.svg';
import x_close from '../icons/x_close.svg';

const CardRecipe = ({ recipes }) => {
    const [allRecipe, setAllRecipes] = useState(recipes);
    const [modalShow, setModalShow] = useState(false);
    const [popUpRecipe, setPopUpRecipe] = useState([]);
    const [image, setImage] = useState(null)
    const [photo, setPhoto] = useState('')

    const modalPopUp = (id) => {
        setModalShow(true);
        const popUpRecipe = recipes.filter(item => item._id === id)[0];
        setPopUpRecipe(popUpRecipe);

    };

    const view = (id) => {
        fetch(`${API_BASE_URL.root}/recipes/review/${id}`, {
            method: 'PUT',
        })
            .then(data => {
                let newRecipesStars = [...recipes];
                if (data) {
                    newRecipesStars.forEach(el => {
                        if (el._id === id) return el.review++;
                    });
                    setAllRecipes(newRecipesStars);
                    // console.log(recipes);
                }
            })
            .catch(err => console.log(err))
    };


    return (
        <Row>

            {recipes.map(recipe =>

                <Col xs={4} key={recipe._id}>
                    <Card className="recipe-card"  >

                        <div className="div-card-image">
                            <div className="div-category">
                                <p className="category-text">{recipe.category}</p>
                            </div>
                            <Card.Img className="cards-image" variant="top"
                                src={photo ? photo : recipe.image === "https://cdn4.vectorstock.com/i/1000x1000/92/18/food-recipe-vector-5409218.jpg" ? recipe.image :
                                    `${API_BASE_URL.root}/${recipe.image}`} alt="" className="cards-image" />

                        </div>
                        <div className="container">
                            <Card.Body className='bodyCard'>
                                <Card.Title className="card-recipe-title">{recipe.title}</Card.Title>
                                <Card.Text className="card-description">{recipe.description}</Card.Text>
                                <div className="div-icons-down">


                                    <span id="span1" > <img src={icon_time} alt="" /> <span className="prep-min">{recipe.time} min</span> </span>

                                    <span id="span1"> <img src={icon_plate} alt="" /> <span className="num-people">{recipe.noPeople} persons</span></span>


                                    <span id="span1"> <img src={icon_star} alt="" className="icon-star" /> <span className="num-stars">{recipe.review} </span> </span>

                                </div>


                                <div className="button-card">
                                    <span onClick={() => modalPopUp(recipe._id)}> <img src={icon_button_card} alt="" className="arrows" /> </span>
                                </div>
                            </Card.Body>

                            <div className='modal'>
                                <Modal show={modalShow}
                                    onClick={() => { view(popUpRecipe._id) }}
                                    size='xl' >

                                    <div className="div-popup">
                                        <div className="popup-first-box">
                                            <div>
                                                <h4 className="popup-title">{popUpRecipe.title} </h4>
                                                <span className="x-close" onClick={() => setModalShow(false)}> <img src={x_close} alt="" /> </span>

                                            </div>
                                            <div className="popup-image">
                                                <img src={photo ? photo : popUpRecipe.image === "https://cdn4.vectorstock.com/i/1000x1000/92/18/food-recipe-vector-5409218.jpg" ? popUpRecipe.image :
                                                    `${API_BASE_URL.root}/${popUpRecipe.image}`} alt="" className="popup-image" />
                                            </div>
                                            <div className="popup-served-category">
                                                <div><p className="best-served">Best Served For</p></div>
                                                <div className="popup-div-category">
                                                    <p className="popup-text-category">{popUpRecipe.category}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="popup-description">{popUpRecipe.description}</p>
                                            </div>
                                            <div className="div-icons-down">
                                                <span id='span1'> <img src={icon_time} alt="" /> <span className="prep-min">{popUpRecipe.time} min</span> </span>
                                                <span id="span1"> <img src={icon_plate} alt="" /> <span className="num-people">{popUpRecipe.people} persons</span></span>
                                                <span id="span1"> <img src={icon_star} alt="" className="icon-star" /> <span className="num-stars">{popUpRecipe.review}</span> </span>
                                            </div>
                                        </div>
                                        <div className="popup-second-box">
                                            <p className="recipe-details">Recipe Details</p>
                                            <p className="text-recipe">{popUpRecipe.shortRecipe}</p>
                                        </div>
                                    </div>

                                </Modal>
                            </div>
                        </div>
                    </Card>
                </Col>

            )}

        </Row>
    )
}
export default CardRecipe;