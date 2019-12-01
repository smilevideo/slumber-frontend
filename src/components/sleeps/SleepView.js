import React from 'react';
import { connect } from 'react-redux';
import uuid from 'react-uuid';

class SleepView extends React.Component {
    render() {
        return (<React.Fragment>
            <h2>Sleep Overview</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(SleepView);