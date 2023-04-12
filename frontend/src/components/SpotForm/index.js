import React, { useState,
    // useEffect
 } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import './SpotForm.css';

function SpotForm({action, values}) {

    const [ country, setCountry ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState();
    const [ preview, setPreview ] = useState('');
    // const [ lat, setLat ] = useState(0);
    // const [ lng, setLng ] = useState(0);
    const [ photo1, setPhoto1 ] = useState('');
    const [ photo2, setPhoto2 ] = useState('');
    const [ photo3, setPhoto3 ] = useState('');
    const [ photo4, setPhoto4 ] = useState('');

    const lat = 1;
    const lng = 1;

    const history = useHistory();
    const dispatch = useDispatch();
    // const [ errors, setValidationErrors ] = useState({});

    // useEffect(() => {

    // }, [])


    const onSubmit = async (e) => {

        e.preventDefault();

        const photos = [photo1, photo2, photo2, photo4];
        const spotImages = [];

        spotImages.push({
            url: preview,
            preview: true
        });

        for (let photo of photos) {
            if(photo) {
                spotImages.push({
                    url: photo,
                    preview: false
                });
            }
        }

        // spotActions.createOneSpot
        const spot = await dispatch(action({
            country,
            address,
            city,
            state,
            description,
            price,
            lat,
            lng,
            name
        }, spotImages));

        return spot && history.push(`/spots/${spot.id}`);

    }


    return (
        <div>

        {/* exclude, make CreateSpotPage and UpdateSpotPage outer components - similar thing w/ buttons? */}
            <div>
                {/* <h2>Create a New Spot</h2> */}
            </div>

            <form onSubmit={onSubmit}>
                <div>
                    <h3>Where's your place located?</h3>
                    <p>Guests will only get an exact address once they've booked a reservation</p>
                </div>

                <div>

                    <div>
                        <label htmlFor="country">Country:</label>
                        <input
                            id="country"
                            type="text"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            placeholder={ values ? values.country : "Country"}
                        />
                    </div>

                    <div>
                        <label htmlFor="address">Street Address:</label>
                        <input
                            id="address"
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            placeholder={ values ? values.address : "Address"}
                        />
                    </div>

                    <div>
                        <label htmlFor="city">City:</label>
                        <input
                            id="city"
                            type="text"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            placeholder={ values ? values.city : "City"}
                        />
                    </div>

                    <div>
                        <label htmlFor="state">State:</label>
                        <input
                            id="state"
                            type="text"
                            onChange={(e) => setState(e.target.value)}
                            value={state}
                            placeholder={ values ? values.state : "State"}
                        />
                    </div>

                    {/* <div>
                        <label htmlFor="country">Country:</label>
                        <input
                            id="country"
                            type="text"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            placeholder={ values ? values.country : "Country"}
                        />
                    </div> */}

                    <div>
                        <h3>Describe your place to guests</h3>
                        <p>Mention the best features of your space, any
                            special amentities like fast wifi or parking,
                            and what you love about the neighborhood.</p>
                    </div>

                    <label htmlFor="description">Description:</label>
                    <input
                        id="description"
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder={ values ? values.description : "Description"}
                    />

                    <h3>Create a title for your spot</h3>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>

                    <label htmlFor="name"></label>
                    <input
                        id="name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder={ values ? values.name : "Name of your spot"}
                    />

                    <h3>CSet a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>


                    <label htmlFor="price">Price:</label>
                    <input
                        id="price"
                        type="text"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder={ values ? values.price : "Price per night (USD)"}
                    />


                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot.</p>

                    <label htmlFor="preview"></label>
                    <input
                        id="preview"
                        type="text"
                        onChange={(e) => setPreview(e.target.value)}
                        value={preview}
                        placeholder="Preview Image URL"
                    />
                    <label htmlFor="photo1"></label>
                    <input
                        id="photo1"
                        type="text"
                        onChange={(e) => setPhoto1(e.target.value)}
                        value={photo1}
                        placeholder="Image URL"
                    />

                    <label htmlFor="photo2"></label>
                    <input
                        id="photo2"
                        type="text"
                        onChange={(e) => setPhoto2(e.target.value)}
                        value={photo2}
                        placeholder="Image URL"
                    />

                    <label htmlFor="photo3"></label>
                    <input
                        id="photo3"
                        type="text"
                        onChange={(e) => setPhoto3(e.target.value)}
                        value={photo3}
                        placeholder="Image URL"
                    />

                    <label htmlFor="photo4"></label>
                    <input
                        id="photo4"
                        type="text"
                        onChange={(e) => setPhoto4(e.target.value)}
                        value={photo4}
                        placeholder="Image URL"
                    />

                </div>
                <button>Create Spot</button>

            </form>

        </div>
    )
}

export default SpotForm
