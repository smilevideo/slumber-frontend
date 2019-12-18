import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const SleepItem = (props) => {
    return <li>
        <div>
            <Link to={`sleeps/${props.sleep.id}`}>
                {`${format(props.sleep.startDate, 'eeee, MMMM do yyyy')}, ${props.sleep.start_time} to 
                ${format(props.sleep.endDate, 'eeee, MMMM do yyyy')}, ${props.sleep.end_time}:`}
            </Link>
        </div>
        <div><strong>Sleep duration: </strong>{props.sleep.duration}</div>
        <br />
        <div className='sleep-note'><strong>Note(s): </strong><br />{props.sleep.note ? props.sleep.note : 'N/A'}</div>
        <br />
        <div><strong>Rating: </strong>{props.sleep.rating ? props.sleep.rating : 'N/A'}</div>
        <br />
        <div><strong>Dream(s) recorded: </strong>{props.sleep.dreams.length > 0 ? 'Yes' : 'No'}</div>
        <br />
        <hr />
        <br />
    </li>
}

export default SleepItem;