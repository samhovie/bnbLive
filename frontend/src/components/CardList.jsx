import React from "react";
import { NavLink } from "react-router-dom";

export default function CardList({ type, items, CardRef }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "40px",
            }}
        >
            {type === "update" && (
                <h1 style={{ fontSize: "32px", paddingTop: '20px' }}>Manage Spots</h1>
            )}

            {items.length === 0 && (
                <div className="" style={{ padding: "0 35px", fontSize: '22px', color: 'var(--yinmn-blue)' }}>
                    <NavLink to={`/spots/new`}>Create a new Spot</NavLink>
                </div>
            )}

            <div className={"flex flex-wrap justify-start list " + type}>
                {items.map((item) => (
                    <CardRef
                        manage={type === "update"}
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
}
