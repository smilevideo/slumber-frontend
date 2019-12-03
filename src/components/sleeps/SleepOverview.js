import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import parse from 'date-fns/parse';

class SleepOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDateRange: null
        };
    }

    onChange = (date) => {
        console.log(date);
        // debugger;
        this.setState({ selectedDateRange: date });
    }

    render() {
        if (this.props.sleeps) {
            this.props.sleeps.forEach(sleep => {
                console.log(sleep.start_day);
                console.log(parse(sleep.start_day, 'yyyy-MM-dd', new Date()));
            })

            this.selectedSleeps = this.props.sleeps.filter(sleep => {
                return (
                    false //TODO
                )
            });
        }

        return (<React.Fragment>
            <h2>Sleep Overview</h2>
            <p>Select a range to look at:</p>
            <Calendar
                onChange={this.onChange}
                value={this.state.selectedDateRange}
                maxDate={new Date()}
                minDate={new Date(1900, 1, 1)}
                calendarType='US'
                selectRange={true}
            />
            
            
            {this.props.sleeps ?
            <ol className='sleepList'>
                {this.props.sleeps.map(sleep => {
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