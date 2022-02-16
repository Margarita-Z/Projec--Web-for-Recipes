import React, { useState, useEffect } from 'react';
import CardRecipe from '../CardRecipe/CardRecipe';
import { Container } from 'react-bootstrap';
import { API_BASE_URL } from '../../constants/apiConstants';
import '../../component/css/menu.css';


function Braunch() {
    const [brunch, setFood] = useState([]);

    function braunchCategory() {
        fetch(`${API_BASE_URL.root}/recipes/category`)
            .then(res => res.json())
            .then(data => {
                setFood(data.brunch)
            })
            .catch(err => alert(err));
    }
    useEffect(() => {
        braunchCategory();
    }, []);

    return (


        <div className="container-menu">
            <Container>
                <div className="div-meny">
                    <h3 id="title-menu"> Brunch </h3> <hr id="hr3" />
                </div>

                <div className="div-recipes-menu">
                    <CardRecipe recipes={brunch} />
                </div>
            </Container>
        </div>

    )
}
export default Braunch;