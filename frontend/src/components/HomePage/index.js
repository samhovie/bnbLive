import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots';
import SpotCard from '../SpotCard';
import Card from '../Card';

function HomePage() {

    const dispatch = useDispatch();
    const spots = Object.values(useSelector((state) => state.spots.allSpots));

    useEffect(() => {
        dispatch(spotActions.loadAllSpots())
    }, [ dispatch ]);

    return (
        <Card items={spots} CardRef={SpotCard}></Card>
    );
}


export default HomePage;
