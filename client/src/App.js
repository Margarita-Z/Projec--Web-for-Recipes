import React from "react";
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './component/partials/Footer';
import HomePage from './component/HomePage/HomePage';
import {Login} from './component/Login/Login';
import BreakFast from "./component/BreakFast/BreakFast";
import Braunch from "./component/Braunch/Braunch";
import Lunch from "./component/Lunch/Lunch";
import Dinner from "./component/Dinner/Dinner";
import Account from "./component/Account/Account";
import MyProfile from "./component/MyProfile/MyProfile";
import MyRecipes from "./component/MyRecipes/MyRecipes";
import CreateRecipe from "./component/CreateRecipe/CreateRecipe";
import EditRecipe from './component/EditRecipe/EditRecipe';
import MyHeader from './component/partials/MyHeader';
import  RequireAuth  from './helper/PrivateRoute';
import {Container} from 'react-bootstrap'
import './component/css/app.css';
//import './component/css/form.css';


export function App() {
 
 return (
   
  <div id='app-container'>
    <Container>
    <div className="upper-page">
     
        <div className="div-navbar">
         <MyHeader />
        </div>
        <div className="div-routes">
  
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route   path='/breakFast' element={<BreakFast />} />
          <Route path='/braunch' element={<Braunch />} />
          <Route path='/lunch' element={<Lunch />} />
          <Route path='/dinner' element={<Dinner />} />
          <Route path='/register' element={<Account />} />
          <Route exact path='/login' element={<Login />} />

          <Route path='/myProfile' 
          element={
            <RequireAuth redirectTo='/login'>
          <MyProfile />
          </RequireAuth>
        } />
         <Route exact path='/MyRecipes' 
         element={
          <RequireAuth redirectTo='/login'>
         <MyRecipes/>
         </RequireAuth>
        }/>
          <Route path='/createRecipe'
           element={
            <RequireAuth redirectTo='/login'>
           <CreateRecipe />
           </RequireAuth>
          } />
          <Route exact path='/editRecipe/:id' 
          element={
            <RequireAuth redirectTo='/login'>
          <EditRecipe />
          </RequireAuth>
        } />
           </Routes>
       
           </div>
          
      </div>
     </Container>
      <div className="div-footer">
        <Footer />
      </div>
      
   </div>

   
  );
}



