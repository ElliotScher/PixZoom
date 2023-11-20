import '../App.css'
import FileExplorer from './FileExplorer'

export default function App() {
  return (
    <>
      <FileExplorer
        onImageUpload={function (file: File): void {
          console.log(file)
        }}
      />
    </>
  )
}
