import React from 'react'

const ServicesCard = ({ img, title, paragraph, containerClassName, imageClassName, titleClassName, detailContainerClassName, paragraphClassName }) => {
    return (
        <div className={`${containerClassName} `}>
            <img className={`${imageClassName} rounded-xl w-full object-cover`} src={img} alt={title} />
            <div className={detailContainerClassName}>
                <h3 className={titleClassName}>{title}</h3>
                <p className={paragraphClassName}>{paragraph}</p>
            </div>
        </div>
    )
}

export default ServicesCard