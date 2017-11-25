# react-authentication-route
Provides a component to wrap a react-router route and perform authentication checks with a prop based isAuthenticated flag and redirects to prop provided login component if not authenticated.

Inspired by [reacttrainings react-router example auth workflow](https://reacttraining.com/react-router/web/example/auth-workflow)

## Requirements

Please be sure you have the following in your package.json:

   "dependencies": {
     "babel-polyfill": "6.23.0",
     "prop-types": "15.5.10",
     "react": "15.6.1",
     "react-router-dom": "4.1.1",
   }

## Installation

Pleas be sure you have the requirements mentioned in the previous section installed.

We recommending forking this repository and using as a submodule. To use as a git submodule in your project, navigate to your containers directory and run:

    git submodule add git@github.com:source4societyorg/react-authentication-route.git PrivateRoute

Replace the url with the url of your fork as needed.

For more information on how to use submodules, refer to the [git submodule reference](https://git-scm.com/docs/git-submodule) and this article from [TechJini](http://www.techjini.com/blog/working-with-git-submodules/)

## Example

Add the component similar to how you would a normal route, but pass in the additional props isAuthentication and loginPath. Here is an example using react-router's switch:

    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <PrivateRoute path="/" component={HomePage} loginPath="/login" isAuthenticated={props.isAuthenticated} />
      <Route component={NotFoundPage} />
    </Switch>

This component will redirect the user to the /login route if `isAuthenticated` is false. It is recommended to wrap the container component in `withRouter` that holds the PrivateRoute for the redirect to work properly.
