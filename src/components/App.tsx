import { useEffect, useState } from 'react'
import '@/css/App.css'
import Canvas from './Canvas'
import Gallery from './Gallery'
import CanvasImage from '@/classes/Image'

export default function App() {
  const [canvasImage, setCanvasImage] = useState<CanvasImage | null>(null)
  const [render, rerender] = useState(false)

  function handleTransfer(image: CanvasImage) {
    image.clearLayers()
    setCanvasImage(image)
    rerender(!render)
  }

  useEffect(() => {
    window.ipcRenderer.on('clear-canvas', () => {
      canvasImage?.clearLayers()
      setCanvasImage(null)
    })

    return () => {
      window.ipcRenderer.removeAllListeners('clear-canvas')
    }
  }, [canvasImage])

  return (
    <div className='app-container'>
      <Gallery onTransfer={handleTransfer} />
      <Canvas primaryImage={canvasImage} />
    </div>
  )
}
