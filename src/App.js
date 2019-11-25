import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from './actions/userActions';

import Logo from './components/Logo';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

class App extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <Router>
        <Logo />  
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={LogIn} />
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser())
})

export default connect(null, mapDispatchToProps)(App);