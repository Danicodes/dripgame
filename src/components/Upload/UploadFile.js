import { Upload } from 'upload-js';
import { useState, useContext} from 'react';
import { useEffect } from 'react';
import createContributor  from '../../services/createContributor';
import  fetchContributorByUsername  from '../../services/fetchContributorByUsername';
import fetchAssetByUrl from '../../services/fetchAssetByUrl';

import uploadAsset  from '../../services/uploadAsset';
import UploadForm from '../UploadForm/UploadForm';

import { uploadedFileContext } from './UploadWidget';
import UploadWidget from './UploadWidget';

export default function UploadFile({username}) {

    const [progress, setProgress] = useState(null);
    const fileUrl = useContext(uploadedFileContext);    
    const [error, setError] = useState(null);

    const [assetExtra, setAssetExtra] = useState({});
    const [inputfileObj, setInputFileObj] = useState({});
    const [modelID, setModelID] = useState(null);

   
// } -- react wants this to be controlled by state?
    const parseAssetExtra = (value) => {
        if (!value) {
            return {};
        }

        try {
            let pairs = value.trim().split(',');
            let valueObj = {};

            for (let pair of pairs) {
                let [key, val] = pair.split(':');
                valueObj[key.trim()] = val.trim();
            }
            return valueObj;
        }
        catch(e){
            //TODO: Return error
            return {};
        }
    }

    const returnUploadForm = (fileUrl) => {
        return(<div className='contribution-form-div'>
                    <div className="row">
                        <h4>Hey {username}, give us more info about this upload:</h4>
                    </div>
                    <UploadForm fileUrl={fileUrl}></UploadForm>
                </div>
        );
    }
    
    if (error !== null) return error.message;
    if (progress !== null ) return <>File uploading... {progress}%</>;

    return (
        <div className='uploadFile'>
        {/* <input type="file"></input> */}
        <label for="artUpload" class="form-label">Add artwork here</label>
        <UploadWidget onUploadRender={returnUploadForm}></UploadWidget>
           {/* <input 
            className='customFileInput form-control-lg'
            id='artUpload'
            type="file" 
            onChange={upload.uploadFile({
                onBegin: ({cancel}) => setProgress(0),
                onProgress: ({ progress }) => setProgress(progress),
                onUploaded: ({ fileUrl }) => setFileUrl(fileUrl),
                onError: (error) => setError(error)
            })} /> */}
        </div>
    )
}