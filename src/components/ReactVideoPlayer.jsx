
import React,{useState} from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  const [mediaUrl, setMediaUrl] = useState('');
  const [isVideo, setIsVideo] = useState(false)
  const [file, setFile] = useState(null)
  const [imageMetaData, setImageMetaData] = useState(null)
  const [videoMetadata, setVideoMetadata] = React.useState(null);
  const [dataLoaded, setDataLoaded] = useState(false)
  const [videoResolution, setVideoResolution] = useState('');
//   const [loader, setLoader] = useState(false);
//   const [fileType, setFileType] = useState("");

const execImage = (THIS) => {
    const resolution = gcd(THIS.width, THIS.height);
    console.log(THIS)
    const fileData = [
      {
        name: "形式",
        value: "Image",
      }
    ];

  setImageMetaData({
    type: 'image',
    aspectRatio: `${THIS.width / resolution + ":" + THIS.height / resolution}`,
    resolution: `${THIS.width + "X" + THIS.height}`
  })
    // fileData.push({
    //   name: "アスペクト比",
    //   value: THIS.width / resulotion + ":" + THIS.height / resulotion,
    // });
    // fileData.push({
    //   name: "解像度",
    //   value: THIS.width + "X" + THIS.height,
    // });
    
   // setLoader(false);
  };

const getWidthFromFile = (file, callback) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const dataUrl = event.target.result;
      const image = new Image();
      image.onload = function () {
        callback(this);
      };
      image.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };


  const gcd = (a, b) => {
    return b == 0 ? a : gcd(b, a % b);
  };
  const handleFileUpload = (e) => {

    const selectedFile = e.target.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);
    setFile(e.target.files[0])
    // setFile({
    //     file: e.target.files[0],
    // })
    console.log(e.target.files[0])
    if(e.target.files[0].type.includes('video')) {
        setIsVideo(true)
    }else {
        getWidthFromFile(e.target.files[0], execImage);

        setIsVideo(false);
    }
    setDataLoaded(true)
    setMediaUrl(fileUrl);
  };

  const handleVideoDuration = (duration) => {
    setVideoMetadata((prevMetadata) => ({
      ...prevMetadata,
      duration: duration.toFixed(2),
    }));
  };


  const handleVideoReady = () => {
    const player = document.querySelector('video');
    const resolution = `${player.videoWidth}x${player.videoHeight}`;
    setVideoResolution(resolution);
   
    const hasSound = player.mozHasAudio || Boolean(player.webkitAudioDecodedByteCount) || Boolean(player.audioTracks?.length);
    const { videoWidth, videoHeight } = player;
    const aspectRatio = videoWidth / videoHeight;
    setVideoMetadata((prevMetadata) => ({
      ...prevMetadata,
      hasSound,
      resolution,
      aspectRatio: aspectRatio.toFixed(2),
      
    }));
  };

  React.useEffect(() => {
    if (mediaUrl) {
      const videoType = mediaUrl.split('.').pop();
      setVideoMetadata({ type: videoType });
    }
  }, [mediaUrl]);

  return (

    <div>
      {/* <input type="file" onChange={handleFileUpload} /> */}
      {videoMetadata && isVideo && dataLoaded && (

<div className="metaData-table-wrapper">
        <h4 className="file-title">
    <span>
      <img src="movie-icon.png" />
    </span>
    焼き芋できたて
  </h4>
        <table>
          <thead>
            <tr>
              <th>Metadata</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
         
            <tr>
              <td>Type</td>
              <td>{videoMetadata.type}</td>
            </tr>
            <tr>
              <td>Has Sound</td>
              <td>{videoMetadata.hasSound ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
            <td>Aspect Ratio</td>
             <td>{videoMetadata.aspectRatio}</td>
           </tr>
           <tr>
              <td>Duration</td>
              <td>{videoMetadata.duration} seconds</td>
            </tr>
            <tr>
              <td>Resolution</td>
              <td>{videoMetadata.resolution}</td>
            </tr>
         
          </tbody>
        </table>
        </div>
     
      )}
        {!isVideo && dataLoaded && (
          <>
              <div className="metaData-table-wrapper">
        <h4 className="file-title">
    <span>
      <img src="movie-icon.png" />
    </span>
    焼き芋できたて
  </h4>
        <table>
          <thead>
            <tr>
              <th>Metadata</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
         
            <tr>
              <td>Type</td>
              <td>{imageMetaData?.type}</td>
            </tr>
           
            <tr>
            <td>Aspect Ratio</td>
             <td>{imageMetaData?.aspectRatio}</td>
           </tr>
           <tr>
            <td>Resolution</td>
             <td>{imageMetaData?.resolution}</td>
           </tr>
          </tbody>
        </table>
        </div>
        </>
      )}
    <div className="file-input-preview">
  
              <div className="file-preview">
                {isVideo && <ReactPlayer url={mediaUrl}   className="previewElement"   width="400" controls onDuration={handleVideoDuration} onReady={handleVideoReady} />}
               
                {!isVideo && <img className="previewElement" src={mediaUrl} alt="Preview" /> }
              
              </div>
         
          </div>
          <div className="upload-button-wrapper">
            <label htmlFor="file-input" className="file-label">
            アップロード
            </label>
            <input type="file"  id="file-input" onChange={handleFileUpload} className="file-upload" />
          </div>




      
   
   
   
   
    </div>
  );
};

export default VideoPlayer;


