import './header.css'
import { Link } from 'react-router-dom'

function Header(){
  return(
    <header>
      <Link className='logo' to='/'>Movlist</Link>
      <Link to='/favorites'>
        <button className='favorites'>Favorites</button>
      </Link>
    </header>
  )
}

export default Header;