import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { getToken } from '../helper/StorageFunction';

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return !getToken() ? <Component {...props} />
                    : <Navigate to={{ pathname: "/myProfile" }} />
            }}
        />
    );
}

export default PublicRoute;