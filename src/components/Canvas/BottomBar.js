import { useState, useEffect } from "react";

function saveImage(canvas) {
    return function(e){
    // Generates the blob
        const hiddenDownloadElement = document.getElementById("hidden-download-link");
        if (canvas && canvas.current){
            canvas.current.renderAll();
        hiddenDownloadElement.href = canvas.current.toDataURL({
                                                format: 'png'
                                            });
        hiddenDownloadElement.download = 'canvas.png';
        hiddenDownloadElement.click(); // the actual download
        }
    }
}


export default function BottomBar({canvas}) {
    const [ currentModel, setCurrentModel ] = useState(null);
    const [ modelList, setModelList ] = useState([]);

    const [ downloadRef, setDownloadRef ] = useState("");

    //e => saveImage(canvas)(e)
      return (
        <div className="bottom-bar">
            {/* Model drop down select */}
            <div>
            <label htmlFor="model-select">Model Selection:</label>
            <select id='model-select' name='model-select' value={currentModel}
                onChange={e => setCurrentModel(e.target.value)}>
                    {modelList.map(modelname => {
                        return (
                            <option value={`${modelname}`}>{`${modelname}`}</option>
                        );
                    })}
            </select>
            </div>

            {/* Download image */}
            <div className="download-canvas-image">
                <a id='hidden-download-link' download="canvas.png"></a> 
                <a id='download-link' download="canvas.png" onClick={e => saveImage(canvas)(e)}>Download Your Piece</a>
            </div>
        </div>
    )

}