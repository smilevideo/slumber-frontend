import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class DreamOverview extends React.Component {
    render() {
        const { match } = this.props
        return (<React.Fragment>
            <h2>Dream Overview</h2>
            {this.props.sleeps ?
            <ol className='dreamList'>
                {this.props.sleeps.map(sleep => {
                    return <li key={sleep.id}>
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