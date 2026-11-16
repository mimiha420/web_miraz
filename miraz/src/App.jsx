import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from './sections/Header/Header';
import LandingPage from './sections/LandingPage/LandingPage';
import About from './sections/About/About';
import InfoOne from './sections/Info_one/info_one';
import Infokids from './sections/Infokids/Infokids';
import Help from './sections/Help/Help';
import Contacter from './sections/Contacter/Contacter';
import AboutMe from './sections/AboutMe/AboutMe';
import Footer from './sections/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          overflowX: 'clip',
          backgroundColor: '#0f172a', // Spójny ciemny granat pod Twoją nową wodę
          fontFamily: 'Open Sans, sans-serif',
        }}
      >
        <Header />

        {/* Sekcja Startowa (Landing Page) - od razu widoczna lub lekki fade */}
        <motion.section
          id="start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <LandingPage />
        </motion.section>

        {/* Kolejne sekcje z płynnym wjazdem przy scrollu (whileInView) */}
        <motion.section
          id="info-one"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <InfoOne />
        </motion.section>

        <motion.section
          id="help"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Help />
        </motion.section>

        <motion.section
          id="info-kids"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Infokids />
        </motion.section>

        <motion.section
          id="contacter"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Contacter />
        </motion.section>

        <motion.section
          id="o-mnie"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <AboutMe />
        </motion.section>

        <motion.section
          id="kontakt"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Footer />
        </motion.section>

      </div>
    </BrowserRouter>
  );
}

export default App;