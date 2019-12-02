import React from 'react';
import { connect } from 'react-redux';
import DreamForm from '../dreams/DreamForm';

class SleepView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addingDream: false
        }
    }

    handleClick = event => {
        this.setState({
            addingDream: true
        })
    }

    render() {
        const id = parseInt(this.props.match.params.sleepId, 10);
        if (this.props.sleeps) {
            this.sleep = this.props.sleeps.find(sleep => {
                return sleep.id === id;
            })
        }

        return (<React.Fragment>
            {typeof(this.sleep) !== 'undefined' ? 
                <>
                <h2>Sleep from {`${this.sleep.start_day}, ${this.sleep.start_time}`} to {`${this.sleep.end_day}, ${this.sleep.end_time}`}</h2> 
                <p><strong>Note: </strong>{this.sleep.note}</p>
                <p><strong>Rating: </strong>{this.sleep.rating}</p>
                
                <h3>Dreams: </h3>
                {this.state.addingDream ? <DreamForm sleepId={this.sleep.id} /> : <button onClick={this.handleClick}>Add Dream</button>}                
                <ol>
                    {this.sleep.dreams.map(dream => {
                        return (<li key={dream.id}>
                            <p>{dream.description}</p>
                            {dream.mood ? <p>Mood: {dream.mood}</p> : null}
                        </li>)
                    })}
                </ol>
                
                
                </>
            : null} 
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