import { useState } from 'react'
import FileExplorer from './FileExplorer'
import '../css/Gallery.css'
import GalleryThumbnail from './GalleryThumbnail'
import CanvasImage from '@/classes/Image'

export default function Gallery({ onTransfer }: { onTransfer: (image: CanvasImage) => void }) {
  const [selectedImages, setSelectedImages] = useState<{ name: string; image: CanvasImage }[]>([])
  const [draggedImage, setDraggedImage] = useState<{ name: string; image: CanvasImage } | null>(null)

  function handleSelectFiles(file: File) {
    const image = new CanvasImage(file, file.name)
    setSelectedImages([...selectedImages, { name: image.name, image: image }])
  }

  function handleClear() {
    setSelectedImages([])
  }

  function handleDelete(index: number) {
    console.log(index)
    const updatedImages = []
    for (var i = 0; i < selectedImages.length; i++) {
      if (i == index) {
        continue
      } else {
        updatedImages.push(selectedImages[i])
      }
    }
    setSelectedImages(updatedImages)
  }

  function handleDragStart(index: number, event: React.DragEvent<HTMLDivElement>) {
    const draggedImage = selectedImages[index]
    event.dataTransfer.setData('text/plain', draggedImage.name)
    setDraggedImage(draggedImage)
  }

  function handleDragOver(index: number, event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()

    if (draggedImage) {
      const draggedIndex = selectedImages.indexOf(draggedImage)
      const newOrder = [...selectedImages]
      newOrder.splice(draggedIndex, 1)
      newOrder.splice(index, 0, draggedImage)
      setSelectedImages(newOrder)
    }
  }

  function handleDrop(event: React.DragEvent<HTMLElement>) {
    event.preventDefault()
    setDraggedImage(null)
  }

  return (
    <div className='gallery-container' onDrop={(event) => handleDrop(event)} onDragOver={(event) => event.preventDefault()}>
      <FileExplorer onImageUpload={handleSelectFiles} />
      <ul className='image-list'>
        {selectedImages.map((selectedImage, index) => (
          <li key={index}>
            <GalleryThumbnail
              file={{
                index: index,
                name: selectedImage.name,
                file: selectedImage.image.getBaseLayer()
              }}
              onDelete={() => handleDelete(index)}
              onTransfer={() => onTransfer(selectedImage.image)}
              onDragStart={(event) => handleDragStart(index, event)}
              onDragOver={(event) => handleDragOver(index, event)}
            />
          </li>
        ))}
      </ul>
      <button style={{ cursor: 'pointer' }} onClick={handleClear}>
        Clear
      </button>
    </div>
  )
}
