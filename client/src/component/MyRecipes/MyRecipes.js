import React, { useEffect, useState } from "react";
import { Button, Container, Row } from 'react-bootstrap';
import { API_BASE_URL } from "../../constants/apiConstants";
import { getToken , removeUserStorage} from '../../helper/StorageFunction';
import { useNavigate } from "react-router-dom";
import '../MyRecipes/MyRecipes.css';

function MyRecipes() {

    const [recipe, setRecipe] = useState([]);
    const token = getToken();
    let navigate = useNavigate();


    function getRecipe() {
        fetch(`${API_BASE_URL.root}/recipes/allRecipe`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.message)
                removeUserStorage()
                navigate('/login')
            }
            else { setRecipe(data.recipe) }
        })
        .catch(err => alert(err))
    }
    function deleteRecipe(id) {
        fetch(`${API_BASE_URL.root}/recipes/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            res.json()
                .then(data => {
                    console.log(data);
                })
            getRecipe()
        })
    }
   

    useEffect(() => {
        getRecipe();
    }, [])
    const editRedirect = (id) => {
        navigate(`/editRecipe/${id}`);
    }
    return (
        <div className='container-myRecipe'>
           <Container>
            
           <div className="div-myRecipe">
                    <h3 id="myRecipe-title">My recipes</h3><hr id="hr10" />
                   
                  <Button className='plus-button' variant="warning" href='/createRecipe' ><i class="bi bi-plus" style={{textAlign: "center"}}></i></Button>
                   </div>
               
                <Row>
                    
                    <table responsive="sm" className="recipes-table">
                            <thead>
                                <tr className="thead-tr-th">
                                    <th className="recipe-name">Recipe Name</th>
                                    <th className="category">Category</th>
                                    <th  className="created-on" colSpan='3'>Created On</th>
                                    <th className="delete" style={{ textAlign: "right" }}>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                               
                                    {
                                        recipe.map(recipes => {
                                            return (

                                                <tr className="tbody-tr-td" key={recipes._id}>

                                                    <td className="body-title"><Button variant="link" style={{ textDecoration: 'none' }} onClick={() => editRedirect(recipes._id)} >{recipes.title}</Button></td>
                                                    <td className="body-category">{recipes.category}</td>
                                                    <td className="body-created-on">{new Date(recipes.createdAt).toLocaleDateString('en-GB')}</td>
                                                    <td className="body-delete-bin" style={{ textAlign: "right" }}> <Button variant="link" style={{ color: 'gray' }} onClick={() => deleteRecipe(recipes._id)}><i class="bi bi-trash" ></i></Button></td>
                                                </tr>
                                            )
                                        })
                                    }
                              
                            </tbody>
                        </table>
                    
                </Row>

                </Container>
        </div>





    )
}

export default MyRecipes;