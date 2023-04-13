import React from "react";

export default function Card ({ items, CardRef }) {

    // const component = ()


    return (
        // {component}
        <div className="tile-list">
        {items.map(item =>
            <CardRef  key={item.id} item={item}></CardRef>
        )}
    </div>
    );

}
