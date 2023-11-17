import { Avatar } from '@mui/material'
import React from 'react'
import './Chat.css'
import StopIcon from '@mui/icons-material/Stop';
import ReactTimeago from 'react-timeago'
import { useDispatch, useSelector } from 'react-redux';
import { selectedImage, selectImage, selectUser } from '../../../features/appSlice';
import { useNavigate } from 'react-router-dom'
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';


const Chat = ({id,username,profilePic,timestamp,read,imageUrl}) => {
    const dispatch = useDispatch()
    const image = useSelector(selectedImage)
    const navigate = useNavigate()
    

    const open = () => {
        if (!read){
            dispatch(selectImage(imageUrl))
            const docRef = doc(db,`posts/${id}`)
            setDoc(docRef,{
                read:true
            },
            {merge:true}
            );
            navigate('/chats/view')
        }
    }
  
return (
    <div onClick={open} className='chat'>
        
        <Avatar className='chat__avatar' src={profilePic}/>
        <div className="chat__info">
            <h4>{username}</h4>
            <p>{!read && "Tap to view - "}{" "} <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/></p>
        </div>
        {!read && <StopIcon className='chat__readIcon' />}
    </div>
  )
}

export default Chat