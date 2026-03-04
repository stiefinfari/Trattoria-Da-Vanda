import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import Blog from './pages/Blog';
import BnB from './pages/BnB';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-rustic-200 selection:text-rustic-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/prenota" element={<Reservation />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/bnb" element={<BnB />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
