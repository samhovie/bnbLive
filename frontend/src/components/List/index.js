import React from "react";

export default function List ({ items }) {

    const component = (<ul>
        {items.map(item =>
            <li>
                {item}
            </li>
        )}
    </ul>);


    return (
        {component}
    );

}
