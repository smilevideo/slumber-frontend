import React from 'react';
import { NavLink } from 'react-router-dom';

const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 0px',
    background: 'blue',
    textDecoration: 'none',
    color: 'white'
}

class NavBar extends React.Component {
    render() {
        return (<React.Fragment>
            <NavLink
                to='/'
                exact
                style={link}
                activeStyle={{
                    background: 'darkblue'
                }}
            >Home</NavLink>
            <NavLink
                to='/signup'
                exact
                styles={link}
                activeStyle={{
                    background: 'darkblue'
                }}
            >Sign Up</NavLink>
            <NavLink
                to='/login'
                exact
                styles={link}
                activeStyle={{
                    background: 'darkblue'
                }}
            >Log In</NavLink>
        </React.Fragment>)
    }
}

export default NavBar;