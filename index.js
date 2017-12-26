import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';

const findOne = (haystack, array) => array.some(v => haystack.indexOf(v) >= 0);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    (rest.accessRoles.length === 0 || findOne(rest.accessRoles, rest.userRoles)) ? (
      rest.isAuthenticated ? (
        <Component {...rest}/>
      ) : (
        <Redirect to={{
          pathname: rest.loginPath,
          state: { from: props.location },
          push: props.push,
        }}/>
      )
    ) : (
      <Redirect to={{
        pathname: rest.accessDeniedPath,
        state: { from: props.location },
        push: props.push,
      }}/>
    )
  )}/>
);

PrivateRoute.defaultProps = {
  push: true,
  accessRoles: [],
  userRoles: [],
  loginPath: '/login',
  accessDeniedPath: '/access-denied',
  isAuthenticated: false,
}

PrivateRoute.propTypes = {
  push: PropTypes.bool,
  location: PropTypes.object,
  accessRoles: PropTypes.array,
  userRoles: PropTypes.array,
  adminPath: PropTypes.string,
  accessDeniedPath: PropTypes.string,
  isAuthenticated: PropTypes.bool,
}

export default PrivateRoute;
