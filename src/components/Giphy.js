import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loader from './Loader';
import PageError from './PageError';
import RandomGifs from './RandomGifs';

export default function Giphy() {

  // this variables manage the state of data, loading and error
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  //const [offset, setOffset] = useState(0)

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
            limit: 40,
          }
        },);

        // set the state to false because whe already get the data
        setLoading(false)
        return results.data;

      } catch (error) {
        setError(true)
      } return 'error en el fetch';
    }

    // setting data to send correctly to the component
    fetchData().then( (res) => {
      console.log('la respuesta es:')
      console.log(res.data)
      setData(res.data)
    });
  }, []);

  // if there is a error, render the message error
  if (error) return <PageError />
  if (loading) return <Loader />

  // this sections will render the Gifs, messages and button
  return (
    <div>
      <div className="text-center m-2 text-light">
        <h1>Hi There! here you can see the Trending Gifs of giphy</h1>
        <RandomGifs data={data}/>
      </div>
    </div>
  )
}
