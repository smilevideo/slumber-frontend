import React from 'react';
import { connect } from 'react-redux';
import { logOutUser } from '../actions/userActions';


class LogOut extends React.Component {
    handleClick = () => {
        localStorage.removeItem('token');
        this.props.logOutUser();
    }

    render() {
        return (<div>
            {this.props.currentUser.username ? <button onClick={this.handleClick}>Log Out?</button> : null}
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOutUser: () => dispatch(logOutUser())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LogOut);