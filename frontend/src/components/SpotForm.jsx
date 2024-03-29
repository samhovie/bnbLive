import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function SpotForm({ type, action, values }) {
    const [country, setCountry] = useState(values ? values.country : "");
    const [address, setAddress] = useState(values ? values.address : "");
    const [city, setCity] = useState(values ? values.city : "");
    const [state, setState] = useState(values ? values.state : "");
    const [description, setDescription] = useState(
        values ? values.description : ""
    );
    const [name, setName] = useState(values ? values.name : "");
    const [price, setPrice] = useState(values ? values.price : "");
    const [preview, setPreview] = useState("");
    // const [ lat, setLat ] = useState(0);
    // const [ lng, setLng ] = useState(0);
    const [photo1, setPhoto1] = useState("");
    const [photo2, setPhoto2] = useState("");
    const [photo3, setPhoto3] = useState("");
    const [photo4, setPhoto4] = useState("");

    const lat = 1;
    const lng = 1;

    const history = useHistory();
    const dispatch = useDispatch();

    const { spotId } = useParams();

    const onSubmit = async (e) => {
        e.preventDefault();

        const photos = [photo1, photo2, photo2, photo4];
        const spotImages = [
            {
                url: preview,
                preview: true,
            },
        ];

        for (let photo of photos) {
            if (photo) {
                spotImages.push({
                    url: photo,
                    preview: false,
                });
            }
        }

        const spot = await dispatch(
            action({
                spot: {
                    country,
                    address,
                    city,
                    state,
                    description,
                    price,
                    lat,
                    lng,
                    name,
                },
                images: spotImages,
                spotId,
            })
        );

        return spot && history.push(`/spots/${spot.payload.id}`);
    };

    return (
        <div className={"page " + type}>
            <form onSubmit={onSubmit}>
                <div>
                    <div>
                        <h2>
                            {type === "create"
                                ? "Create a New Spot"
                                : "Update your Spot"}
                        </h2>
                    </div>

                    <div>
                        <h3>Where's your place located?</h3>
                        <p>
                            Guests will only get an exact address once they've
                            booked a reservation
                        </p>
                    </div>

                    <div className="flex-col">
                        <label htmlFor="country">Country:</label>
                        <input
                            id="country"
                            type="text"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            placeholder={values ? values.country : "Country"}
                        />
                    </div>

                    <div className="flex-col">
                        <label htmlFor="address">Street Address:</label>
                        <input
                            id="address"
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            placeholder={values ? values.address : "Address"}
                        />
                    </div>
                    <div className="flex">
                        <div style={{flexGrow:'3'}}className="flex-col ">
                            <label htmlFor="city">City:</label>
                            <input
                                id="city"
                                type="text"
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                                placeholder={values ? values.city : "City"}
                            />
                        </div>

                        <div className="flex-col">
                            <label htmlFor="state">State:</label>
                            <input
                                id="state"
                                type="text"
                                onChange={(e) => setState(e.target.value)}
                                value={state}
                                placeholder={values ? values.state : "State"}
                            />
                        </div>
                    </div>

                    <div>
                        <h3>Describe your place to guests</h3>
                        <p>
                            Mention the best features of your space, any special
                            amentities like fast wifi or parking, and what you
                            love about the neighborhood.
                        </p>
                    </div>

<div className="flex-col">
                    <label htmlFor="description">Description:</label>
                    <input
                        id="description"
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder={
                            values ? values.description : "Please write at least 30 characters"
                        }
                    />
                    </div>

                    <h3>Create a title for your spot</h3>
                    <p>
                        Catch guests' attention with a spot title that
                        highlights what makes your place special.
                    </p>

<div className="flex-col">
                    <label htmlFor="name"></label>
                    <input
                        id="name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder={values ? values.name : "Name of your spot"}
                    />
                    </div>

                    <h3>Set a base price for your spot</h3>
                    <p>
                        Competitive pricing can help your listing stand out and
                        rank higher in search results.
                    </p>

<div className="flex">
                    <label htmlFor="price">$</label>
                    <input
                        id="price"
                        type="text"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder={
                            values ? values.price : "Price per night (USD)"
                        }
                    />
                    </div>


                    {type === "create" && (
                        <div className="flex-col">
                            <h3>Liven up your spot with photos</h3>
                            <p>
                                Submit a link to at least one photo to publish
                                your spot.
                            </p>

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
                    )}
                </div>
                <button>
                    {type === "create" ? "Create Spot" : "Update Spot"}
                </button>
            </form>
        </div>
    );
}

export default SpotForm;
