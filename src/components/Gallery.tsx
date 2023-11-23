import { useState } from 'react'
import FileExplorer from './FileExplorer'
import '../css/Gallery.css'
import GalleryThumbnail from './GalleryThumbnail'

export default function Gallery({
  onTransfer,
}: {
  onTransfer: (file: File) => void
}) {
  const [selectedFiles, setSelectedFiles] = useState<{ name: string; file: File }[]>([])
  const [draggedImage, setDraggedImage] = useState<{ name: string; file: File } | null>(null)

  function handleSelectFiles(file: File) {
    setSelectedFiles([...selectedFiles, { name: file.name, file }])
  }

  function handleClear() {
    setSelectedFiles([])
  }

  function handleDelete(index: number) {
    console.log(index)
    const updatedImages = []
    for (var i = 0; i < selectedFiles.length; i++) {
      if (i == index) {
        continue
      } else {
        updatedImages.push(selectedFiles[i])
      }
    }
    setSelectedFiles(updatedImages)
  }

  function handleDragStart(index: number, event: React.DragEvent<HTMLDivElement>) {
    const draggedImage = selectedFiles[index];
    event.dataTransfer.setData('text/plain', draggedImage.name);
    setDraggedImage(draggedImage);
  }
  
  function handleDragOver(index: number, event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  
    if (draggedImage) {
      const draggedIndex = selectedFiles.indexOf(draggedImage);
      const newOrder = [...selectedFiles];
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(index, 0, draggedImage);
      setSelectedFiles(newOrder)
    }
  }
  
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDraggedImage(null);
  }
  

  return (
    <div className='gallery-container' onDrop={(event) => handleDrop(event)}>
      <FileExplorer onImageUpload={handleSelectFiles} />
      <ul className='image-list'>
        {selectedFiles.map((selectedFile, index) => (
          <li key={index}>
            <GalleryThumbnail
              file={{
                index: index,
                name: selectedFile.name,
                file: selectedFile.file
              }}
              onDelete={() => handleDelete(index)}
              onTransfer={() => onTransfer(selectedFile.file)}
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
