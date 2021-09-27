import React from "react";

const FaceRecognition = ({image, trigger}) => {

    
    if(trigger)
    {
        return(
            <div>
                <img src={image} alt='Output' className='center detect-image'/>
            </div>
        )
    }
    else{
        return (<p>Waiting Url...</p>)
    }
    
}


export default FaceRecognition;