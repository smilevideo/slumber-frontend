import React from 'react';
import { connect } from 'react-redux';
import { createUser } from '../redux/actions';

class SignUp extends React.Component {
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

        this.props.createUser(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Create an Account</h1>

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
}

const mapDispatchToProps