import React from 'react';
import { dotCase } from '../node_modules/dot-case';

const Player =(props)=>{
    return(
<div className="player" style={{left:props.player.x, top:props.player.y}}></div>     
       

       
    )
}


export default Player;