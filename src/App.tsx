import Header from './components/Header';
import LandingPage from './components/LandingPage';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text-primary dark">
      <Header />
      <LandingPage />
      <About />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;
