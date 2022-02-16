import React, { useState, useEffect } from 'react';
import CardRecipe from '../CardRecipe/CardRecipe';
import { Container } from 'react-bootstrap';
import { API_BASE_URL } from '../../constants/apiConstants';
import '../../component/css/menu.css';



function BreakFast() {
    const [breckFast, setBreckfast] = useState([]);

    function breckfastCategory() {
        fetch(`${API_BASE_URL.root}/recipes/category`)
            .then(res => res.json())
            .then(data => {
                setBreckfast(data.breckFast)
            })
            .catch(err => alert(err));
    }
    useEffect(() => {
        breckfastCategory();
    }, []);

    return (

        <div className="container-menu">
            <Container>
                <div className="div-meny">
                    <h3 id="title-menu"> Breakfast </h3> <hr id="hr3" />
                </div>

                <div className="div-recipes-menu">
                    <CardRecipe recipes={breckFast} />
                </div>
            </Container>
        </div>
    )
}
export default BreakFast;