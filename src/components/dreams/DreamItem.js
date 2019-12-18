import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const DreamItem = (props) => {
    return (<li>
        <p>
            {'Day of associated sleep session: '}
            <Link to={`sleeps/${props.sleep.id}`}>
            {format(props.sleep.startDate, 'eeee, MMMM do yyyy')}
            </Link>
        </p>
        <p className='dream-description'>
            <strong>Description:</strong><br />
            {props.dream.description}
        </p>
        <p>
            <strong>Mood: </strong>
            {props.dream.mood}
        </p>
        <hr />
    </li>)
}

export default DreamItem;