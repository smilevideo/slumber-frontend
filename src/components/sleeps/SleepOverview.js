import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import { parse, areIntervalsOverlapping, format, differenceInMinutes } from 'date-fns';

class SleepOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedStartDate: null,
            selectedEndDate: null
        };
    }

    onChange = (date) => {
        this.setState({ 
            selectedStartDate: date[0],
            selectedEndDate: date[1]
        });
        
    }

    render() {
        if (this.props.sleeps && this.state.selectedEndDate) {
            this.selectedSleeps = this.props.sleeps.filter(sleep => {
                const sleepStartDate = parse(`${sleep.start_day} ${sleep.start_time}`, 'yyyy-MM-dd HH:mm', new Date());
                const sleepEndDate = parse(`${sleep.end_day} ${sleep.end_time}`, 'yyyy-MM-dd HH:mm', new Date());

                console.log(this.state.selectedStartDate.toString().split(' ').slice(1, 4).join(' '))

                return (
                    areIntervalsOverlapping(
                        { start: sleepStartDate, end: sleepEndDate },
                        { start: this.state.selectedStartDate, end: this.state.selectedEndDate }
                    )
                );
            });

            //add start and end dates as JS date attributes to each sleep in selection
            this.selectedSleeps = this.selectedSleeps.map(sleep => {
                return ({
                    ...sleep, 
                    startDate: parse(`${sleep.start_day} ${sleep.start_time}`, 'yyyy-MM-dd HH:mm', new Date()),
                    endDate: parse(`${sleep.end_day} ${sleep.end_time}`, 'yyyy-MM-dd HH:mm', new Date())
                })
            })
        }

        return (<React.Fragment>
            <h2>Sleep Overview</h2>
            <Calendar
                onChange={this.onChange}
                value={[this.state.selectedStartDate, this.state.selectedEndDate]}
                maxDate={new Date()}
                minDate={new Date(1900, 1, 1)}
                calendarType='US'
                selectRange={true}
            />

            {this.selectedSleeps ?
            <>
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

            {this.selectedSleeps.length > 0 
            ?
            <ol className='sleepList'>
                {this.selectedSleeps.map(sleep => {
                    const duration = `${Math.floor(Math.abs(differenceInMinutes(sleep.startDate, sleep.endDate)) / 60)}h 
                        ${Math.abs(differenceInMinutes(sleep.startDate, sleep.endDate)) % 60}m`

                    return <li key={sleep.id}>
                        <div><Link to={`sleeps/${sleep.id}`}>{`${sleep.start_day}, ${sleep.start_time} to ${sleep.end_day}, ${sleep.end_time}`}</Link></div>
                        <div><strong>Total duration: </strong>{duration}</div>
                        <br />
                        <div>{`Rating: ${sleep.rating ? sleep.rating : 'N/A'}`}</div>
                        <br />
                        <div><span>Note: </span>{sleep.note ? sleep.note : 'N/A'}</div>
                        <br />
                        <div><span>Dream(s) Recorded?: </span>{sleep.dreams.length > 0 ? 'Yes' : 'No'}</div>
                    </li>
                })}
            </ol>
            :
            <p>No sleep recorded for this period.</p>
            }
            </>
            :
            <h3>Please select a date range in the calendar above.</h3>
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