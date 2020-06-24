import React, { useState, useEffect } from 'react';
import './App.css';

const playerWidth=320;

const PreviewWindow = (props) => {
	return (props.src!==null)?<div>
				<iframe style={{position:"absolute",
				left:(window.innerWidth-playerWidth)+"px",bottom:-window.scrollY+"px"}} className="bottomright" id="previewWindow" src={props.src}/>
			</div>:<React.Fragment/>;
}


const RadioButton = (props) => {
  return (
    <React.Fragment>
      <label for={props.name} className="ml-4">{props.displayName}</label>
      <input type='radio' name="media-selection" value={props.name} id={props.name}
        onClick={() => props.setMediaType(props.name)} checked={props.mediaType===props.name}/>
    </React.Fragment>
  )
}

const MediaContainer = (props) => {
  const togglePreview = (setPreview,sourceUrl) => {
	  //console.log(setPreview+","+sourceUrl)
    setPreview(sourceUrl);
  }
	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;

		return [year, month, day].join('-');
	}
	
  return (
    <div>
      {props.data.map((media, counter) => 
	  <React.Fragment>
	  <div className="card pt-3 gradient">
		  <div className="row">
			  <div className="offset-md-2 col-md-6">
				<h4>{media.trackName}</h4>
			 <b>{media.artistName} </b>: <span>{media.collectionName}
				<br/><br/>${media.trackPrice}<br/>{media.longDescription}			 
				</span> 
			  </div>
			  <div className="col-md-3 text-center">
				<img className="shadow" src={media.artworkUrl100} alt={media.artistName}/>
			  </div>
			</div>
			<div className="row mb-3">
			  <div className="offset-md-8 col-md-3 text-center">
				<button type='button' onClick={() => togglePreview(props.setPreview,media.previewUrl)}>Show Preview</button>
				</div>
			</div>
		</div>
		</React.Fragment>)}
	</div>)
}


const App = () => {
  const [mediaType, setMediaType] = useState("song")
  const [currentData, setCurrentData] = useState([])
  const [currentPreview, setPreview] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {fetch(`http://localhost:3002/${mediaType}`)
  .then(response => response.json())
  .then(data => {/*console.log(data);*/ setCurrentData(data)})}, [mediaType])
  
  function setSearch(e){
	setSearchQuery(e.target.value)
	//console.log(e.target.value);
  }

  return (
    <React.Fragment>
		<div className="container">
			<div className="row">
				<div className="text-center col-md-12">
					Search Title/Artist/Album: <input style={{"width":"480px","height":"32px"}} type="text" onChange={(e)=>{setSearch(e)}}/>
				</div>
			</div>
			<div className="row">
				<div className="offset-md-2 col-md-8">
					<RadioButton displayName="Songs" mediaType={mediaType} name="song" setMediaType={setMediaType} />
					<RadioButton displayName="Music Videos" mediaType={mediaType} name="music-video" setMediaType={setMediaType} />
					<RadioButton displayName="Movies" mediaType={mediaType} name="feature-movie" setMediaType={setMediaType} />
				</div>
			</div>
			<MediaContainer data={(searchQuery.length>0)?currentData.filter((song)=>{
				return (song.trackName && song.trackName.toLowerCase().includes(searchQuery.toLowerCase())||song.collectionName && song.collectionName.toLowerCase().includes(searchQuery.toLowerCase())||song.artistName && song.artistName.toLowerCase().includes(searchQuery.toLowerCase()))
			}):currentData} setPreview={setPreview}/>
			<PreviewWindow src={currentPreview}/>
		</div>
    </React.Fragment>
  )
}

export default App;
