import React from 'react';
import { connect } from 'react-redux';
import { createUser } from '../actions/userActions';

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
        return (<React.Fragment>
            <h2>Create an Account</h2>
            {this.props.creatingUser ? <p>Creating User..</p> : null}
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
                                <input type='submit' value='Create User'/> 
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
        creatingUser: state.userReducer.creatingUser
    }
}

const mapDispatchToProps = dispatch => ({
    createUser: userParams => dispatch(createUser(userParams))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);