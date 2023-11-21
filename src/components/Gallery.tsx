import { useState } from 'react'
import FileExplorer from './FileExplorer'

export default function Gallery() {
  const [selectedFiles, setSelectedFiles] = useState<{ name: string; file: File }[]>([])

  function handleSelectFiles(file: File) {
    // Update state with the selected file
    setSelectedFiles([...selectedFiles, { name: file.name, file }])

    // You can also perform additional processing or send the file to a server here
    // For now, let's just log the file name
    console.log('Selected File:', file.name)
  }

  return (
    <div>
      <FileExplorer onImageUpload={handleSelectFiles} />
      <ul>
        {selectedFiles.map((selectedFile, index) => (
          <li key={index}>
            <img src={URL.createObjectURL(selectedFile.file)} alt={selectedFile.name} />
          </li>
        ))}
      </ul>
    </div>
  )
}
