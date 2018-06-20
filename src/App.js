import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import SignInPage from './components/SignIn/SignIn';
import Landing from './containers/Landing/Landing';
import * as routes from './constants/routes'
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Portfolio from './containers/Portfolio/Portfolio';

class App extends Component {

  componentDidMount() {
    if (this.props.storedUser === null) {
      this.props.ifNoStoredUser();
    } else {
      this.props.ifStoredUser(localStorage.getItem('token'), localStorage.getItem('userId'));
    }
  }

  render() {
    return (
      <Router className="App">
        <div>
          <Navigation />
          <Route path='/' exact
            component={() => <Landing />} 
          />
          <Route exact path={routes.REGISTER}
            component={() => <Register />} 
          />
          <Route exact path={routes.SIGN_IN}
            component={() => <SignInPage />} 
          />
          <Route exact path={routes.PORTFOLIO}
            component={() => <Portfolio />} 
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    storedUser: localStorage.getItem('userId')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ifNoStoredUser: () => dispatch(actions.signOut()),
    ifStoredUser: (token, userId) => dispatch(actions.authSuccess(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);