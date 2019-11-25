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

                <table>
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                        </tr>
                        <tr>
                            <td>
                                <input 
                                    name='username'
                                    placeholder='Username'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                /> 
                            </td>
                            <td>
                                <input
                                    name='password'
                                    placeholder='Password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type='submit' value='Log In'/> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    logInUser: userParams => dispatch(logInUser(userParams))
});

export default connect(null, mapDispatchToProps)(LogIn);