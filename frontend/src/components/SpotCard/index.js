import React from 'react';
import './SpotCard.css';
// import DeleteSpotForm from '../DeleteSpotForm';
import { ModalBtn } from "../../App";
import { NavLink } from 'react-router-dom';
import Card from '../Card';

// give

function SpotCard({ spot, manage }) {

    // const manageButtons = (
    //     <div>
    //         {/* <smallButton />
    //         <smallButton /> */}
    //     </div>
    // );

//     const components = [<img src={spot.previewImage} alt={spot.name}></img>,
//     <h2>{spot.city + ', ' + spot.state}</h2>,                 <div>
//     <i className="fa-solid fa-star"></i>
//     <p className='avg-rating'>{Boolean(spot.avgRating) ? spot.avgRating : '#.#'}</p>
// </div>, <p>{spot.price + ' night'}</p> ]
// return <Card items={components}></Card>

    return (
        <div className='container card'>

            <NavLink key={spot.id} to={`/spots/${spot.id}`}>


            <div className='card-img container'>
                <img src={spot.previewImage} alt={spot.name}></img>
            </div>

            <div>
                <div>
                    <h2>{spot.city + ', ' + spot.state}</h2>
                </div>

                <div style={{display:'flex'}}>
                    <i className="fa-solid fa-star"></i>
                    <p className='avg-rating'>{Boolean(spot.avgRating) ? spot.avgRating : '#.#'}</p>
                </div>

            </div>

            <div>
               <p>{spot.price + ' night'}</p>
            </div>

            </NavLink>

            {/* {manage && manageButtons} */}
            {/* <ModalBtn type={'delete_spot'}></ModalBtn> */}


        </div>
    );
}

export default SpotCard;
