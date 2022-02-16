import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CardRecipe from '../CardRecipe/CardRecipe';
import { API_BASE_URL } from '../../constants/apiConstants';
import '../HomePage/HomePage.css';


function HomePage() {
    const [freshNew, setFreshNew] = useState([]);
    const [mostPopulare, setMostPopular] = useState([]);

    function homePage() {
        fetch(API_BASE_URL.root)
            .then(res => res.json())
            .then(data => {
                setFreshNew(data.freshNew)
                setMostPopular(data.mostPopulare)
            })
            .catch(err => alert(err));
    }
    useEffect(() => {
        homePage();
    }, []);

    return (

        <div className='div-main-page'>
            <Container>
                <div className="div-cards">
                    <h3 id="topic">Fresh  &amp; New</h3> <hr id="hr" />
                </div>

                <div className="div-recipes-card">
                    <CardRecipe recipes={freshNew} />
                </div>

                <div className="div-cards">
                    <h3 id="topic">Most Popular Recipes</h3> <hr id="hr" />
                </div>

                <div className="div-recipes-card">
                    <CardRecipe recipes={mostPopulare} />
                </div>
            </Container>
        </div>
    )
}
export default HomePage;