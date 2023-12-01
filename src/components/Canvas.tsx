import { useEffect, useRef, useState } from 'react'
import '@/css/Canvas.css'
import CanvasImage from '@/classes/Image'
import ImageProcessingTab from './ImageProcessingTab'

export default function Canvas({ primaryImage }: { primaryImage: CanvasImage | null }) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  const [render, rerender] = useState(false)
  const [selectedFunction, setSelectedFunction] = useState('')
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    // Set up the event listener for window resize
    window.addEventListener('resize', handleResize)

    // Clean up event listener and cancel animation frame on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [primaryImage])

  const containerStyle = {
    width: `${windowWidth}px`
  }

  function handleMouseDown() {
    switch (selectedFunction) {
      case 'crop':
    }
  }

  function handleMouseMove() {
    switch (selectedFunction) {
      case 'crop':
    }
  }

  function handleMouseUp() {
    switch (selectedFunction) {
      case 'crop':

    }
  }

  async function handleCrop(cropDimensions: { x: number; y: number; width: number; height: number }) {
    console.clear()
    if (primaryImage) {
      const croppedFile = await cropImage(primaryImage.getTopLayer(), cropDimensions)
      primaryImage.addLayer(croppedFile)
      rerender(!render)
    }
  }

  function handleProcessingFunction(func: string | null) {
    if (primaryImage) {
      if (func === 'crop') {
        setSelectedFunction('crop')
      }
      if (func === 'rotate') {
        console.log('put rotating logic here')
      }
      if (func === 'resize') {
        console.log('put resizing logic here')
      }
      if (func === 'brightness') {
        console.log('put brightness logic here')
      }
      if (func === 'saturation') {
        console.log('put saturation logic here')
      }
      if (func === 'contrast') {
        console.log('put contrast logic here')
      }
      if (func === 'greyscale') {
        console.log('put greyscale logic here')
      }
    }
  }

  return (
    <>
      <div
        ref={containerRef}
        className={'canvas-container'}
        style={containerStyle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <ImageProcessingTab onSelectFunction={handleProcessingFunction} />
        {primaryImage && (
          <img
            ref={imageRef}
            src={URL.createObjectURL(primaryImage.getTopLayer())}
            alt={`Edited: ${primaryImage.name}`}
            className='canvas-image'
          />
        )}
      </div>
    </>
  )
}

export async function cropImage(image: File, cropDimensions: { x: number; y: number; width: number; height: number }): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Canvas context not supported')
      }

      const { x, y, width, height } = cropDimensions
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, x, y, width, height, 0, 0, width, height)

      canvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = new File([blob], 'cropped.png', { type: 'image/png' })
          resolve(croppedFile)
        }
      }, 'image/png')
    }
    img.src = URL.createObjectURL(image)
  })
}
