import React from 'react';
import { connect } from 'react-redux';
import { createSleep } from '../../actions/userActions';
import { format } from 'date-fns';

class SleepForm extends React.Component {
    constructor() {
        super()

        this.state = {
            start_day: '',
            start_time: '',
            end_day: '',
            end_time: '',
            note: '',
            rating: '',
            startDayOption: 'today'
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
        //set today's date as formatted string
        this.today = format(new Date(), 'yyyy-MM-dd')

        return (<div className='main'>
            <h2 className='header'>New Sleep Entry</h2>

            {this.props.creatingSleep ? <p>Adding Sleep..</p> : null}
            {this.props.createSleepError ? <p>Error, try again.</p> : null}

            <form className='sleep-form' onSubmit={this.handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>Start Day</th>
                            <th>Start Time (24hr)</th>
                            <th>End Day</th>
                            <th>End Time (24hr)</th>
                        </tr>
                        <tr>
                            <td className='dayForm'>
                                <label className='form-radio'>
                                    <input
                                        type='radio'
                                        name='startDayOption'
                                        value='today'
                                        checked={this.state.startDayOption === 'today'}
                                        onChange={this.handleChange}
                                        className='form-input-radio'
                                    />
                                    Today
                                </label>
                                <label className='form-radio'>
                                    <input
                                        type='radio'
                                        name='startDayOption'
                                        value='yesterday'
                                        checked={this.state.startDayOption === 'yesterday'}
                                        onChange={this.handleChange}
                                        className='form-input-radio'
                                    />
                                    Yesterday
                                </label>
                                <label className='form-radio'>
                                    <input
                                        type='radio'
                                        name='startDayOption'
                                        value='other'
                                        checked={this.state.startDayOption === 'other'}
                                        onChange={this.handleChange}
                                        className='form-input-radio'
                                    />
                                    Other
                                </label>
                                <br />
                                <input className='form-date'
                                    required
                                    type='date'
                                    name='start_day'
                                    placeholder='Start Day'
                                    max={this.today}
                                    value={this.state.start_day}
                                    onChange={this.handleChange}
                                    disabled={this.state.startDayOption !== 'other'}
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
                                    max={this.today}
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
                    placeholder='(Enter note here)'
                    cols='50'
                    rows='8'
                    value={this.state.note}
                    onChange={this.handleChange}
                />
                <br /><br />
                
                <label><strong>Rating (optional):</strong></label><br />
                <input 
                    type='number'
                    min='1'
                    max='5'
                    name='rating'
                    placeholder='(1-5)'
                    value={this.state.rating}
                    onChange={this.handleChange}
                />
                <br /><br />
                
                <input type='submit' value='Add Sleep'/> 
            </form>
        </div>)
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