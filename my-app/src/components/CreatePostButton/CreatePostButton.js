import "./CreatePostButton.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function CreatePostButton() {
    const [isOpen, setIsOpen] = useState(false);

    //navigate to the exercise intro page
    const navigate = useNavigate();
    const goToCreatePost = (exerciseProfile) => {
        navigate("/intro/" + exerciseProfile.exerciseName);
    }

    return (
        <div>
            <button
             onClick={() => setIsOpen(true)}
            >
                <img src={pencil} alt="pencil click to add post" />
            </button>

            {isOpen && <CreatePost />}
            {/* <CreatePost pormptid/> */}
        </div>
    )
}

