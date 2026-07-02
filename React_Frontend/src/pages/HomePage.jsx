import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import Globe from '../components/Globe';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UploadForm from '../components/UploadForm';
import { AuthContext } from '../context/AuthContext';

const HEADLINE = ['Every', 'Monument', 'Has', 'a', 'Story.'];

const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
};

const headlineWord = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const FEATURES = [
  {
    icon: '📸',
    title: 'Snap a Photo',
    description: 'Capture or upload a picture of any monument or historical landmark you encounter.',
  },
  {
    icon: '🤖',
    title: 'AI Uncovers the Story',
    description: 'Gemini AI identifies the place and writes an engaging tale of its historical significance.',
  },
  {
    icon: '🔊',
    title: 'Listen in Hindi',
    description: 'The story is translated and narrated aloud, so you can keep exploring hands-free.',
  },
];

// Card that tilts in 3D toward the cursor
const TiltCard = ({ icon, title, description, delay }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ['9deg', '-9deg']), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ['-9deg', '9deg']), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group bg-gray-900/70 backdrop-blur border border-white/10 rounded-2xl p-8 text-center hover:border-blue-500/50 transition-colors"
    >
      <div style={{ transform: 'translateZ(40px)' }}>
        <span className="text-5xl block mb-5 drop-shadow-[0_0_18px_rgba(96,165,250,0.35)]" aria-hidden="true">
          {icon}
        </span>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');
  const audioRef = useRef(null);
  const audioUrlRef = useRef(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    };
  }, []);

  const handleResult = ({ translated_text, mp3 }) => {
    setIsProcessing(false);
    setTranslatedText(translated_text);

    // Decode the Base64 MP3 into a playable audio object
    const binaryString = atob(mp3);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const audioBlob = new Blob([bytes], { type: 'audio/mpeg' });

    audioRef.current?.pause();
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    audioUrlRef.current = URL.createObjectURL(audioBlob);
    audioRef.current = new Audio(audioUrlRef.current);
    audioRef.current.play().catch(() => {});
  };

  const handleError = (message) => {
    setIsProcessing(false);
    setError(message);
  };

  const replayAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const closeResult = () => {
    audioRef.current?.pause();
    setTranslatedText('');
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ============ HERO ============ */}
        <section className="relative h-[92vh] overflow-hidden">
          <div className="absolute inset-0">
            <Globe />
          </div>

          {/* Readability gradient — lets clicks pass through to the globe */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center pointer-events-none">
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="show"
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-2xl max-w-4xl leading-tight"
            >
              {HEADLINE.map((word, i) => (
                <motion.span
                  key={i}
                  variants={headlineWord}
                  className={`inline-block mr-3 md:mr-5 ${
                    word === 'Story.'
                      ? 'text-shine bg-gradient-to-r from-amber-200 via-orange-400 to-amber-200 bg-[length:200%_auto] bg-clip-text text-transparent'
                      : ''
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-6 max-w-xl text-base md:text-xl text-gray-300"
            >
              Snap a photo of any landmark and let your AI tour guide bring its history to life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
            >
              {isAuthenticated ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUploadForm(true)}
                  className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-[0_0_35px_rgba(37,99,235,0.45)] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                >
                  <span className="text-2xl" aria-hidden="true">📸</span>
                  Identify a Monument
                </motion.button>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-[0_0_35px_rgba(37,99,235,0.45)] transition-colors"
                  >
                    <span className="text-2xl" aria-hidden="true">✨</span>
                    Get Started — It&apos;s Free
                  </Link>
                </motion.div>
              )}
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-white border border-white/20 hover:border-white/40 backdrop-blur px-6 py-4 rounded-full transition-colors"
              >
                How it works
              </a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.a
            href="#how-it-works"
            aria-label="Scroll to learn more"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-gray-400 hover:text-white transition-colors"
          >
            <motion.svg
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.a>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section id="how-it-works" className="relative py-24 px-4 bg-gradient-to-b from-black via-gray-950 to-black">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-400 text-center mb-14 max-w-lg mx-auto"
          >
            Three steps between you and the story of any place on Earth.
          </motion.p>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            style={{ perspective: '1200px' }}
          >
            {FEATURES.map((feature, index) => (
              <TiltCard key={feature.title} {...feature} delay={index * 0.15} />
            ))}
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="py-24 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-amber-500/15 border border-white/10 rounded-3xl px-8 py-14 backdrop-blur"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to explore?
            </h2>
            <p className="text-gray-300 mb-8 max-w-md mx-auto">
              Your next discovery is one photo away. Start your journey with Guide Mitra today.
            </p>
            {isAuthenticated ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setShowUploadForm(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg transition-colors"
              >
                📸 Identify a Monument
              </motion.button>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link
                  to="/register"
                  className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg transition-colors"
                >
                  Create a free account
                </Link>
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* ============ OVERLAYS ============ */}
        {/* Guidance result panel */}
        <AnimatePresence>
          {translatedText && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="fixed left-4 right-4 md:left-6 md:right-auto top-24 md:w-96 bg-gray-900/90 backdrop-blur-md text-white p-5 rounded-2xl border border-white/10 shadow-2xl z-30"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-amber-400">📖 Guidance</h2>
                <button
                  onClick={closeResult}
                  aria-label="Close guidance"
                  className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
                >
                  &times;
                </button>
              </div>
              <p className="text-sm md:text-base text-gray-200 overflow-y-auto max-h-64 leading-relaxed">
                {translatedText}
              </p>
              <button
                onClick={replayAudio}
                className="mt-4 flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
              >
                <span aria-hidden="true">🔊</span> Replay audio
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Processing overlay */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
            >
              <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-white text-lg font-medium">Uncovering the story…</p>
              <p className="text-gray-400 text-sm">Analyzing your photo, this can take a few seconds</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error toast */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-600/95 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-4 max-w-md"
            >
              <span className="text-sm">{error}</span>
              <button
                onClick={() => setError('')}
                aria-label="Dismiss error"
                className="text-white/80 hover:text-white text-xl leading-none"
              >
                &times;
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Upload modal */}
      <AnimatePresence>
        {showUploadForm && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <UploadForm
              closeForm={() => setShowUploadForm(false)}
              onSubmitStart={() => {
                setError('');
                closeResult();
                setIsProcessing(true);
              }}
              onResult={handleResult}
              onError={handleError}
            />
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default HomePage;
