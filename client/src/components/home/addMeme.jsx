import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addMemeAction } from '../../slice/actions/memeAction';

const AddMeme = () => {
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useDispatch()
  const pending = useSelector(state => state.memes.pending);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  }
  const auto_grow = (e) => {
    setStatus(e.target.value);
    e.target.style.height = "20px";
    e.target.style.height = 25+ e.target.scrollHeight + "px";
  }

  const postMeme = async(e) => {
    e.preventDefault();
    try {
      if(preview){
        await dispatch(addMemeAction({media: preview, status}));
        setStatus('');
        setPreview('');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="addForm">
      <form onSubmit={postMeme}>
        <textarea value={status} onChange={auto_grow} placeholder="What's your meme"></textarea>
        <input value={preview} type="text" placeholder="img/gif link" onChange={(e) => setPreview(e.target.value)}/>
        <div className='addMemeBtns'>
          <input type="file" id="memeFile" onChange={handleFileInputChange}/>
          <label htmlFor="memeFile" >
            <i className="fa fa-image"></i>
          </label>
          <input type="submit" disabled={(preview ? false : true) || pending} />
        </div>
        { preview && <img src={preview} alt="preview meme"/> }
      </form> 
    </section>
  )
}

export default AddMeme
