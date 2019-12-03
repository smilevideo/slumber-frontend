import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 0px',
    textDecoration: 'none',
    color: 'white'
}

class NavBar extends React.Component {
    render() {
        return (<div>
            <NavLink
                to='/'
                exact
                style={{...link, background: 'black'}}
                activeStyle={{
                    background: 'darkblue'
                }}
            >Home</NavLink>

            {this.props.currentUser.username ? 
            <span>
                <NavLink
                    to='/logout'
                    exact
                    style={{...link, background: 'purple'}}
                    activeStyle={{
                        background: 'darkblue'
                    }}
                >Log Out</NavLink>

                <NavLink
                    to='/sleeps'
                    exact
                    style={{...link, background: 'blue'}}
                    activeStyle={{
                        background: 'darkblue'
                    }}
                >Sleep Overview</NavLink>

                <NavLink
                    to='/newsleep'
                    exact
                    style={{...link, background: 'blue'}}
                    activeStyle={{
                        background: 'darkblue'
                    }}
                >Record Sleep</NavLink>

                <NavLink
                    to='/dreams'
                    exact
                    style={{...link, background: 'blue'}}
                    activeStyle={{
                        background: 'darkblue'
                    }}
                >Dream List</NavLink>

            </span> 
            :
            <span>
                <NavLink
                    to='/signup'
                    exact
                    style={{...link, background: 'purple'}}
                    activeStyle={{
                        background: 'darkblue'
                    }}
                >Sign Up</NavLink>
                
                <NavLink
                    to='/login'
                    exact
                    style={{...link, background: 'purple'}}
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