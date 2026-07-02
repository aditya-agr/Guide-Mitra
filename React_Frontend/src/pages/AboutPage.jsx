import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const features = [
  {
    icon: '📸',
    title: 'Snap a Photo',
    description: 'Capture or upload a picture of any monument or historical landmark.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Stories',
    description: 'Gemini AI identifies the place and narrates its historical significance.',
  },
  {
    icon: '🔊',
    title: 'Listen in Hindi',
    description: 'Stories are translated and read aloud, so you can explore hands-free.',
  },
];

const AboutPage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-center"
        >
          About <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">Guide Mitra</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base md:text-lg max-w-2xl text-center text-gray-300 leading-relaxed"
        >
          Guide Mitra is your digital companion for exploring historical places and landmarks.
          Leveraging advanced AI models, it provides immersive storytelling, historical insights,
          and detailed information about artifacts and structures. Our mission is to make every
          tourist&apos;s journey more informative and engaging, helping you connect with the history
          and stories behind the places you visit.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 max-w-4xl w-full">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
              className="bg-gray-900/80 border border-white/10 rounded-2xl p-6 text-center"
            >
              <span className="text-4xl block mb-4" aria-hidden="true">{feature.icon}</span>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
