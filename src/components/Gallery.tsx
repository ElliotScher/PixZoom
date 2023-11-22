import { useState } from 'react'
import FileExplorer from './FileExplorer'
import '../css/Gallery.css'
import GalleryThumbnail from './GalleryThumbnail'

export default function Gallery() {
  const [selectedFiles, setSelectedFiles] = useState<{ name: string; file: File }[]>([])

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

  function handleTransfer() {}

  return (
    <div className='gallery-container'>
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
              onTransfer={handleTransfer}
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
