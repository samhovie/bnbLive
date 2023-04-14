import React from 'react';
import { ModalBtn } from "../App";
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function SpotCard({ item, manage }) {
    const history = useHistory();

    return (
        <div className='container card'>

            <NavLink key={item.id} to={`/spots/${item.id}`}>


            <div className='home-img container'>
                <img className='home-img' src={item.previewImage} alt={item.name}></img>
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
