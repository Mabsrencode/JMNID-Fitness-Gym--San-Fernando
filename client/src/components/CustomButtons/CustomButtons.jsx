import React from 'react'
import { Link } from 'react-router-dom'

const CustomButtons = ({ className, text, handleClick }) => {

    return (
        <button onClick={() => handleClick} className={`${className}`}>{text}</button>
    )
}
const CustomLink = ({ className, text, url, Icon }) => {

    return (
        <Link to={url} className={`${className}`}>{text} {Icon} </Link>
    )
}

export { CustomButtons, CustomLink }