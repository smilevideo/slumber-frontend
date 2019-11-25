import React from 'react';
import { connect } from 'react-redux';
import { logInUser } from '../actions/userActions';

class LogIn extends React.Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.logInUser(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Login</h2>

                <label>Username</label>
                <input 
                    name='username'
                    placeholder='Username'
                    value={this.state.username}
                    onChange={this.handleChange}
                /><br />

                <label>Password</label>
                <input
                    name='password'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.handleChange}
                /><br />

                <input type='submit' /> 
            </form>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    logInUser: userParams => dispatch(logInUser(userParams))
});

export default connect(null, mapDispatchToProps)(LogIn);