import { useEffect, useState } from 'react'
import '@/css/App.css'
import Canvas from './Canvas'
import Gallery from './Gallery'
import CanvasImage from '@/classes/Image'

export default function App() {
  const [canvasImage, setCanvasImage] = useState<CanvasImage | null>(null)

  function handleTransfer(image: CanvasImage) {
    setCanvasImage(image)
  }

  useEffect(() => {
    window.ipcRenderer.on('clear-canvas', () => {
      canvasImage?.revert()
      setCanvasImage(null)
    })

    return () => {
      window.ipcRenderer.removeAllListeners('clear-canvas')
    }
  }, [])

  return (
    <div className='app-container'>
      <Gallery onTransfer={handleTransfer} />
      <Canvas primaryImage={canvasImage} />
    </div>
  )
}
