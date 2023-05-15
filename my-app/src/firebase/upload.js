import React, { useEffect, useState } from "react";
import { storage } from "./firebaseConfig/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Button, Input } from "@chakra-ui/react";
import { v4 } from "uuid";
import "./upload.css";

export function UploadAttachment(props) {
  const [uploadImage, setUploadImage] = useState(null);
  //const [url, setUrl] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setUploadImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (uploadImage == null) return;
    const postImageTime = new Date(localStorage.getItem("promptDate"))
      .toLocaleDateString()
      .replace(/\//g, "-");

    const imageRef = ref(
      storage,
      `images/${localStorage.getItem("userid")}/${postImageTime}/${
        uploadImage.name + v4()
      }`
    );
    uploadBytes(imageRef, uploadImage).then((snapshot) => {
      console.log("snapshot: ", snapshot);
      if (snapshot.metadata.contentType === "video/mp4") {
        props.setIsVideo(true);
      }
      getDownloadURL(snapshot.ref).then((url) => {
        props.setAttachment(url);
        console.log("url:", url);
      });
      console.log("successfully upload image:", uploadImage.name);
    });
  }, [setUploadImage, uploadImage]);

  // const handleClick = (e) => {
  //   if (uploadImage == null) return;
  //   const postImageTime = new Date(localStorage.getItem("promptDate"))
  //     .toLocaleDateString()
  //     .replace(/\//g, "-");

  //   const imageRef = ref(
  //     storage,
  //     `images/${localStorage.getItem("userid")}/${postImageTime}/${
  //       uploadImage.name + v4()
  //     }`
  //   );
  //   uploadBytes(imageRef, uploadImage).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       props.setAttachment(url);
  //       console.log("url:", url);
  //     });
  //     console.log("successfully upload image:", uploadImage.name);
  //   });
  // };

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
    <div className="upload-attachment">
      <h1 className="upload-text">Upload an Image or Video!</h1>
      <Input
        type="file"
        errorBorderColor="red"
        onChange={(e) => {
          handleChange(e);
        }}
        accept="/image/*"
        variant="unstyled"
      />
      {/* <Button
        colorScheme="teal"
        onClick={(e) => handleClick(e)}
        variant="unstyled"
      >
        <PlusSquareIcon />
      </Button> */}
    </div>
  );
}
