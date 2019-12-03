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
                    return <div key={sleep.id}>
                        {sleep.dreams.map(dream => {
                            return (<li key={dream.id}>
                                {dream.description}
                            </li>)
                        })}
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DreamOverview);