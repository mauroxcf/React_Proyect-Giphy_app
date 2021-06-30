import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loader from './Loader';
import PageError from './PageError';

export default function Giphy() {

  // this variables manage the state of data, loading and error
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    //obtain the data of the API
    const fetchData = async () => {
      //here we change the state of error and loading
      setError(false)
      setLoading(true)

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "UwxgdX49ZZxFZjZ0TmfxJn7Xn6d9Hg2E",
            limit: 10,
          }
        },);

        // this print its only for testing
        console.log(results);
        //set the get data in the state
        setData(results.data.data)
        // set the state to false because whe already get the data
        setLoading(false)

      } catch (error) {
        setError(true)
      }
    }

    fetchData();
  }, []);

  // this function render the gif obtained
  const gifRender = () => {
    //
    if (loading) return <Loader />
    return data.map(val => {
      return (
        <div key={val.id} className="gif">
          <img alt="GIFs" src={val.images.fixed_height.url} />
        </div>
      )
    })
  }

  /* const pickRandomGif = () => {
    let gif;
    let randomGifs = []

    for(let i=0; i<9; i++){
        let randomNumber = Math.floor(Math.random() * data.length)
        randomGifs.push(randomNumber)
    }

    gif = randomGifs.map(random =>
        <Gif url={!results ? 'Loading...' : `${results[random].images.fixed_height.url}`}
              key={random.id} />
    )
  } */

  const handleClick = (e) => {
    e.preventDefault()
    //pickRandomGif()

  }

  // if there is a error, render the message error
  if (error) return <PageError />

  // this sections will render the Gifs, messages and button
  return (
    <div>
      <div className="text-center m-2 text-light">
        <h1>Hi There! here you can see the Trending Gifs of giphy</h1>
        <button onClick={handleClick} className="btn btn-primary mx-2">Reload</button>
      </div>
      <div className="container gifs">
        {gifRender()}
      </div>
    </div>
  )
}
