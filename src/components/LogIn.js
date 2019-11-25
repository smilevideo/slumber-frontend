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
        return (<React.Fragment>
            <h2>Login</h2>
            
            {this.props.loggingIn ? <p>Logging In..</p> : null}
            {this.props.errorMessage ? <p>{this.props.errorMessage}</p> : null}

            <form onSubmit={this.handleSubmit}>
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
        </React.Fragment>)
    }
};

const mapStateToProps = (state) => {
    return {
        loggingIn: state.userReducer.loggingIn,
        errorMessage: state.userReducer.errorMessage
    }
}

const mapDispatchToProps = dispatch => ({
    logInUser: userParams => dispatch(logInUser(userParams))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);