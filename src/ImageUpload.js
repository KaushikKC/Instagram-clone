import { Button } from '@mui/material';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {storage, db} from './firebase'
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import './ImageUpload.css'



function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    // const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const downloadUrl = () => {
            getDownloadURL(uploadTask.snapshot.ref)
            
            .then(url => {
                addDoc(collection(db,'posts'),{
                    timestamp: serverTimestamp(),
                    caption: caption,
                    imageURL: url,
                    username: username, 
                    // imagename: image.name
                });

                setProgress(0);
                setCaption("");
                setImage(null);
            })
        }
        const err = (error) => {
            console.log(error);
            alert(error.message);
        }
        const uploadTask = uploadBytesResumable(ref(storage,`images/${image.name}`),image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },err,downloadUrl
            
        )
    }
  return ( 
    <div className='imageUpload'>
        <progress className='imageupload__progress' value={progress} max='100' />
        <input type='text' placeholder='Enter a caption..' onChange={event => setCaption(event.target.value)} value={caption}/>
        <input type='file' onChange={handleChange}/>
        <Button onClick={handleUpload} >
            Upload
        </Button>
    </div>
  )
}

export default ImageUpload;
