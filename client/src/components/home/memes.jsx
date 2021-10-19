import React from 'react';
import { useDispatch } from "react-redux";
import { laughAction } from '../../slice/actions/memeAction';
import moment from "moment";
import { Link } from 'react-router-dom';

const Memes = (props) => {
  const {
    meme
  } = props;
  const dispatch = useDispatch();

  const laughToMeme = async() => {
    try {
      await dispatch(laughAction(meme.id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="memes">
      <div className="meme_header">
        <i className="fa fa-user"></i>
        <div className="memeInfo">
          <h5>{meme.username}</h5>
          <p>{moment(meme.date).fromNow()}</p>
        </div>
      </div>
      <div className="meme">
        <p>{meme.status}</p>
        <Link to={`/${meme.id}`}><img src={meme.media} alt="meme" className="meme_media" /></Link>
      </div>
      <div className='icons'>
        <div className="laugh"><span onClick={laughToMeme}>{meme.isUser !== "0" ? '🤣' : '😐'}</span>{meme.laugh}</div>
      </div> 
    </div>
  )
}

export default Memes
