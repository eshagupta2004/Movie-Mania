import React from 'react'
import { useParams,NavLink } from 'react-router-dom';
import {API_URL} from './context';
import { useContext, useEffect, useState } from "react";

const SingleMovie = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  //const [isError, setIsError] = useState({show:"false",msg :" "});
  const [movie,setMovie] = useState("");


  const getMovies = async(url) =>{
      try{
          const res = await fetch(url);
          const data = await res.json();
          console.log(data);
          if(data.Response==="True"){
              setIsLoading(false);
              setMovie(data);
          }
          // else{
          //     setIsError({
          //         show:true,
          //         msg:data.error,
          //     });
          // }
      } catch(error){
          console.log(error);
      }
  }
  useEffect(()=>{
      let timerOut = setTimeout(()=>{
          getMovies(`${API_URL}&i=${id}`);
      },700);
      
      return () => clearTimeout(timerOut);
  },[id])

  if(isLoading){
    return(
      <div className='movie-section'> 
        <div className='loading'>Loading Information</div>
      </div>
    )
  }

  return (
      <section className='movie-section'>
        <div className='movie-card'>
          <figure>
            <img src={movie.Poster} alt="" />
          </figure>
          <div className='card-content'>
            <p className='title'>{movie.Title}</p>
            <p className='card-text'>Movie Released : {movie.Released}</p>
            <p className='card-text'>Genre : {movie.Genre}</p>
            <p className='card-text'>IMDB rating : {movie.imdbRating}</p>
            <p className='card-text'>Country : {movie.Country}</p>
            <p className='card-text'>Awards : {movie.Awards}</p>
            <p className='card-text'>Actors : {movie.Actors}</p>
            <p className='card-text'>Director : {movie.Director}</p>
            <p className='card-text'>BoxOffice : {movie.BoxOffice}</p>
            <NavLink to="/" className='back-btn'>Go Back</NavLink>
          </div>
        </div>
      </section>
  )
}

export default SingleMovie