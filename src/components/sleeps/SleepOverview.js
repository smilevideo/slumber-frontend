import React from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';

class SleepOverView extends React.Component {
    render() {
        return (<React.Fragment>
            <h2>Sleep Overview</h2>
            {this.props.sleeps ?
            <ol>
                {this.props.sleeps.map(sleep => {
                    return <li key={uuid()}>
                        <div>{`${sleep.start_day}, ${sleep.start_time}-${sleep.end_day}, ${sleep.end_time}`}</div>
                        <div>Total duration: {/*todo stuff*/}</div>
                        <div>{`Rating: ${sleep.rating}`}</div>
                        <br />
                        <div>{`Note: ${sleep.note}`}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SleepOverView);