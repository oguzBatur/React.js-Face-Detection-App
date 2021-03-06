import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageform/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import React from "react";
import FaceRecognition from './components/face-recog/FaceRecognition';
import {userID, appID, apiKey, ModelID, ModelVersionID} from './config';
import Signin  from './components/signin/Signin';
import Register from './components/register/Register';

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
      isOn: false,
      box: {},
      value: 0.0,
      isCalculating: false,
      route: 'signin',
      isSigned: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  //! FETCH USER FROM REGISTER / SIGNIN

  retrieveUserData = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  //! FACE CALCULATION
  calculateFaceLocation = (info) => {
    const clariFace = info.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const height = Number(image.height);
    const width = Number(image.width);
    console.log(image);
    console.log(image.height);
    console.log(info);
    return {
      leftCol: clariFace.left_col * width,
      topRow:    1.15 * (clariFace.top_row * height),
      rightCol: width - (clariFace.right_col * width),
      bottomRow: height * 1.1 - (clariFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    })
    if(event.target.value === ' ') this.setState({isOn: false})
  }

  onSubmitImage = () => {
    fetch('http://localhost:3000/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
        .then(resp => resp.json())
        .then(data => {
          this.state.user.entries = data;
        });
  }

  onSubmit = () => {
    console.log('click');
    this.setState({
      imageUrl: this.state.input,
      isOn: true,
      isCalculating: false
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
              "url": this.state.input
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
      .then(response => {
       
        return response.text()
      })
      .then(result => {
        // let box = JSON.parse(result, null, 2).outputs[0].data.regions[0].region_info.bounding_box;
        // let value = JSON.parse(result, null, 2).outputs[0].data.regions[0].value;

        this.displayFaceBox(this.calculateFaceLocation(JSON.parse(result, null, 2)));
        this.setState({
          isCalculating: true,
        })
      })
      .catch(error => console.log('error', error));

  }

  onRouteChange = (route) => {
    if(route === 'signin') this.setState({isSigned: false})  
    else if (route === 'home') this.setState({isSigned: true})
    this.setState({
        route: route
      })
  }

  haneup

  render(){
    return (
      <div className="App">
        <Particles 
          className='particles' 
          params={particleOptions}
        />
        <Navigation onRouteChange = {this.onRouteChange} isSigned={this.state.isSigned} />
        { this.state.route === 'home'

        ?

        <div>
           <Logo/>
            <Rank userEntry={this.state.user.entries} userName={this.state.user.name} />
            <ImageLinkForm  onInputChange={this.onInputChange} onSubmitImage={this.onSubmitImage} onSubmit={this.onSubmit}/>
            <FaceRecognition calculation={this.state.isCalculating} box={this.state.box} value={this.state.value} image={this.state.imageUrl} trigger={this.state.isOn}/>
          </div>
        :
        (this.state.route === 'signin'
          ? 
          <Signin  userData={this.retrieveUserData} onRouteChange={this.onRouteChange}/>
          :
          <Register  userData={this.retrieveUserData} onRouteChange={this.onRouteChange} />
        )
          
        }
        
      </div>
    );
  }
  
}

export default App;
