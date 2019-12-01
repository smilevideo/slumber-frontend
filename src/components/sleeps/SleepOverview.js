import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SleepOverview extends React.Component {
    render() {
        const { match } = this.props
        return (<React.Fragment>
            <h2>Sleep Overview</h2>
            {this.props.sleeps ?
            <ol className='sleepList'>
                {this.props.sleeps.map(sleep => {
                    return <li key={sleep.id}>
                        <div><Link to={`${match.url}/${sleep.id}`}>{`${sleep.start_day}, ${sleep.start_time} to ${sleep.end_day}, ${sleep.end_time}`}</Link></div>
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