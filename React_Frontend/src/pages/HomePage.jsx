import React, { useState, useContext } from 'react';
import Globe from '../components/Globe';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UploadForm from '../components/UploadForm';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  // const { isAuthenticated} = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [translatedText, setTranslatedText] = useState('');

  const handleResponse = (response) => {
    setTranslatedText(response.translated_text); // Set translated text from backend response
  };

  const clearTranslatedText = () => {
    setTranslatedText(''); // Clear text after audio playback
  };

  const handleCameraClick = () => {
    setShowUploadForm(true);
  };

  return (
    <div className="bg-darkBg min-h-screen flex flex-col justify-between">
      <Header />

      <div className="relative h-full flex">
        {/* Left Panel for Translated Text */}
        {translatedText && (
          <div className="absolute left-20 top-1/4 w-1/4 bg-gray-600/25 text-white p-4 border-r border-gray-700 flex flex-col justify-center items-center z-50">
            <h2 className="text-lg font-bold mb-4">Guidance</h2>
            <p className="text-base text-gray-300 overflow-y-auto max-h-[80%] text-center">
              {translatedText}
            </p>
          </div>
        )}

        {/* Globe */}
        <div className="flex-1 relative flex items-center justify-center">
          <Globe />
          {isAuthenticated && (
            <button
              onClick={handleCameraClick}
              
              className="absolute bottom-12 left-2/2 text-4xl bg-gray-600/50 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-500 focus:outline-none"
            >
              📸
            </button>
          )}
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <UploadForm
            closeForm={() => setShowUploadForm(false)}
            onResponse={handleResponse}
            onAudioEnd={clearTranslatedText}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
