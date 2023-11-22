export default function Image(file: { name: string; file: File }) {

  return <img src={URL.createObjectURL(file.file)} alt={file.name} className='image-thumbnail' />
}
