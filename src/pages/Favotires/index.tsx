
import { useEffect, useState } from 'react';
import './favorites.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { MovieData } from '../../typescript/Interfaces';

function Favorites() {

  const [movies, setMovies] = useState<MovieData[]>([])

  useEffect(() => {
    const myList = localStorage.getItem('@movList');
    typeof myList == 'string' && setMovies(JSON.parse(myList) || [])
  }, [])

  function handleDelete(id: number) {
    const movieFilter = movies.filter((item) => {
      return item.id !== id
    })

    setMovies(movieFilter);
    localStorage.setItem('@movList', JSON.stringify(movieFilter));
    toast.success('Movie deleted with success')
  }
  return (
    <div className='my-movies'>
      <h1>My Movies</h1>
      {movies.length === 0 && <h2>You don't have any favorites movies :( </h2>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <span className='movie-title-favorite'>{movie.title}</span>
            <div>
              <Link to={`/movie/${movie.id}`}>See details</Link>
              <button onClick={() => handleDelete(movie.id)} className='button'>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Favorites;