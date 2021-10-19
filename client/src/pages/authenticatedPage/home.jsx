import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddMeme from "../../components/home/addMeme";
import Memes from '../../components/home/memes';
import { viewAllMemeAction } from '../../slice/actions/memeAction';
import "../../styles/home/home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.auth);
  const memes = useSelector(state => state.memes.memes);

  useEffect(() => {
    if(auth){
      dispatch(viewAllMemeAction());
    }
  }, [auth]);
  return (
    <main className="home">
      <section className="memeFeed">
        { memes.map(meme => (
          <Memes meme={meme} key={meme.id}/>
        )) }
        

      </section>
      <section className="profileAndAddMeme">
        <div className="profileAndAddMeme2">
          <div className="profileAndAddMemeContainer">
            <AddMeme />
          </div>
        </div>

      </section>
      
    </main>
  )
}

export default Home
