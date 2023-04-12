import React from "react";
import SpotForm from "../SpotForm";
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


export default function UpdateSpotPage () {
    const { spotId } = useParams();
    const values = useSelector(store => store.spots.allSpots)
    console.log(values[spotId])

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions.loadAllSpots())
    }, [dispatch])



    return (
        <SpotForm values={values[spotId]} action={spotActions.updateOneSpot}/>
    );

}
