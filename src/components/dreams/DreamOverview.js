import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

class DreamOverview extends React.Component {
    render() {
        return (<div className='main'>
            <h2 className='header'>Dream Overview</h2>
            {this.props.sleeps ?
            <ol className='dream-list'>
                {this.props.sleeps.map(sleep => {
                    return <div key={sleep.id}>
                        {sleep.dreams.map(dream => {
                            return (<li key={dream.id}>
                                <p>
                                    {'Day of associated sleep session: '}
                                    <Link to={`sleeps/${sleep.id}`}>
                                    {format(sleep.startDate, 'eeee, MMMM do yyyy')}
                                    </Link>
                                </p>
                                <p className='dream-description'>
                                    <strong>Description:</strong><br />
                                    {dream.description}
                                </p>
                                <p>
                                    <strong>Mood: </strong>
                                    {dream.mood}
                                </p>
                                <hr />
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