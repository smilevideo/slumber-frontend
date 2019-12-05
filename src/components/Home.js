import React from 'react';
import { connect } from 'react-redux';
import { 
    subDays, 
    format, 
    startOfDay, 
    endOfDay, 
    areIntervalsOverlapping,
    differenceInMinutes
} from 'date-fns';
import RenderBarChart from './RenderBarChart';

class Home extends React.Component {
    constructor() {
        super();
        
        //arrays of last 7 days as objects containing both JS date and string representations
        this.pastSevenDays = [];
        const today = new Date();
        for(let i = 0; i < 7; i++) {
            const date = subDays(today, 7 - i);
            const string = format(date, 'eeee, MMMM do')
            this.pastSevenDays.push({ date, string });
        };
    }

    render() {
        if (this.props.currentUser.username) {
            //find time slept in each of the last 7 days            
            const relevantSleeps = this.props.currentUser.sleeps.filter(sleep => {
                return areIntervalsOverlapping(
                    { start: startOfDay(this.pastSevenDays[0].date), end: endOfDay(this.pastSevenDays[6].date) },
                    { start: sleep.startDate, end: sleep.endDate }
                )
            })

            for(let i = 0; i < 7; i++) {
                this.pastSevenDays[i].timeSleptInMinutes = 0;

                relevantSleeps.forEach(sleep => {
                    const dayStart = startOfDay(this.pastSevenDays[i].date);
                    const dayEnd = endOfDay(this.pastSevenDays[i].date);
                    if (areIntervalsOverlapping(
                        { start: dayStart, end: dayEnd },
                        { start: sleep.startDate, end: sleep.endDate }
                    )) {
                        if (sleep.startDate < dayStart) {
                            if (sleep.endDate > dayEnd) {
                                this.pastSevenDays[i].timeSleptInMinutes += 1440;
                            }
                            else {
                                this.pastSevenDays[i].timeSleptInMinutes += differenceInMinutes(sleep.endDate, dayStart);
                            }
                        }
                        else if (sleep.endDate > dayEnd) {
                            this.pastSevenDays[i].timeSleptInMinutes += differenceInMinutes(dayEnd, sleep.startDate);
                        }
                        else {
                            this.pastSevenDays[i].timeSleptInMinutes += differenceInMinutes(sleep.endDate, sleep.startDate);
                        }
                    }
                })
                
                this.pastSevenDays[i].timeSleptInHours = Math.round((this.pastSevenDays[i].timeSleptInMinutes / 60) * 10) / 10;
            }
        }

        return (<div className='main'>
            <h2 className='header'>Home</h2>
            {
                this.props.currentUser.username 
                ?
                <> 
                <p>Welcome, {this.props.currentUser.username}.</p>
                <br />
                <RenderBarChart period='Week' data={this.pastSevenDays} />
                </>
                :
                <p>Welcome, please sign up or log in.</p>
            }
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser
    }
}

export default connect(mapStateToProps, null)(Home);