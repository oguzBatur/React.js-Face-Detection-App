import React from "react";


class Rank extends React.Component {
    render()
    {
        const modifiedName = this.props.userName[0].toUpperCase() + this.props.userName.slice(1);
        return(

            <div>
                <div className='white f3'>
                    {`${modifiedName}, your current entries is...`}
                </div>
                <div className='white f1'>
                    {this.props.userEntry}
                </div>
            </div>
        )
    }

}

export default Rank;