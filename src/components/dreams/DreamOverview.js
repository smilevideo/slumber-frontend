import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

class DreamOverview extends React.Component {
    render() {
        return (<div className='main'>
            <h2>Dream Overview</h2>
            {this.props.sleeps ?
            <ol className='dreamList'>
                {this.props.sleeps.map(sleep => {
                    return <div key={sleep.id}>
                        {sleep.dreams.map(dream => {
                            return (<li key={dream.id}>
                                <Link to={`sleeps/${sleep.id}`}>
                                {format(sleep.startDate, 'eeee, MMMM do yyyy')}
                                </Link>
                                <br />
                                <p className='dream-description'>{dream.description}</p>
                                <p>{`Mood: ${dream.mood}`}</p>
                            </li>)
                        })}
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