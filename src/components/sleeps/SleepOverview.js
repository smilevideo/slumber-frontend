import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import { parse, areIntervalsOverlapping, isBefore, isAfter } from 'date-fns';

class SleepOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDateStart: null,
            selectedDateEnd: null
        };
    }

    onChange = (date) => {
        this.setState({ 
            selectedDateStart: date[0],
            selectedDateEnd: date[1]
        });
    }

    render() {
        if (this.props.sleeps && this.state.selectedDateEnd) {
            this.selectedSleeps = this.props.sleeps.filter(sleep => {
                const sleepStartDate = parse(`${sleep.start_day} ${sleep.start_time}`, 'yyyy-MM-dd HH:mm', new Date());
                const sleepEndDate = parse(`${sleep.end_day} ${sleep.end_time}`, 'yyyy-MM-dd HH:mm', new Date());

                return (
                    areIntervalsOverlapping(
                        { start: sleepStartDate, end: sleepEndDate },
                        { start: this.state.selectedDateStart, end: this.state.selectedDateEnd }
                    )
                );
            });
            console.log('start: ', this.state.selectedDateStart);
            console.log('end: ', this.state.selectedDateEnd);
        }

        return (<React.Fragment>
            <h2>Sleep Overview</h2>
            <p>Select a range to look at:</p>
            <Calendar
                onChange={this.onChange}
                value={[this.state.selectedDateStart, this.state.selectedDateEnd]}
                maxDate={new Date()}
                minDate={new Date(1900, 1, 1)}
                calendarType='US'
                selectRange={true}
            />

            {this.selectedSleeps ?
            <ol className='sleepList'>
                {this.selectedSleeps.map(sleep => {
                    return <li key={sleep.id}>
                        <div><Link to={`sleeps/${sleep.id}`}>{`${sleep.start_day}, ${sleep.start_time} to ${sleep.end_day}, ${sleep.end_time}`}</Link></div>
                        <div><strong>Total duration: </strong>{/*todo stuff*/}</div>
                        <div><span>Rating: </span>{sleep.rating ? sleep.rating : 'N/A'}</div>
                        <br />
                        <div><span>Note: </span>{sleep.note ? sleep.note : 'N/A'}</div>
                        <br />
                    </li>
                })}
            </ol> :
            null
            }
            
        </React.Fragment>)
    }
};

const mapStateToProps = (state) => {
    return {
        sleeps: state.userReducer.currentUser.sleeps
    }
}

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(SleepOverview);