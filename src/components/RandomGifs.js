import React, { useState } from 'react'
import GifRender from './GifRender';

export default function RandomGifs(props) {

  let allData = props.data;
  const [gif, setGif] = useState([]);
  let gifs;
  const limit = 10;

  //this function render the obtained gifs at the beginning
  const gifRender = () => {
    /* return allData.map(val => {
      return (
        <div key={val.id} className="gif m-1">
          <img className="rounded" alt="GIFs" src={val.images.fixed_height.url} />
        </div>
      )
    }) */
    return allData.slice(0, limit).map(val => {
      return (
        <div key={val.id} className="gif m-1">
          <img className="rounded" alt="GIFs" src={val.images.fixed_height.url} />
        </div>
      )
    })
  }

  // this function manage the randomizer of the gifs obtained from the api
  const pickRandomGif = () => {
    let randomGifs = []

    // creating the randomizer numbers
    for(let i=0; i <= 9; i++){
        let randomNumber = Math.floor(Math.random() * allData.length)
        randomGifs.push(randomNumber)
    }

    //render the gif using a random list of gifs
    gifs = randomGifs.map((random, index) =>
      <GifRender url={!allData ? 'Loading...' : `${allData[random].images.fixed_height.url}`}
      key={index} />
    )
    setGif(gifs)
    //just for testing the new random gif array
    console.log(gifs)
  }

  const handleClick = (e) => {
    e.preventDefault()
    pickRandomGif()
  }

  return (
    <div>
      <button onClick={handleClick} className="btn btn-primary mx-2 mb-2">Reload</button>
      <div className="container gifs">
        {gif.length === 0 ? gifRender() : gif}
      </div>
    </div>
  )
}
