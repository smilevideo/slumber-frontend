import React from 'react';
import { connect } from 'react-redux';
import { createSleep } from '../../actions/userActions';

class SleepForm extends React.Component {
    constructor() {
        super()

        this.state = {
            start_day: '',
            start_time: '',
            end_day: '',
            end_time: '',
            note: '',
            rating: 0
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.createSleep(this.state);
    }

    render() {
        return (<React.Fragment>
            <h2>Add a Sleep Entry</h2>

            {this.props.creatingSleep ? <p>Adding Sleep..</p> : null}
            {this.props.createSleepError ? <p>Error, try again.</p> : null}

            <form onSubmit={this.handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>Start Day</th>
                            <th>Start Time</th>
                            <th>End Day</th>
                            <th>End Time</th>
                            <th>Note</th>
                            <th>Rating</th>
                        </tr>
                        <tr>
                            <td>
                                <input 
                                    name='start_day'
                                    placeholder='Start Day'
                                    value={this.state.start_day}
                                    onChange={this.handleChange}
                                /> 
                            </td>
                            <td>
                                <input
                                    name='start_time'
                                    placeholder='Start Time'
                                    value={this.state.start_time}
                                    onChange={this.handleChange}
                                />
                            </td>
                            <td>
                                <input 
                                    name='end_day'
                                    placeholder='End Day'
                                    value={this.state.end_day}
                                    onChange={this.handleChange}
                                /> 
                            </td>
                            <td>
                                <input 
                                    name='end_time'
                                    placeholder='End Time'
                                    value={this.state.end_time}
                                    onChange={this.handleChange}
                                /> 
                            </td>
                            <td>
                                <input 
                                    name='note'
                                    placeholder='Note'
                                    value={this.state.note}
                                    onChange={this.handleChange}
                                /> 
                            </td>
                            <td>
                                <input 
                                    type='number'
                                    name='rating'
                                    placeholder='Rating'
                                    value={this.state.rating}
                                    onChange={this.handleChange}
                                /> 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type='submit' value='Add Sleep'/> 
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
        creatingSleep: state.sleepReducer.creatingSleep,
        createSleepError: state.sleepReducer.createSleepError
    }
}

const mapDispatchToProps = dispatch => ({
    createSleep: sleepParams => dispatch(createSleep(sleepParams))
});

export default connect(mapStateToProps, mapDispatchToProps)(SleepForm);