import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SpotCard.css';


function SpotCard({ spot }) {
    return (
        <div>
            <img></img>

            <div>
                <h2></h2>
                <p></p>
            </div>

            <div>
                <p></p>
            </div>

        </div>
    );
}

export default SpotCard;
