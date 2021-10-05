import React from "react";
import './FaceRecognition.css';
const FaceRecognition = ({image, trigger, box, value, calculation}) => {
    if(trigger && calculation)
    {
        return(
            <div className = 'center ma height'>
                <div className= 'absolute mt2'>                
                    <img  id='inputimage' src={image} alt='Output'  className='center detect-image'/>
                    <div className ='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                </div>
            </div>
        )
    }
    else if(trigger && !calculation){
        return(
            <div className = 'center ma height'>
            <div className= 'absolute mt2'>        
                <p>Calculating Image....</p>        
                <img  id='inputimage' src={image} alt='Output'  className='center detect-image'/>
            </div>
        </div>
        )
    }
    else{
        return (<p>Waiting Url...</p>)
    }
    
}


export default FaceRecognition;