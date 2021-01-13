import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import "./ImageGallery.style.css";

const ImageGallery = ({images, productName}) => {
    return (
        <div className={"ImageGallery"}>
           <AwesomeSlider>
               {
                   images.map(image => <div key={`${productName}-${image.id}`} data-src={image.image_url} />)
               }
           </AwesomeSlider>
        </div>
    )
}

export default ImageGallery;
