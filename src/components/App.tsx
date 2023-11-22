import '../css/App.css'
import Canvas from './Canvas'
import Gallery from './Gallery'

export default function App() {
  return (
    <div className="app-container">
      <Gallery />
      <Canvas />
    </div>
  );
}
