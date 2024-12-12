import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6 text-center"
        >
          About Guide Mitra
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg max-w-2xl text-center"
        >
          Guide Mitra is your digital companion for exploring historical places and landmarks. 
          Leveraging advanced AI models, it provides immersive storytelling, historical insights, 
          and detailed information about artifacts and structures. Our mission is to make every tourist's journey more informative and engaging, helping you connect with the history and stories behind the places you visit.
        </motion.p>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
