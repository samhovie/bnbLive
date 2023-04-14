import React from "react";

export default function CardList ({ type, items, CardRef }) {

    return (

        <div className={"flex flex-wrap justify-start list " + type} >
        {items.map(item =>
            <CardRef  key={item.id} item={item}/>
        )}
    </div>
    );

}
