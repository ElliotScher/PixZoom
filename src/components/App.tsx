import { useState } from 'react'
import '../css/App.css'
import Canvas from './Canvas'
import Gallery from './Gallery'
import CanvasImage from '@/classes/Image'

export default function App() {
  const [canvasImage, setCanvasImage] = useState<CanvasImage | null>(null)

  function handleTransfer(image: CanvasImage) {
    setCanvasImage(image)
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
