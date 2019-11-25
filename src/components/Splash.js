import React from 'react';
import { connect } from 'react-redux';

class Splash extends React.Component {
    render() {
        return (<div>
            <br />
            {this.props.currentUser.username ? 
            <p>Welcome back, {this.props.currentUser.username}.</p> :
            <p>Welcome, please sign up or log in.</p>}
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser
    }
}

export default connect(mapStateToProps, null)(Splash);