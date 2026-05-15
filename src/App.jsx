import { useState } from 'react'
import './App.css'
import Pokedex from './Components/Pokedex/Pokedex'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app-wrapper'>
      <Pokedex />
    </div>
  )
}

export default App
