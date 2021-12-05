import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddMeme from "../../components/home/addMeme";
import Memes from "../../components/home/memes";
import { viewAllMemeAction } from "../../slice/actions/memeAction";
import { resetMemeAction } from "../../slice/memeSlice";
import "../../styles/home/home.scss";

const Home = () => {
  
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const memes = useSelector((state) => state.memes.memes);
  const profileAndAddMemeRef = useRef();

  useEffect(() => {
    if (auth) {
      dispatch(viewAllMemeAction());
    }
  }, [auth, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetMemeAction());
    };
  }, [dispatch]);

  const toggleForm = () => {
    profileAndAddMemeRef.current.classList.toggle("showForm");
  };
  return (
    <main className="home">
      <i className="fa fa-plus-circle" onClick={toggleForm}></i>
      <section className="memeFeed">
        {memes.map((meme) => (
          <Memes meme={meme} key={meme.id} />
        ))}
      </section>
      <section className="profileAndAddMeme" ref={profileAndAddMemeRef}>
        <div className="profileAndAddMeme2">
          <div className="profileAndAddMemeContainer">
            <AddMeme profileAndAddMemeRef={profileAndAddMemeRef} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
