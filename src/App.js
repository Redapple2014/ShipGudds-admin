import React, { Component } from 'react';
import {  Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import './scss/style.scss';


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages

// const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const SignInMasterPage = React.lazy(() => import('./views/pages/login/SignInMasterPage'));

// function to guard the component for private access
const authGuard = (Component) => () => {
  return localStorage.getItem("shipGudds_admin_auth_token") ? (
    <Component />
  ) : (
    <Redirect to="/login" />
  );
};

//24/05/2023  24-05-2023
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <SignInMasterPage {...props} />} />          
            <Route exact path="/register" name="Register Page" render={authGuard("/register")} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <Route path="/" name="Home" render={authGuard(props => <TheLayout {...props} />)} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
