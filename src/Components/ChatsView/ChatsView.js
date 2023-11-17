import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectedImage, selectImage } from '../../features/appSlice'
import {CountdownCircleTimer}  from 'react-countdown-circle-timer'
import './ChatsView.css'

const ChatsView = () => {
    const selected_Image = useSelector(selectedImage)
    const navigate = useNavigate()

    useEffect(() => {
        if(!selected_Image){
            exit()
        }
    }, [selected_Image]);
    const exit = () => {
        navigate('/chats',{replace:true})
    }

    const exitScreen = () => {
        navigate('/chats',{replace:true})
    }

  return (
    <div onClick={exitScreen} className='chatView'>
        <img src={selected_Image} alt="" />
        <div className="chatView__timer">
        <CountdownCircleTimer
            isPlaying
            duration={10}
            strokeWidth={6}
            size={50}
            colors={[
                ["#004777",0.33],
                ["#F7B801",0.33],
                ["#A30000",0.33],
            ]}
        >
            {({remainingTime}) => {
                if (remainingTime == 0) {
                    exit()
                }
                return remainingTime
            }}
        </CountdownCircleTimer>
        </div>
    </div>
  )
}

export default ChatsView