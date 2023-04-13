import React from 'react';
import './SpotCard.css';
// import DeleteSpotForm from '../DeleteSpotForm';
import { ModalBtn } from "../../App";
import { NavLink } from 'react-router-dom';
// import Card from '../Card';
import { useHistory } from 'react-router-dom';

// give

function SpotCard({ item, manage }) {
    const history = useHistory();

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

            <NavLink key={item.id} to={`/spots/${item.id}`}>


            <div className='card-img container'>
                <img src={item.previewImage} alt={item.name}></img>
            </div>

            <div>
                <div>
                    <h2>{item.city + ', ' + item.state}</h2>
                </div>

                <div style={{display:'flex'}}>
                    <i className="fa-solid fa-star"></i>
                    <p className='avg-rating'>{Boolean(item.avgRating) ? item.avgRating : '#.#'}</p>
                </div>

            </div>

            <div>
               <p>{item.price + ' night'}</p>
            </div>

            </NavLink>

            {/* {manage && manageButtons} */}
            {manage && <div style={{display:'flex'}}>
                <ModalBtn spot={item} type={'delete_spot'}>
                    </ModalBtn>
                    {/* <ModalBtn type={'update_spot'}>
                        </ModalBtn> */}
                        <button onClick={(e) => {
                            e.preventDefault();
                            history.push(`/spots/${item.id}/edit`)
                        }}>Update</button>
                        </div>
            }


        </div>
    );
}

export default SpotCard;
