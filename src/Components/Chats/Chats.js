import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Chats.css";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Chat from "./Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/appSlice";
import { signOut } from "firebase/auth";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "../../features/cameraSlice";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate("/", { replace: true });
  };

  const displayGallery = () => {
    navigate("/memories", { replace: true });
  };
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => signOut(auth)}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
        <CollectionsBookmarkIcon
          onClick={displayGallery}
          className="chats__memIcon"
        />
      </div>
      <div className="chats__posts">
        {posts.map((post) => (
          <Chat
            key={post.id}
            id={post.id}
            username={post.data.username}
            profilePic={post.data.profilePic}
            imageUrl={post.data.imageUrl}
            read={post.data.read}
            timestamp={post.data.timestamp}
          />
        ))}
      </div>
      <RadioButtonUnchecked
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
};

export default Chats;
