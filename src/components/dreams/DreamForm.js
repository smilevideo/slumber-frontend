import React from 'react';
import { connect } from 'react-redux';
import { createDream } from '../../actions/userActions';

class DreamForm extends React.Component {
    constructor() {
        super()

        this.state = {
            description: '',
            mood: ''
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.createDream({
            ...this.state,
            sleep_id: this.props.sleepId
        });
    }

    render() {
        return (<React.Fragment>
            <h3>New Dream Entry</h3>

            {this.props.creatingDream ? <p>Adding Dream..</p> : null}
            {this.props.createDreamError ? <p>Error, try again.</p> : null}

            <form onSubmit={this.handleSubmit}>
                <label><strong>Description:</strong></label><br />
                <textarea
                    required
                    name='description'
                    cols='50'
                    rows='8'
                    value={this.state.description}
                    onChange={this.handleChange}
                /><br /><br />

                <label><strong>Mood:</strong></label><br />
                <input
                    required
                    type='number'
                    min='-5'
                    max='5'
                    name='mood'
                    placeholder='-5 to 5'
                    value={this.state.mood}
                    onChange={this.handleChange}
                /><br /><br />

                <input type='submit' value='Submit Dream'/> 
            </form>
        </React.Fragment>)
    }
};

const mapStateToProps = (state) => {
    return {
        creatingDream: state.dreamReducer.creatingDream,
        createDreamError: state.dreamReducer.createDreamError
    }
}

const mapDispatchToProps = dispatch => ({
    createDream: dreamParams => dispatch(createDream(dreamParams))
});

export default connect(mapStateToProps, mapDispatchToProps)(DreamForm);