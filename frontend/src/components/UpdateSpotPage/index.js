import React from "react";
import SpotForm from "../SpotForm";
import * as spotActions from '../../store/spots';

export default function UpdateSpotPage () {


    return (
        <SpotForm action={spotActions.updateOneSpot}/>
    );

}
