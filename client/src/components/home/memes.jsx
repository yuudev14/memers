import React from 'react'

const Memes = (props) => {
  const {
    meme
  } = props;
  console.log(meme);

  return (
    <div className="memes">
      <div className="meme_header">
        <i className="fa fa-user"></i>
        <div className="memeInfo">
          <h5>{meme.username}</h5>
          <p>{meme.date}</p>
        </div>
      </div>
      <div className="meme">
        <p>{meme.status}</p>
        <img src={meme.media} alt="meme" className="meme_media"/>
      </div>
      <div className='icons'>
        <div className="laugh"><span>{meme.isUser !== "0" ? '🤣' : '😐'}</span>{meme.laugh}</div>
      </div> 
    </div>
  )
}

export default Memes
