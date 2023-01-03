
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import key from '../../services/key'


import './movie-info.css'

import { toast } from 'react-toastify'
import { MovieData } from '../../typescript/Interfaces'

function Movie(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie(){
      await api.get(`/movie/${id}`, {
        params: {
          api_key: key
        }
      })
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("Movie not found: ", e)
        navigate('/', { replace: true });
        return;
      })
    }

    loadMovie();

    }, [navigate, id])


  function saveMovie(){
    const myList = localStorage.getItem('@movList');
    
      let savedMovies = typeof myList == 'string' && JSON.parse(myList) || [];

      const hasMovie = savedMovies.some((savedMovies: {id: number}) => savedMovies.id == movie?.id);
      if (hasMovie){
        toast.warn('This movie is already on your list')
        return;
      }

      savedMovies.push(movie);
      localStorage.setItem('@movList', JSON.stringify(savedMovies));
      toast.success('Movie saved with success')
   
    
  }

  if(loading){
    return(
      <div className='movie-info'>
        <h1>Loading details</h1>
      </div>
    )
  }

  return(
    <div className='movie-info'>
      <h1>{movie?.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
      <h3>Synopsis</h3>
      <h4>{movie?.overview}</h4>
      <p>Rate: {movie?.vote_average.toFixed(1)} / 10</p>
      <div className='btn-area'>
        <button onClick={saveMovie}>Save</button>
        <button>
          <a href={`https://youtube.com/results?search_query=${movie?.title} Trailer`} target='_blank' rel='external'>Trailer</a>
        </button>
      </div>
    </div>
  )
}

export default Movie;