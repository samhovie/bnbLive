import React from 'react';
// import * as sessionActions from '../../store/session';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import './SpotCard.css';


function SpotCard({ spot }) {
    return (
        <div className='container card'>
            <img src={spot.previewImage} alt={spot.name}></img>

            <div>
                <h2>{spot.name}</h2>
                <p></p>
            </div>

            <div>
                <p></p>
            </div>

        </div>
    );
}

export default SpotCard;
