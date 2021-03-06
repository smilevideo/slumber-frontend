import React from 'react';
import { connect } from 'react-redux';
import { logOutUser } from '../actions/userActions';

class LogOut extends React.Component {
    handleClick = () => {
        localStorage.removeItem('token');
        this.props.logOutUser();
    }

    render() {
        return (<div className='main'>
            <h2 className='header'>Log Out</h2>
            <p>Are you sure you wish to log out?</p>
            <button onClick={this.handleClick}>Log Out</button>
        </div>)
    }
}

const mapDispatchToProps = dispatch => ({
    logOutUser: () => dispatch(logOutUser())
})

export default connect(null, mapDispatchToProps)(LogOut);