import React from "react";


const Rank = ({userEntries}) => {
    
    return(

        <div>
            <div className='white f3'>
                {'Batur, your current entries is...'}
            </div>
            <div className='white f1'>
                {userEntries}
            </div>
        </div>

    )
}

export default Rank;