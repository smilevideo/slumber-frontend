import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './index.js';
import { connect } from 'react-redux';
import { getUser } from './actions/userActions';

import Logo from './components/Logo';
import NavBar from './components/NavBar';
import Splash from './components/Splash';

import LogOut from './components/LogOut';
import SleepForm from './components/sleeps/SleepForm';

import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import SleepOverview from './components/sleeps/SleepOverview.js';


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
            <Route exact path='/sleeps' component={SleepOverview} />
            <Route exact path='/newsleep' component={SleepForm} />
            <Route exact path='/logout' component={LogOut} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={LogIn} />
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