import './App.css'
import Pokedex from './Components/Pokedex/Pokedex'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className='app-wrapper'>
      <h1 className='pokedex-heading'> 
        <Link to = '/'> POKEDEX </Link></h1>
      <CustomRoutes />
    </div>
  )
}

export default App
