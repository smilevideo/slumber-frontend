import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (<div className='navbar'>
            <NavLink
                to='/'
                exact
                activeClassName='navbar-chosen'
                className='navbar-list-item navbar-logo'
            ><strong>Slumber</strong></NavLink>

            {this.props.currentUser.username ? 
            <>
                <div className='navbar-flex-filler-loggedin' />
                <NavLink
                    to='/logout'
                    exact
                    activeClassName='navbar-chosen'
                    className='navbar-list-item navbar-logout'
                >Log Out</NavLink>

                <NavLink
                    to='/sleeps'
                    exact
                    activeClassName='navbar-chosen'
                    className='navbar-list-item'
                >Sleep History</NavLink>

                <NavLink
                    to='/newsleep'
                    exact
                    activeClassName='navbar-chosen'
                    className='navbar-list-item'
                >Record Sleep</NavLink>

                <NavLink
                    to='/dreams'
                    exact
                    activeClassName='navbar-chosen'
                    className='navbar-list-item'
                >Dream List</NavLink>
            </>
            :
            <>
                <div className='navbar-flex-filler-loggedout' />
                <NavLink
                    to='/signup'
                    exact
                    activeClassName='navbar-chosen'
                    className='navbar-list-item'
                >Sign Up</NavLink>
                
                <NavLink
                    to='/login'
                    exact
                    activeClassName='navbar-chosen'
                    className='navbar-list-item navbar-login'
                >Log In</NavLink>
            </>}
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser
    }
}

export default connect(mapStateToProps, null)(NavBar);