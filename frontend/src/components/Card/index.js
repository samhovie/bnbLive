import React from "react";

export default function Card ({ items }) {

    const component = (<div>
        {items.map(item =>
            <div>
                {item}
            </div>
        )}
    </div>)


    return (
        {component}
    );

}
