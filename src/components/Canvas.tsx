import { useEffect, useRef, useState } from 'react'
import '../css/Canvas.css'
import CanvasImage from '@/classes/Image';

export default function Canvas({ primaryImage, onClear }: { primaryImage: CanvasImage | null; onClear: () => void }) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const containerStyle = {
    width: `${windowWidth}px`
  }

  return (
    <>
      <div ref={containerRef} className={'canvas-container'} style={containerStyle}>
        {primaryImage && <img src={URL.createObjectURL(primaryImage.getTopLayer())} alt={`Edited: ${primaryImage.name}`} className='canvas-image' />}
        <button onClick={() => onClear()}>Clear Image</button>
        <button>Save Image</button>
      </div>
    </>
  )
}
