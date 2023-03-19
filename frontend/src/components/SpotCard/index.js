import React from 'react';
import './SpotCard.css';


function SpotCard({ spot, manage }) {

    const manageButtons = (
        <div>
            {/* <smallButton />
            <smallButton /> */}
        </div>
    );

    return (
        <div className='container card'>

            <div>
                <img src={spot.previewImage} alt={spot.name}></img>
            </div>

            <div>
                <div>
                    <h2>{spot.city + ', ' + spot.state}</h2>
                </div>

                <div>
                    <i class="fa-solid fa-star"></i>
                    <p>{Boolean(spot.avgRating) ? spot.avgRating : '#.#'}</p>
                </div>

            </div>

            <div>
               <p>{spot.price + ' night'}</p>
            </div>

            {manage && manageButtons}

        </div>
    );
}

export default SpotCard;
