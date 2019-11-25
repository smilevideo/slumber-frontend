import React from 'react';

import Logo from './components/Logo';

import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

function App() {
  return (
    <React.Fragment>
      <Logo />
      <SignUp />
      <LogIn />
    </React.Fragment>
  );
}

export default App;
