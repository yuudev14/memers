import React from 'react'
import AddMeme from '../components/home/addMeme';
import UserProfile from '../components/home/userProfile';
import "../styles/home/home.scss";

const Home = () => {
  return (
    <main className="home">
      <section className="memeFeed">
        dsdf

      </section>
      <section className="profileAndAddMeme">
        <div className="profileAndAddMeme2">
          <div className="profileAndAddMemeContainer">
            <UserProfile />
            <AddMeme />
          </div>
        </div>

      </section>
      
    </main>
  )
}

export default Home
