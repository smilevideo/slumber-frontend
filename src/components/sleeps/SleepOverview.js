import React from 'react';
import { connect } from 'react-redux';

class SleepOverView extends React.Component {
    render() {
        return (<React.Fragment>
            <h2>Sleep Overview</h2>
            <ol>
                {this.props.sleeps.map(sleep => {
                    return <li>{`Start Day: ${sleep.start_day}. Rating: ${sleep.rating}`}</li>
                })}
            </ol>
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