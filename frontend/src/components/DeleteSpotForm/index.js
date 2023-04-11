import React from "react";
import * as spotActions from '../../store/spots';
import { useDispatch } from "react-redux";
// import { useEffect } from "react";

function DeleteSpotForm({spot}) {

    const dispatch = useDispatch();

    return (
        <div>

            <div>
                <h3>Confirm Delete</h3>
            </div>

            <div>
                <p>Are you sure you want to remove this spot from the listings?</p>
            </div>

            <div>
            <button
                type="submit"
                id="yesDelSpotBtn"
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(spotActions.deleteOneSpot(spot))
                    dispatch(spotActions.loadCurrentSpots())
                }}
                // disabled={true}
                > Yes &#40;Delete Spot&#41;
                </button>
            </div>
            <div>
                <button
                type="submit"
                id="noDelSpotBtn"
                // disabled={true}
                > No &#40;Keep Spot&#41;
                </button>
            </div>



        </div>
    )
}
export default DeleteSpotForm;
