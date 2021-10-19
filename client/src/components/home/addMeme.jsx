import React, {useState} from 'react';
import axios from "axios";

const AddMeme = () => {
  const auto_grow = (e) => {
    e.target.style.height = "20px";
    e.target.style.height = 25+ e.target.scrollHeight + "px";
  }

  const [preview, setPreview] = useState('');
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }

  const postMeme = async(e) => {
    e.preventDefault();
    try {
      const add = await axios.post("/memes", {media: preview, status: ""}, {headers : JSON.parse(localStorage.getItem("memers"))});
      console.log(add);
      
    } catch (error) {
      
    }
    
  }
  return (
    <section className="addForm">
      <form onSubmit={postMeme}>
        <textarea onChange={auto_grow}></textarea>
        <input type="file" id="memeFile" onChange={handleFileInputChange}/>
        <label htmlFor="memeFile">
          <img alt="add a meme"/>
        </label>
        <input type="submit" />
        { preview && <img src={preview} alt="preview meme"/> }
      </form> 
    </section>
  )
}

export default AddMeme
