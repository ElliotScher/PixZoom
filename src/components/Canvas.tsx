import { useEffect, useState } from 'react'
import '../css/Canvas.css'

export default function Canvas({ primaryImage, onClear }: { primaryImage: File | null; onClear: () => void }) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
  })

  const containerStyle = {
    width: `${windowWidth}px`
  }

  return (
    <>
      <div className={'canvas-container'} style={containerStyle}>
        {primaryImage && <img src={URL.createObjectURL(primaryImage)} alt={`Edited: ${primaryImage.name}`} className='canvas-image' />}
        <button onClick={() => onClear()}>Clear Image</button>
        <button>Save Image</button>
      </div>
    </>
  )
}
