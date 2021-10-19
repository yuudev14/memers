import React, { useEffect } from 'react'
import Memes from '../../components/home/memes';
import "../../styles/singleMeme/singleMeme.scss";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { viewSingleMemeAction } from '../../slice/actions/memeAction';
import { resetMemeAction } from '../../slice/memeSlice';

const SingleMeme = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const memes = useSelector(state => state.memes.memes)
  useEffect(() => {
    (async() => {
      try {
        await dispatch(viewSingleMemeAction(id))
        
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      dispatch(resetMemeAction())
    }
  }, [])
  return (
    <main>
      <section className="oneMeme">
        { memes.map(meme => (
          <Memes meme={meme}/>
        )) }
      </section>
      
    </main>
  )
}

export default SingleMeme
