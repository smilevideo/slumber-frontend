import React from 'react';
import { connect } from 'react-redux';
import { createSleep } from '../../actions/userActions';
import { 
    format,
    subDays
} from 'date-fns';

class SleepForm extends React.Component {
    constructor() {
        super()

        //set today and yesterday's dates as formatted strings
        this.today = format(new Date(), 'yyyy-MM-dd');
        this.yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');

        this.state = {
            start_day: this.yesterday,
            start_time: '',
            end_day: this.today,
            end_time: '',
            note: '',
            rating: '',
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
        return (<div className='main'>
            <h2 className='header'>New Sleep Entry</h2>

            {this.props.creatingSleep ? <p>Adding Sleep..</p> : null}
            {this.props.createSleepError ? <p>Error, try again.</p> : null}

            <form className='sleep-form' onSubmit={this.handleSubmit}>
                <table className='dates-input-table'>
                    <tbody>
                        <tr>
                            <th>Start Day</th>
                            <th>Start Time (24hr)</th>
                            <th>End Day</th>
                            <th>End Time (24hr)</th>
                        </tr>
                        <tr>
                            {/*** START DAY INPUT ***/}
                            <td className='dayForm'>
                                <label className='form-radio'>
                                    <input
                                        type='radio'
                                        name='start_day'
                                        value={this.today}
                                        checked={this.state.start_day === this.today}
                                        onChange={this.handleChange}
                                        className='form-input-radio'
                                    />
                                    Today
                                </label>
                                <label className='form-radio'>
                                    <input
                                        type='radio'
                                        name='start_day'
                                        value={this.yesterday}
                                        checked={this.state.start_day === this.yesterday}
                                        onChange={this.handleChange}
                                        className='form-input-radio'
                                    />
                                    Yesterday
                                </label>
                                <label className='form-radio'>
                                    <input
                                        type='radio'
                                        name='start_day'
                                        value=''
                                        checked={
                                            (this.state.start_day !== this.today) &&
                                            (this.state.start_day !== this.yesterday)
                                        }
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
                                    max={this.today}
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

                            {/*** END DAY INPUT ***/}
                            <td className='dayForm'>
                                <label className='form-radio'>
                                    <input
                                        type='radio'
                                        name='end_day'
                                        value={this.today}
                                        checked={this.state.end_day === this.today}
                                        onChange={this.handleChange}
                                        className='form-input-radio'
                                    />
                                    Today
                                </label>
                                <label className='form-radio'>
                                    <input
                                        type='radio'
                                        name='end_day'
                                        value={this.yesterday}
                                        checked={this.state.end_day === this.yesterday}
                                        onChange={this.handleChange}
                                        className='form-input-radio'
                                    />
                                    Yesterday
                                </label>
                                <label className='form-radio'>
                                    <input
                                        type='radio'
                                        name='end_day'
                                        value=''
                                        checked={
                                            (this.state.end_day !== this.today) &&
                                            (this.state.end_day !== this.yesterday)
                                        }
                                        onChange={this.handleChange}
                                        className='form-input-radio'
                                    />
                                    Other
                                </label>
                                <input className='form-date'
                                    required
                                    type='date'
                                    name='end_day'
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
                </table>
                <br />
                
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
                
                {/*** RATING INPUT ***/}
                <label><strong>Rating (optional):</strong></label><br />
                <table className='rating-input-table'>
                    <tbody>
                        <tr>
                            {/* creates an array of 0 to 4, then produces an array of 1 to 5, then returns the desired JSX for each number */}
                            {[...Array(5).keys()].map(num => num + 1).map(num => {
                                return (<td key={num}>{num}</td>)
                            })}
                            <td>None</td>
                        </tr>
                        <tr>
                            {[...Array(5).keys()].map(num => num + 1).map(num => {
                                return (<td key={num}>
                                    <input
                                        type='radio'
                                        name='rating'
                                        value={num}
                                        checked={this.state.rating === `${num}`}
                                        onChange={this.handleChange}
                                        className='form-input-radio'
                                    />
                                </td>)
                            })}
                            <td>
                                <input
                                    type='radio'
                                    name='rating'
                                    value=''
                                    checked={!this.state.rating}
                                    onChange={this.handleChange}
                                    className='form-input-radio'
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
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