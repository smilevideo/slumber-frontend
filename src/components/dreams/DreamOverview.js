import React from 'react';
import { connect } from 'react-redux';
import DreamItem from './DreamItem';

class DreamOverview extends React.Component {
    render() {
        return (<div className='main'>
            <h2 className='header'>Dream Overview</h2>
            {this.props.sleeps ?
            <ol className='dream-list'>
                {this.props.sleeps.map(sleep => {
                    return <div key={sleep.id}>
                        {sleep.dreams.map(dream => <DreamItem dream={dream} sleep={sleep} key={dream.id} />)}
                    </div>
                })}
            </ol> :
            null
            }
        </div>)
    }
};

const mapStateToProps = (state) => {
    return {
        sleeps: state.userReducer.currentUser.sleeps
    }
}

const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(DreamOverview);