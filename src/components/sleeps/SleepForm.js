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
            rating: ''
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
                        </tr>
                        <tr>
                            <td>
                                <input 
                                    required
                                    type='date'
                                    name='start_day'
                                    placeholder='Start Day'
                                    value={this.state.start_day}
                                    onChange={this.handleChange}
                                /> 
                            </td>
                            <td>
                                <input
                                    required
                                    type='time'
                                    name='start_time'
                                    placeholder='Start Time'
                                    value={this.state.start_time}
                                    onChange={this.handleChange}
                                />
                            </td>
                            <td>
                                <input 
                                    required
                                    type='date'
                                    name='end_day'
                                    placeholder='End Day'
                                    min={this.state.start_day}
                                    value={this.state.end_day}
                                    onChange={this.handleChange}
                                /> 
                            </td>
                            <td>
                                <input 
                                    required
                                    type='time'
                                    name='end_time'
                                    placeholder='End Time'
                                    min={this.state.end_day === this.state.start_day ? this.state.start_time : null}
                                    value={this.state.end_time}
                                    onChange={this.handleChange}
                                /> 
                            </td>
                        </tr>
                    </tbody>
                </table><br />

                <label><strong>Note (optional):</strong></label><br />
                <textarea
                    name='note'
                    placeholder='(Any notes, max 400 characters)'
                    maxLength='400'
                    cols='60'
                    rows='10'
                    value={this.state.note}
                    onChange={this.handleChange}
                /><br /><br />

                <label><strong>Rating (optional):</strong></label><br />
                <input 
                    type='number'
                    min='1'
                    max='5'
                    name='rating'
                    placeholder='(1-5)'
                    value={this.state.rating}
                    onChange={this.handleChange}
                /><br /><br />

                <input type='submit' value='Add Sleep'/> 
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