import React from "react";

function DeleteSpotForm() {
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
                id="yesDelRevBtn"
                disabled={true}
                > Yes &#40;Delete Spot&#41;
                </button>
            </div>
            <div>
                <button
                type="submit"
                id="noDelRevBtn"
                disabled={true}
                > No &#40;Keep Spot&#41;
                </button>
            </div>



        </div>
    )
}
export default DeleteSpotForm;
