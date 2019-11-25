import React from 'react';
import { connect } from 'react-redux';
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
        return (<div>
            <NavLink
                to='/'
                exact
                style={link}
                activeStyle={{
                    background: 'darkblue'
                }}
            >Home</NavLink>

            {this.props.currentUser.username ? 
            <span>
                <NavLink
                    to='/logout'
                    exact
                    style={link}
                    activeStyle={{
                        background: 'darkblue'
                    }}
                >Log Out</NavLink>  
            </span> 
            :
            <span>
                <NavLink
                    to='/signup'
                    exact
                    style={link}
                    activeStyle={{
                        background: 'darkblue'
                    }}
                >Sign Up</NavLink>
                
                <NavLink
                    to='/login'
                    exact
                    style={link}
                    activeStyle={{
                        background: 'darkblue'
                    }}
                >Log In</NavLink>
            </span>}
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser
    }
}

export default connect(mapStateToProps, null)(NavBar);