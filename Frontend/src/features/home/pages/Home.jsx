import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/player'
import { useSong } from '../hooks/useSong'
import Navbar from '../../shared/components/Navbar'

const Home = () => {
  const {handleGetSongs} = useSong();

  return (
    <>
      <Navbar />
      <FaceExpression onClick={(expression) => {handleGetSongs({mood: expression})}} />
      <Player />
    </>
  )
}

export default Home
