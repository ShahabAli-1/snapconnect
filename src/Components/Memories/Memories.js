import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";
import "./Memories.css";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "../Chats/Chat/Chat.css";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";

const Memories = () => {
  const [photos, setphotos] = useState([]);

  const navigate = useNavigate();
  const images = [];
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setphotos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    console.log(photos);
  }, []);

  const movetoChats = () => {
    navigate("/chats", { replace: true });
  };

  return (
    <div className="memories">
      <div className="memories__photos">
        {photos.map((photo) => (
          <img key={photo.id} src={photo.data.imageUrl} alt="" />
        ))}
      </div>
      <ArrowBackIcon
        className="memories__backButton"
        fontSize="large"
        onClick={movetoChats}
      />
      {/* <RadioButtonUnchecked className="chats__takePicIcon" fontSize="large" /> */}
    </div>
  );
};

export default Memories;
