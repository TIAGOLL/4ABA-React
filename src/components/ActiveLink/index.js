import React from "react";

const ActiveLink = ({ href, useParams, children, ...rest }) => {

    href = href + '/'
    
    const isCurrentPath = useParams === href;
    
    const activeBg = <a {...rest} href={href} className="flex gap-7 font-semibold bg-background-color py-4 pl-6 rounded-l-3xl shadow-black">{children}</a>

    const inativeBg = <a {...rest} href={href} className="flex gap-7 font-semibold py-4 pl-6 rounded-l-3xl" >{children}</a>
    
    return isCurrentPath ? activeBg : inativeBg
}

export default ActiveLink;
