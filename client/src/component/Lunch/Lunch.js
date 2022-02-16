import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CardRecipe from '../CardRecipe/CardRecipe';
import { API_BASE_URL } from '../../constants/apiConstants';

function Lunch() {
    const [lunch, setLunch] = useState([]);

    function lunchCategory() {
        fetch(`${API_BASE_URL.root}/recipes/category`)
            .then(res => res.json())
            .then(data => {
                setLunch(data.lunch)
            })
            .catch(err => alert(err));
    }
    useEffect(() => {
        lunchCategory();
    }, []);
    return (

        <div className="container-menu">
            <Container>
                <div className="div-meny">
                    <h3 id="title-menu"> Lunch </h3> <hr id="hr3" />
                </div>

                <div className="div-recipes-menu">
                    <CardRecipe recipes={lunch} />
                </div>
            </Container>
        </div>
    )
}
export default Lunch;