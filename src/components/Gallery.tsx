import { useState } from 'react'
import FileExplorer from './FileExplorer'
import '../css/Gallery.css'
import Image from './Image'

export default function Gallery() {
  const [selectedFiles, setSelectedFiles] = useState<{ name: string; file: File }[]>([])

  function handleSelectFiles(file: File) {
    setSelectedFiles([...selectedFiles, { name: file.name, file }])
  }

  function handleClear() {
    setSelectedFiles([])
  }

  return (
    <div className='gallery-container'>
      <FileExplorer onImageUpload={handleSelectFiles} />
      <ul className='image-list'>
        {selectedFiles.map((selectedFile, index) => (
          <li key={index}>
            <Image name={selectedFile.name} file={selectedFile.file} />
          </li>
        ))}
      </ul>
      <button style={{ cursor: 'pointer' }} onClick={handleClear}>
        Clear
      </button>
    </div>
  )
}
