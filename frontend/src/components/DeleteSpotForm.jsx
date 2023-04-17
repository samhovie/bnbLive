import React from "react";
import * as spotActions from '../store/spots';
import { useDispatch } from "react-redux";
// import { useEffect } from "react";
import { useAModal } from "../App";

// close modal after delete
// lose rest of card after delete
// get spots/none?

function DeleteSpotForm({spot}) {

    const {handleModal} = useAModal();
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
                onClick={ async (e) => {
                    e.preventDefault();
                    await dispatch(spotActions.deleteOneSpot(spot))
                    await dispatch(spotActions.loadCurrentSpots())

                    // handle modal
                    handleModal();
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
                onClick={(e) => {
                    e.preventDefault();
                    handleModal();
                }}
                > No &#40;Keep Spot&#41;
                </button>
            </div>



        </div>
    )
}
export default DeleteSpotForm;
