import { useRef, useState } from 'react'
import '@/css/Canvas.css'
import CanvasImage from '@/classes/Image'
import ImageProcessingTab from './ImageProcessingTab'

export default function Canvas({ primaryImage }: { primaryImage: CanvasImage | null }) {
  const [render, rerender] = useState(false)
  const [selectedFunction, setSelectedFunction] = useState('')
  const [cropStart, setCropStart] = useState<{ x: number; y: number } | null>(null)
  const [dashedRect, setDashedRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (selectedFunction === 'crop') {
      setCropStart({ x: e.clientX, y: e.clientY })
      setDashedRect({ x: e.clientX, y: e.clientY, width: 1, height: 1 })
    }
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (selectedFunction === 'crop') {
      if (cropStart) {
        const width = e.clientX - cropStart.x
        const height = e.clientY - cropStart.y
        if (dashedRect) {
          setDashedRect({ x: cropStart.x, y: cropStart.y, width: width, height: height })
        }
      }
    }
  }

  async function handleMouseUp() {
    if (selectedFunction === 'crop') {
      if (cropStart) {
        const x = cropStart.x
        const y = cropStart.y
        const width = dashedRect?.width
        const height = dashedRect?.height

        if (width && height) {
          await handleCrop({ x, y, width, height })
          console.log(width)
        }

        setCropStart({ x: 0, y: 0 })
        setDashedRect(null)
      }
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
      } else if (func === 'rotate') {
        console.log('put rotating logic here')
      } else if (func === 'resize') {
        console.log('put resizing logic here')
      } else if (func === 'brightness') {
        console.log('put brightness logic here')
      } else if (func === 'saturation') {
        console.log('put saturation logic here')
      } else if (func === 'contrast') {
        console.log('put contrast logic here')
      } else if (func === 'greyscale') {
        console.log('put greyscale logic here')
      } else {
        setSelectedFunction('')
      }
    }
  }

  return (
    <>
      <div
        ref={containerRef}
        className={'canvas-container'}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {dashedRect && (
          <div
            style={{
              left: `${dashedRect.x}px`,
              top: `${dashedRect.y}px`,
              width: `${dashedRect.width}px`,
              height: `${dashedRect.height}px`
            }}
            className={'dashed-rectangle'}
          ></div>
        )}
        <ImageProcessingTab onSelectFunction={handleProcessingFunction} />
        {primaryImage && (
          <img
            ref={imageRef}
            src={URL.createObjectURL(primaryImage.getTopLayer())}
            alt={`Edited: ${primaryImage.name}`}
            className={'canvas-image'}
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
