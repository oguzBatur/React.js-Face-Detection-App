import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageform/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import React from "react";
import Clarifai from 'clarifai';
import FaceRecognition from './components/face-recog/FaceRecognition';
import {userID, appID, apiKey, ModelID, ModelVersionID} from './config';



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
      imageUrl: '',
      isOn: false
    }
  }
  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    })
    if(event.target.value == ' ') this.state.isOn = false;
  }
  onSubmit = (event) => {
    console.log('click');
    this.setState({
      imageUrl: this.state.input
    });
    const raw = JSON.stringify({
      "user_app_id": {
            "user_id": userID,
            "app_id": appID
        },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.imageUrl
            }
          }
        }
      ],
    });
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Key ${apiKey}`
      },
      body: raw
    };
    
  
    fetch(`https://api.clarifai.com/v2/models/${ModelID}/versions/${ModelVersionID}/outputs`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(JSON.parse(result, null, 2).outputs[0].data.concepts[0])
        console.log(JSON.parse(result, null, 2).outputs[0].data)

        this.setState({
          isOn: true
        })
      })
      .catch(error => console.log('error', error));

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
       
        <FaceRecognition image={this.state.imageUrl} trigger={this.state.isOn}/>
      </div>
    );
  }
  
}

export default App;
