import { getToken } from '../helper/StorageFunction';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = getToken();
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }
  export default RequireAuth


 /* import React from 'react';
import {Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import {getToken} from '../helper/StorageFunction'




function PrivateRoute({ children, redirectTo }) {
  const token = getToken()
  const authData = useSelector(state => state.token);
    return authData.loggedIn && authData.jwt !== '' ? children : <Navigate to={redirectTo} />;
  }
  export default PrivateRoute*/

