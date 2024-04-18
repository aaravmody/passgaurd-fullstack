import Footer from "./components/Footer"
import Manager from "./components/Manager"
import Navbar from "./components/Navbar"


function App() {
  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-[87vh]">
      <div className="bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
    <Manager/>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default App
