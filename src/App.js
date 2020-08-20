import React, {Component} from 'react';
import './App.css';
import Player from './Player';
import Destination from './Destination';


const getRandomCordinates=()=>{
 let min=1;
 let max=398;
 let x= Math.floor((Math.random()*(max-min+1)+min)/2)*2;
 let y=Math.floor((Math.random()*(max-min+1)+min)/2)*2;
 return [x,y]
}
const INTIAL_COORDIANTES = {
  x: 0,
  y:0
}
const initialState ={
  destination :getRandomCordinates(),
  player:INTIAL_COORDIANTES,
  direction:'RIGHT',
  count:0,
  left:0,
  top: 0,
  height: 500,
  width:500,
}



class App extends Component{

  state=initialState;

  componentDidMount(){
    setInterval(this.movePlayer, 50);
    document.onkeydown = this.onKeyDown;
    const element = document.getElementById("area");
    if(element){
      const { width, height} = element.getBoundingClientRect();
      this.setState({
        width,
        height
      })
    }
    window.onload =()=>{
      const storedCoordinates = JSON.parse(sessionStorage.getItem('play')) || INTIAL_COORDIANTES;
      const storedDestination = JSON.parse(sessionStorage.getItem('dest')) ? JSON.parse(sessionStorage.getItem('dest')) : getRandomCordinates()
      const storedCount =JSON.parse(sessionStorage.getItem('count')) || 0 ;
      this.setState({
        player: storedCoordinates,
        destination : storedDestination,   
        count : storedCount   
      })
      }     
  }

 
  componentDidUpdate(){;
    this.checkIfReached();
  }


  onKeyDown=(e)=>{
    e=e || window.event;

    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction:"DOWN"});
        break;
      case 37:
        this.setState({direction:"LEFT"});  
        break;
      case 39:
        this.setState({direction:"RIGHT"});     
        break;
     
    }
    
  }


  movePlayer=()=>{
    let {width, height} = this.state;
    let {x,y} =this.state.player
    let destination={...this.state.destination}
    sessionStorage.setItem('play', JSON.stringify({x,y}));
    sessionStorage.setItem('dest', JSON.stringify(destination)); 
    let move ={x, y} 
    switch(this.state.direction){
      case "RIGHT":
        if(x < width-50) {
          move ={x:x+1, y};
        }
        else{
          move ={x, y: y};
        }
        break;
      case "LEFT":
       if(x > 0){
        move ={x: x-1, y};
       }
       else{
        move ={x, y};
       }
        break;
      case "DOWN":
      if(y<height-50){
        move ={x, y: y+1};
      }
      else{
        move ={x, y};
      }
       break;
      case "UP":
      if(y > 0 ){
        move ={x, y: y-1};
       }
       else{
        move ={x,  y};
       }
       break;
    }
      this.setState({
        player: move
      })
  }


  checkIfReached(){
    if(this.state.player.x == this.state.destination[0] && this.state.player.y ==this.state.destination[1] ){
      this.setState({
        destination: getRandomCordinates(),
        count: this.state.count +1,
        
      })
     alert("You Reached Goal, If you want to continue the game click OK.");
     sessionStorage.setItem('count', this.state.count+1);
    }
  }

  render(){
    return (
      <div className="react-game"  style={{textAlign: "center"}}>
        <h1>Player Points = {this.state.count}</h1>
        <div id="area" className="game-area">
          <Player player={this.state.player}/>
          <Destination destination={this.state.destination}/>
        </div>
      </div>
    );
  }
}
export default App;
