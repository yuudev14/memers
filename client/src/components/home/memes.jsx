import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteMemeAction, editMemeAction, laughAction } from '../../slice/actions/memeAction';
import moment from "moment";
import { Link } from 'react-router-dom';

const Memes = (props) => {
  const {
    meme
  } = props;
  const dispatch = useDispatch();
  const [editStatus, setStatus] = useState();
  const userInfo = useSelector(state => state.auth.userInfo);
  const pending = useSelector(state => state.memes.pending);
  const editFieldsRef = useRef();
  const optionsRef = useRef();

  const laughToMeme = async() => {
    try {
      await dispatch(laughAction(meme.id));
    } catch (error) {
      console.log(error);
    }
  }
  const auto_grow = (e) => {
    setStatus(e.target.value);
    e.target.style.height = "20px";
    e.target.style.height = 25+ e.target.scrollHeight + "px";
  }

  const editMeme = async(e) => {
    try {
      e.preventDefault();
      await dispatch(editMemeAction({id: meme.id, status: editStatus}));
      editFieldsRef.current.classList.remove("showEditFields")

    } catch (error) {
      console.log(error);
      
    }

  }

  const deleteMeme = async() => {
    try {
      dispatch(deleteMemeAction(meme.id));
    } catch (error) {
      
    }
  }

  return (
    <div className="memes">
      <section className="meme_header">
        <i className="fa fa-user"></i>
        <div className="memeInfo">
          <h5>{meme.username}</h5>
          <p>{moment(meme.date).fromNow()}</p>
        </div>
      </section>
      <section className="meme">
        <p>{meme.status}</p>
        <Link to={`/${meme.id}`}><img src={meme.media} alt="meme" className="meme_media" /></Link>
      </section>
      <section className='icons'>
        <div className="laugh"><span onClick={laughToMeme}>{meme.isUser !== "0" ? '🤣' : '😐'}</span>{meme.laugh}</div>
      </section>

      { (userInfo && userInfo.username === meme.username) && (
        <>
          <div className="options" ref={optionsRef}>
            <div className="optionBtns">
              <button onClick={deleteMeme}>Delete</button>
              <button onClick={() => editFieldsRef.current.classList.toggle("showEditFields")}>Edit</button>
            </div>
            <div className="editFields" ref={ editFieldsRef }>
              <form onSubmit={editMeme}>
                <textarea onChange={auto_grow} placeholder="What to status"></textarea>
                <input type="submit" disabled={pending}/>
              </form> 

            </div>
          </div> 
          <i className="fa fa-ellipsis-v" onClick={() => optionsRef.current.classList.toggle("showOptions")}></i>
        </>
      )}
      
      
    </div>
  )
}

export default Memes
