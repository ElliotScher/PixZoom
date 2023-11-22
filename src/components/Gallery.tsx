import { useState } from 'react'
import FileExplorer from './FileExplorer'
import '../css/Gallery.css'
import Image from './Image'

export default function Gallery() {
  const [selectedFiles, setSelectedFiles] = useState<{ name: string; file: File }[]>([])

  function handleSelectFiles(file: File) {
    // Update state with the selected file
    setSelectedFiles([...selectedFiles, { name: file.name, file }])

    // You can also perform additional processing or send the file to a server here
    // For now, let's just log the file name
    console.log('Selected File:', file.name)
  }

  function handleClear() {
    // 👇️ open file input box on click of another element
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
