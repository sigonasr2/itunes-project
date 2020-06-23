import React, { useState, useEffect } from 'react';
import './App.css';


const RadioButton = (props) => {

  return (
    <React.Fragment>
      <br></br>
      <label for={props.name}>{props.name}</label>
      <input type='radio' name="media-selection" value={props.name} id={props.name}
        onClick={() => props.setMediaType(props.name)}/>
    </React.Fragment>
  )
}

const MediaContainer = (props) => {
  const [previewOn, setPreviewOn] = useState(false)

  const togglePreview = (counter, sourceUrl) => {
    document.getElementById(counter).innerHTML = "<iframe src='" + sourceUrl + "'></iframe>"
  }

  return (
    <div>
      {props.data.map((media, counter) => <div><img src={media.artworkUrl100} alt={media.artistName} /><span>{media.trackName} </span>
        <span>{media.trackId} </span> <span>{media.collectionName} </span> <span>{media.collectionId} </span>
        <span>{media.artistId} </span> <span>{media.artistName} </span> <button type='button' onClick={() => togglePreview(counter, media.previewUrl)}>Toggle Preview</button>
        <div id={counter}></div><hr/></div>)}
  </div>)
}


const App = () => {
  const [mediaType, setMediaType] = useState("song")
  const [currentData, setCurrentData] = useState([])

  useEffect(() => {fetch(`http://localhost:3001/${mediaType}`)
  .then(response => response.json())
  .then(data => {console.log(data); setCurrentData(data)})}, [mediaType])

  return (
    <React.Fragment>
      Current media type: {mediaType}
        <RadioButton name="song" setMediaType={setMediaType} />
        <RadioButton name="music-video" setMediaType={setMediaType} />
        <RadioButton name="feature-movie" setMediaType={setMediaType} />

        <MediaContainer data={currentData}/>
    </React.Fragment>
  )
}

export default App;
