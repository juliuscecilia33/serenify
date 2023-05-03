import React, { useState,useEffect } from "react";
import { storage } from "./firebaseConfig/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Button, Stack, Textarea, Input } from "@chakra-ui/react";
import { v4 } from "uuid";

export function UploadAttachment(props) {
    const [uploadImage, setUploadImage] = useState(null);
    //const [url, setUrl] = useState("");

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setUploadImage(e.target.files[0]);
        }
    }

    const handleClick = (e) => {
        if (uploadImage == null) return;
        const postImageTime = new Date(localStorage.getItem('promptDate')).toLocaleDateString();
        
        const imageRef = ref(storage, `images/${localStorage.getItem('userid')}/${postImageTime}/${uploadImage.name + v4()}`);
        uploadBytes(imageRef, uploadImage).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                props.setAttachment(url);
                console.log("url:", url);
            })
            console.log("successfully upload image:", uploadImage.name);
        })
    };

    // handleClick = (e) => {
    //     const uploadTask = storage.ref(`image/${uploadImage.name}`).put(uploadImage);
    //     uploadTask.on(
    //         "State Changed",
    //         snapshot => {},
    //         error => {
    //             console.log(error);
    //         },
    //         () => { 
    //             storage
    //                 .ref("image")
    //                 .child(uploadImage.name)
    //                 .getDownloadURL()
    //                 .then(url => { 
    //                     console.log(url);
    //                     setUrl(url); 
    //                 });
    //         }
    //     )
    // }

    return (
        <div>
            <Input type="file" onChange={(e) => handleChange(e)} accept="/image/*" />
            <Button colorScheme='teal' variant='outline' onClick={(e) => handleClick(e)}>
                <PlusSquareIcon />
            </Button>
        </div>
    );
}

