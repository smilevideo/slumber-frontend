import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './index.js';
import { connect } from 'react-redux';
import { getUser } from './actions/userActions';

import Logo from './components/Logo';
import NavBar from './components/NavBar';

import Splash from './components/Splash';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';

class App extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <>
          <Logo />
          <NavBar />
          <Switch>
            <Route exact path='/' component={Splash} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={LogIn} />
            <Route exact path='/logout' component={LogOut} />
          </Switch>
        </>
      </ConnectedRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser())
})

export default connect(null, mapDispatchToProps)(App);