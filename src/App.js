import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageform/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import React from "react";
import {ClarifaiStub, grpc} from 'clarifai-nodejs-grpc';

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key {KEY_HERE}");


const particleOptions = {
  particles: {
    number:{
      value: 60,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends React.Component {
  
  constructor(){
    super();
    this.state = {
      input:'',
    }
  }
  onInputChange = (event) => {
    console.log(event.target.value);
  }
  onSubmit = () => {
    console.log('click');
  }

  render(){
    return (
      <div className="App">
        <Particles 
          className='particles' 
          params={particleOptions}
        />
        <Navigation/>
        <Logo/>
        <Rank/>
  
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        {/* <FaceRecognition/> */}
      </div>
    );
  }
  
}

export default App;
