// import './App.css'
import Matting from "@/components/matting/Matting";
import Header from './components/header/Header';

function App() {
  return (
    <div className="w-[100%] h-[100vh] flex items-center flex-col">
      <Header />
      <Matting />
    </div>
  )
}

export default App;
