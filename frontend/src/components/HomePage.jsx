import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../store/spots';
import SpotCard from './SpotCard';
import CardList from './CardList';

function HomePage() {

    const dispatch = useDispatch();
    const spots = Object.values(useSelector((state) => state.spots.allSpots));

    useEffect(() => {
        dispatch(spotActions.loadAllSpots())
    }, [ dispatch ]);

    return (
        <CardList items={spots} CardRef={SpotCard} />
    );
}


export default HomePage;
