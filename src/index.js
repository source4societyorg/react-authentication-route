import React from 'react';
import { valueOrDefault, findOne } from '@source4society/scepter-utility-lib';
import { Route, Redirect } from 'react-router';
import { defaultProps, propTypes } from './props';

const PrivateRoute = ({ component: Component, ...rest, injectedDetermineAccess }) => {
  const determineAccess = valueOrDefault(injectedDetermineAccess, determineAccessFunction);
  return <Route {...rest} render={(props) => determineAccess(props, rest, Component)} />;
};

export const determineAccessFunction = (values, rest, Component, injectedAuthenticatedRoute, injectedRoleAllowed) => {
  const authenticatedRoute = valueOrDefault(injectedAuthenticatedRoute, authenticatedRouteFunction);
  const roleAllowed = valueOrDefault(injectedRoleAllowed, roleAllowedFunction);
  if (roleAllowed(rest)) {
    return authenticatedRoute(values, rest, Component);
  }

  return (
    <Redirect
      to={{
        pathname: rest.accessDeniedPath,
        state: { from: values.location },
        push: values.push,
      }}
    />
  );
};

export const authenticatedRouteFunction = (values, rest, Component) => {
  if (rest.isAuthenticated) {
    return <Component {...rest} />;
  }

  return (<Redirect
    to={{
      pathname: rest.loginPath,
      state: { from: values.location },
      push: values.push,
    }}
  />);
};

export const roleAllowedFunction = (rest) => (rest.accessRoles.length === 0 || findOne(rest.accessRoles, rest.userRoles));

PrivateRoute.defaultProps = defaultProps;
PrivateRoute.propTypes = propTypes;
export default PrivateRoute;
