import { useState } from 'react'
import MultiStepForm from './MultiStepForm'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <MultiStepForm/>
    </>
  )
}

export default App
