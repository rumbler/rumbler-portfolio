import React from 'react';
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
      <div className="h-[70px]" /> {/* Espaçador para o header fixo */}
      <main className="relative">
        <section className="min-h-screen">
          <LandingPage />
        </section>
        <section className="min-h-screen">
          <About />
        </section>
        <section className="min-h-screen">
          <Skills />
        </section>
        <section className="min-h-screen">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;
