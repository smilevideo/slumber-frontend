import React from 'react';
import { connect } from 'react-redux';
import DreamForm from '../dreams/DreamForm';
import { format } from 'date-fns';

class SleepView extends React.Component {
    handleClick = event => {
        this.props.addDream();
    }

    render() {
        const id = parseInt(this.props.match.params.sleepId, 10);
        if (this.props.sleeps) {
            this.sleep = this.props.sleeps.find(sleep => {
                return sleep.id === id;
            })
        }

        return (<div className='main'>
            {typeof(this.sleep) !== 'undefined' ? 
                <>
                <h2 className='header'>Sleep from {`${format(this.sleep.startDate, 'eeee, MMMM do yyyy')}, ${this.sleep.start_time} to 
                            ${format(this.sleep.endDate, 'eeee, MMMM do yyyy')}, ${this.sleep.end_time}:`}</h2>                             
                <p><strong>Total duration: </strong>{this.sleep.duration}</p>
                <p>{`Rating: ${this.sleep.rating ? this.sleep.rating : 'N/A'}`}</p>
                <p><span>Note: </span>{this.sleep.note ? this.sleep.note : 'N/A'}</p>

                <h3>Dreams: </h3>
                {this.props.addingDream ? <DreamForm sleepId={this.sleep.id} /> : <button onClick={this.handleClick}>Add Dream</button>}
                <ol>
                    {this.sleep.dreams.map(dream => {
                        return (<li key={dream.id}>
                            <p className='dream-description'>{dream.description}</p>
                            {typeof(dream.mood) === 'number' ? <p>Mood: {dream.mood}</p> : null}
                        </li>)
                    })}
                </ol>
                </>
            : null} 
        </div>)
        
    }
};

const mapStateToProps = (state) => {
    return {
        sleeps: state.userReducer.currentUser.sleeps,
        addingDream: state.dreamReducer.addingDream
    }
}

const mapDispatchToProps = dispatch => ({
    addDream: () => dispatch({type: 'ADDING_DREAM' })
});

export default connect(mapStateToProps, mapDispatchToProps)(SleepView);