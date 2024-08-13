import React from 'react'

const CustomButtons = ({ className, text, handleClick }) => {

    return (
        <button onClick={() => handleClick} className={`${className}`}>{text}</button>
    )
}

export default CustomButtons