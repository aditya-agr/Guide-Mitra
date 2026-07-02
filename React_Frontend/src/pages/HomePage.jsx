import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Globe from '../components/Globe';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UploadForm from '../components/UploadForm';
import { AuthContext } from '../context/AuthContext';

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

      <main className="flex-1 relative">
        {/* Globe background */}
        <div className="absolute inset-0">
          <Globe />
        </div>

        {/* Hero */}
        <div className="relative z-10 flex flex-col items-center pt-10 md:pt-16 px-4 text-center pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg"
          >
            Your AI Tour Guide
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-3 max-w-xl text-sm md:text-lg text-gray-300"
          >
            Snap a photo of any monument and hear the story behind it.
          </motion.p>
        </div>

        {/* Primary CTA */}
        <div className="absolute bottom-8 md:bottom-14 left-1/2 -translate-x-1/2 z-10">
          {isAuthenticated ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUploadForm(true)}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white text-base md:text-lg font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg shadow-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <span className="text-2xl" aria-hidden="true">📸</span>
              Identify a Monument
            </motion.button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-3 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white text-base md:text-lg font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg transition-colors"
            >
              <span className="text-2xl" aria-hidden="true">🔑</span>
              Login to start exploring
            </Link>
          )}
        </div>

        {/* Guidance result panel */}
        <AnimatePresence>
          {translatedText && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="absolute left-4 right-4 md:left-6 md:right-auto top-24 md:top-1/4 md:w-96 bg-gray-900/85 backdrop-blur-md text-white p-5 rounded-2xl border border-white/10 shadow-2xl z-20"
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
