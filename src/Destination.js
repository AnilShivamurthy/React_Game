import React from 'react';

const Destination=({ destination = [1,1]})=>{
    return(
     <div className="destination" style={{left:destination[0], top: destination[1]}}></div>
  );  
}


export default Destination;