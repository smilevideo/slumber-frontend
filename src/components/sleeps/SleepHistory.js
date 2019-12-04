import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

class SleepHistory extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedStartDate: subDays(new Date(), 6),
            selectedEndDate: new Date()
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
            console.log(selectedSleepTimeInMinutes);
            this.timeSleptInSelection = minutesToString(selectedSleepTimeInMinutes);

            //calculate average time slept per day
            const daysInInterval = differenceInCalendarDays(this.state.selectedEndDate, this.state.selectedStartDate) + 1;
            this.averageTimeSleptPerDay = minutesToString(Math.floor(selectedSleepTimeInMinutes / daysInInterval));
        }

        return (<>
            <h2>Sleep Overview</h2>
            <Calendar
                onChange={this.onChange}
                value={[this.state.selectedStartDate, this.state.selectedEndDate]}
                maxDate={new Date()}
                minDate={new Date(1900, 1, 1)}
                calendarType='US'
                selectRange={true}
            />

            <h3>{
                //check if start and end of range are the same day
                this.state.selectedStartDate.toString().split(' ').slice(1, 4).join(' ')
                    ===
                    this.state.selectedEndDate.toString().split(' ').slice(1, 4).join(' ')
                ?
                `${format(this.state.selectedStartDate, 'eeee, MMMM do yyyy')}:`
                :
                `${format(this.state.selectedStartDate, 'eeee, MMMM do yyyy')}
                    to 
                    ${format(this.state.selectedEndDate, 'eeee, MMMM do yyyy')}
                    :`   
            }</h3>
            
            {this.selectedSleeps ?
            <>
                {this.selectedSleeps.length > 0 
                ?
                <>
                    <h4>Average time slept per day: {this.averageTimeSleptPerDay}</h4>
                    <h4>Total time slept: {this.timeSleptInSelection}</h4>
                    <ol className='sleepList'>
                        {this.selectedSleeps.map(sleep => {
                            return <li key={sleep.id}>
                                <div>
                                <Link to={`sleeps/${sleep.id}`}>
                                    {`${format(sleep.startDate, 'eeee, MMMM do yyyy')}, ${sleep.start_time} to 
                                    ${format(sleep.endDate, 'eeee, MMMM do yyyy')}, ${sleep.end_time}:`}
                                </Link></div>
                                <div><strong>Sleep duration: </strong>{sleep.duration}</div>
                                <br />
                                <div>{`Rating: ${sleep.rating ? sleep.rating : 'N/A'}`}</div>
                                <br />
                                <div><span>Note: </span>{sleep.note ? sleep.note : 'N/A'}</div>
                                <br />
                                <div><span>Dream(s) recorded: </span>{sleep.dreams.length > 0 ? 'Yes' : 'No'}</div>
                            </li>
                        })}
                    </ol>
                </>
                :
                <p>No sleep recorded for this period.</p>
                }
            </>
            :
            null
            }  
        </>)
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