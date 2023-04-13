import React from "react";

export default function CardList ({ items, CardRef }) {

    return (

        <div className="tile-list">
        {items.map(item =>
            <CardRef  key={item.id} item={item}/>
        )}
    </div>
    );

}
