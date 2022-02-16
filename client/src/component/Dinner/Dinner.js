import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import CardRecipe from '../CardRecipe/CardRecipe';
import { API_BASE_URL } from '../../constants/apiConstants';


function Dinner() {
    const [diner, setDiner] = useState([]);

    function dinnerCategory() {
        fetch(`${API_BASE_URL.root}/recipes/category`)
            .then(res => res.json())
            .then(data => {
                setDiner(data.diner)
            })
            .catch(err => alert(err));
    }
    useEffect(() => {
        dinnerCategory();
    }, []);

    return (

        <div className="container-menu">
            <Container>
                <div className="div-meny">
                    <h3 id="title-menu"> Dinner </h3> <hr id="hr3" />
                </div>

                <div className="div-recipes-menu">
                    <CardRecipe recipes={diner} />
                </div>
            </Container>

        </div>
    )
}
export default Dinner;