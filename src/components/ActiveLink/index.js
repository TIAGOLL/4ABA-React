import React from "react";
import { useParams } from "react-router-dom";

const ActiveLink = ({ href, children, ...rest }) => {

    href = href + '/'

    const { id } = useParams();
    const isCurrentPath = id === href;

    const activeBg = <a {...rest} href={href} className="flex gap-7 font-semibold bg-background-color py-4 pl-6 rounded-l-3xl shadow-black">{children}</a>

    const inativeBg = <a {...rest} href={href} className="flex gap-7 font-semibold py-4 pl-6 rounded-l-3xl" >{children}</a>
    
    return isCurrentPath ? activeBg : inativeBg
}

export default ActiveLink;
