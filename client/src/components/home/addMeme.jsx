import React from 'react'

const AddMeme = () => {
  const auto_grow = (e) => {
    e.target.style.height = `"5px"`;
    e.target.style.height = e.target.scrollHeight + "px";
  }
  return (
    <section className="addForm">
      <form>
        <textarea onChange={auto_grow}></textarea>
        <input type="file" id="memeFile"/>
        <label htmlFor="memeFile">
          <img alt="add a meme"/>
        </label>
      </form> 
    </section>
  )
}

export default AddMeme
