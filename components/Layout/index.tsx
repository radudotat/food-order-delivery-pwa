import React from "react";
import Header from "./Header";

export default function Layout(props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) {
    return (
        <div>
            <Header/>
            {props.children}
        </div>
    );
};

