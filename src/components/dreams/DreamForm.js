import React from 'react';
import { connect } from 'react-redux';
import { createDream } from '../../actions/userActions';

class DreamForm extends React.Component {
    constructor() {
        super()

        this.state = {
            description: '',
            mood: '0'
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

    handleCancel = () => {
        this.props.cancelAddDream();
    }

    render() {
        return (<div className='dream-form'>
            <h3 className='dream-form-header'>New Dream Entry</h3>

            <hr />

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

                
                <table className='mood-input-table'>
                    <tbody>
                        <tr>
                            <td colSpan='7'>Downer {'<--->'} Upper</td>
                        </tr>
                        <tr>
                            {/* creates an array of 0 to 7, then produces an array of -3 to 3, then returns the desired JSX for each number */}
                            {[...Array(7).keys()].map(num => num - 3).map(num => {
                                return (<td key={num}>{num}</td>)
                            })}
                        </tr>
                        <tr>
                            {[...Array(7).keys()].map(num => num - 3).map(num => {
                                return (<td key={num}>
                                    <input
                                        type='radio'
                                        name='mood'
                                        value={num}
                                        checked={this.state.mood === `${num}`}
                                        onChange={this.handleChange}
                                        className='form-input-radio'
                                    />
                                </td>)
                            })}
                        </tr>
                    </tbody>
                </table>
                <br />

                <div className='dream-form-buttons'>
                    <input type='submit' value='Submit Dream'/> 
                    <button type='button' onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
        </div>)
    }
};

const mapStateToProps = (state) => {
    return {
        creatingDream: state.dreamReducer.creatingDream,
        createDreamError: state.dreamReducer.createDreamError
    }
}

const mapDispatchToProps = dispatch => ({
    createDream: dreamParams => dispatch(createDream(dreamParams)),
    cancelAddDream: () => dispatch({ type: 'CANCEL_ADD_DREAM' })
});

export default connect(mapStateToProps, mapDispatchToProps)(DreamForm);