import { useEffect, useState } from 'react'
import api from '../../services/api'
import key from '../../services/key'
import { Link } from 'react-router-dom'
import './home.css'
import { MovieData } from '../../typescript/Interfaces'

// URL API: https://api.themoviedb.org/3/movie/550?api_key=d571f914a339fd8837868a976c5889c7

function Home(){
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get('movie/now_playing', {
        params:{
          api_key: key,
          page: 1,
        }
      })

      setMovies(response.data.results.slice(0, 10))
      setLoading(false);
    }

    loadMovies();
  }, [])

  if(loading){
    return(
      <div className='loading'>
        <h2>Loading movies...</h2>
      </div>
    )
  }

  return(
    <div className='container'>
      <div className='movies-list'>
        {movies.map((movie) => {
          return(
            <article key={movie.id}>
              <h1>{movie.title}</h1>
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
              <Link to={`/movie/${movie.id}`}>Access</Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Home;