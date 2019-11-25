import React from 'react';
import { connect } from 'react-redux';

class SleepOverView extends React.Component {
    render() {
        return (<React.Fragment>
            <h2>Sleep Overview</h2>
            {this.props.sleeps ?
            <ol>
                {this.props.sleeps.map(sleep => {
                    return <li>
                        <p>{`${sleep.start_day}, ${sleep.start_time}-${sleep.end_day}, ${sleep.end_time}`}</p>
                        <p>Total duration: {/*todo stuff*/}</p>
                        <p>{`Note: ${sleep.note}`}</p>
                        <p>{`Rating: ${sleep.rating}`}</p>
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