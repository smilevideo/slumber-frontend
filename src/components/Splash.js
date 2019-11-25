import React from 'react';
import { connect } from 'react-redux';

class Splash extends React.Component {
    render() {
        return (<div>
            <h2>Home</h2>
            {this.props.currentUser.username ? 
            <p>Welcome, {this.props.currentUser.username}.</p> :
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