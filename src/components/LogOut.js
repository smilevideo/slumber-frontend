import React from 'react';
import { connect } from 'react-redux';
import { logOutUser } from '../actions/userActions';

class LogOut extends React.Component {
    handleClick = () => {
        localStorage.removeItem('token');
        this.props.logOutUser();
    }

    render() {
        return (<React.Fragment>
            <h2>Log Out</h2>
            <p>Are you sure you wish to log out?</p>
            <button onClick={this.handleClick}>Log Out</button>
        </React.Fragment>)
    }
}

export default connect(null, { logOutUser })(LogOut);