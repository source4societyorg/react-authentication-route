# react-authentication-route

Provides a container to wrap a react-router route and perform authentication checks with a prop based isAuthenticated flag and redirects to prop provided login component if not authenticated.

[![scepter-logo](http://res.cloudinary.com/source-4-society/image/upload/v1519221119/scepter_hzpcqt.png)](https://github.com/source4societyorg/SCEPTER-core)

[![airbnb-codestyle](https://camo.githubusercontent.com/1c5c800fbdabc79cfaca8c90dd47022a5b5c7486/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d616972626e622d627269676874677265656e2e7376673f7374796c653d666c61742d737175617265)](https://github.com/airbnb/javascript)

[![Build Status](https://travis-ci.org/source4societyorg/react-authentication-route.svg?branch=master)](https://travis-ci.org/source4societyorg/react-authentication-route)

[![codecov](https://codecov.io/gh/source4societyorg/react-authentication-route/branch/master/graph/badge.svg)](https://codecov.io/gh/source4societyorg/react-authentication-route)

Inspired by [reacttrainings react-router example auth workflow](https://reacttraining.com/react-router/web/example/auth-workflow).

Can work hand in hand with [react-authapp-container](https://github.com/source4societyorg/react-authapp-container). By adding this route to your application's shell you will be able to easily redirect to the login page if the user has yet to authenticate.

## Installation

    npm install @source4society/react-authentication-route

or

    yarn add @source4society/react-authentication-route

## Example

Add the component similar to how you would a normal route, but pass in the additional props isAuthentication and loginPath. Here is an example using react-router's switch:

    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <PrivateRoute path="/" component={HomePage} loginPath="/login" isAuthenticated={props.isAuthenticated} />
      <Route component={NotFoundPage} />
    </Switch>

This component will redirect the user to the /login route if `isAuthenticated` is false. It is recommended to wrap the container component in `withRouter` that holds the PrivateRoute for the redirect to work properly.
