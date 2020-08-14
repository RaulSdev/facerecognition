import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';



const app = new Clarifai.App({
  apiKey: '6fbb75564c6d461080e39e5ccdb3883f'
 });

const particlesOptions ={
  particles:{
    number:{
      value:80,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}


function App() {

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  function onInputChange(event) {
    setInput(event.target.value);
}

function onButtonSubmit(){
  
  // API for face Detection
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL,
    // useState for setImageUrl
    setImageUrl(input)
      )
      .then(
function(response) {
  // do something with response
  console.log(response);
},
function(err) {
  // there was an error
}
);
}

  return (
    <div className="App">
      <Particles className='particles'
        params={particlesOptions}
       / >
      <Navigation />
      <Logo / >
      <Rank />
      <ImageLinkForm value={input} onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} /> 
      <FaceRecognition imageUrl={imageUrl}  />
    </div>
  );
}

export default App;
