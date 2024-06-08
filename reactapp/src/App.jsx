import { useState } from 'react'
import BgImg from './assets/imgs/bg.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-background">
        heyy
      </div>
      <img src={BgImg} alt="" />
    </>
  )
}

export default App
