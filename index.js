import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
      rest.isAuthenticated ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: rest.loginPath,
          state: { from: props.location },
          push: props.push,
        }}/>
      )
    )}
  />
)

PrivateRoute.defaultProps = {
  push: true
}

PrivateRoute.propTypes = {
  push: PropTypes.bool,
  location: PropTypes.object,
}

export default PrivateRoute;
