import React from 'react';
import { connect } from 'react-redux';

class SleepView extends React.Component {
    render() {
        const { match } = this.props;
        const id = parseInt(match.params.sleepId, 10);
        if (this.props.sleeps) {
            const sleep = this.props.sleeps.find(sleep => {
                return sleep.id === id;
            })
            console.log(sleep);
        }           

        return (<React.Fragment>
            <h2>Sleep id</h2>
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