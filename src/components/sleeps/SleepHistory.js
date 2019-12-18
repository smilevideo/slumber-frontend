import React from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import { 
    areIntervalsOverlapping, 
    format, 
    differenceInMinutes,
    isBefore,
    isAfter,
    differenceInCalendarDays,
    subDays
} from 'date-fns';
import { minutesToString } from '../../helperFunctions';
import SleepItem from './SleepItem';

class SleepHistory extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedStartDate: subDays(new Date(), 7),
            selectedEndDate: subDays(new Date(), 1)
        };
    }

    onChange = (date) => {
        this.setState({ 
            selectedStartDate: date[0],
            selectedEndDate: date[1]
        });
    }

    render() {
        if (this.props.sleeps) {
            //set array of sleeps with any time in the selected range
            this.selectedSleeps = this.props.sleeps.filter(sleep => {
                return (
                    areIntervalsOverlapping(
                        { start: sleep.startDate, end: sleep.endDate },
                        { start: this.state.selectedStartDate, end: this.state.selectedEndDate }
                    )
                );
            });

            //calculate total time slept in the selected range
            const selectedSleepTimeInMinutes = this.selectedSleeps.reduce((memo, sleep) => {
                if (isBefore(sleep.startDate, this.state.selectedStartDate)) {
                    if (isAfter(sleep.endDate, this.state.selectedEndDate)) {
                        return memo + differenceInMinutes(this.state.selectedEndDate, this.state.selectedStartDate) + 1;
                    }
                    
                    else {
                        return memo + differenceInMinutes(sleep.endDate, this.state.selectedStartDate);
                    }
                }
                else if (isAfter(sleep.endDate, this.state.selectedEndDate)) {
                    return memo + differenceInMinutes(this.state.selectedEndDate, sleep.startDate) + 1;
                }
                else {
                    return memo + differenceInMinutes(sleep.endDate, sleep.startDate)
                }
            }, 0)
            this.timeSleptInSelection = minutesToString(selectedSleepTimeInMinutes);

            //calculate average time slept per day
            const daysInInterval = differenceInCalendarDays(this.state.selectedEndDate, this.state.selectedStartDate) + 1;
            this.averageTimeSleptPerDay = minutesToString(Math.floor(selectedSleepTimeInMinutes / daysInInterval));
        }

        return (<div className='main'>
            <h2 className='header'>Sleep Overview</h2>
            <p style={{textAlign: 'center'}}>Select a date range:</p>
            <Calendar
                onChange={this.onChange}
                value={[this.state.selectedStartDate, this.state.selectedEndDate]}
                maxDate={new Date()}
                minDate={new Date(1900, 1, 1)}
                calendarType='US'
                selectRange={true}
            />

            <h3 style={{textAlign: 'center'}}>{
                //check if start and end of range are the same day
                this.state.selectedStartDate.toString().split(' ').slice(1, 4).join(' ')
                    ===
                    this.state.selectedEndDate.toString().split(' ').slice(1, 4).join(' ')
                ?
                `${format(this.state.selectedStartDate, 'eeee, MMMM do yyyy')}:`
                :
                `${format(this.state.selectedStartDate, 'eeee, MMMM do yyyy')}
                    to 
                    ${format(this.state.selectedEndDate, 'eeee, MMMM do yyyy')}:`   
            }</h3>
            
            {this.selectedSleeps ?
            <>
                {this.selectedSleeps.length > 0 
                ?
                <>
                    <p style={{textAlign: 'center'}}>Average time slept per day: {this.averageTimeSleptPerDay}</p>
                    <p style={{textAlign: 'center'}}>Total time slept: {this.timeSleptInSelection}</p>
                    <br />
                    <hr className='sleep-list-begin'/>
                    <h4>List of sleep sessions during this period:</h4>
                    <ol className='sleepList'>
                        {this.selectedSleeps.map(sleep => <SleepItem sleep={sleep} />)}
                    </ol>
                </>
                :
                <p>No sleep recorded for this period.</p>
                }
            </>
            :
            null
            }  
        </div>)
    }
};

const mapStateToProps = (state) => {
    return {
        sleeps: state.userReducer.currentUser.sleeps
    }
}

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(SleepHistory);