import React from 'react'

const AddMeme = () => {
  const auto_grow = (e) => {
    e.style.height = "5px";
    e.style.height = e.scrollHeight + "px";
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
