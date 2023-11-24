import { useState } from 'react'
import '../css/App.css'
import Canvas from './Canvas'
import Gallery from './Gallery'

export default function App() {
  const [canvasImage, setCanvasImage] = useState<File | null>(null)

  function handleTransfer(file: File) {
    setCanvasImage(file)
  }

  function handleClear() {
    setCanvasImage(null)
  }

  return (
    <div className='app-container' onDrop={() => handleTransfer}>
      <Gallery onTransfer={handleTransfer} />
      <Canvas primaryImage={canvasImage} onClear={handleClear} />
    </div>
  )
}
