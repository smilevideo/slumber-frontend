import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (<div className='navbar'>
            <NavLink
                to='/'
                exact
                className='navbar-logo'
            >Slumber</NavLink>

            {this.props.currentUser.username ? 
            <>
                <NavLink
                    to='/logout'
                    exact
                    activeClassName='navbar-chosen'
                    className='navbar-list-item'
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
                    className='navbar-list-item'
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