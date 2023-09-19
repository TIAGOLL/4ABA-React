 "react";

const ActiveLink = ({ href, page, useParams, children, ...rest }) => {

  const isCurrentPath = page === true

  const activeBg = <a {...rest} href={href} className="flex gap-7 font-semibold bg-zinc-300 border-2 border-zinc-500 border-r-0 py-4 pl-6 rounded-l-3xl">{children}</a>

  const inativeBg = <a {...rest} href={href} className="flex gap-7 font-semibold py-4 pl-6 rounded-l-3xl" >{children}</a>

  return isCurrentPath ? activeBg : inativeBg
}

export default ActiveLink;
