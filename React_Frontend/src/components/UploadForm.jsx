import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const apiURL = import.meta.env.VITE_API_URL;

const UploadForm = ({ closeForm, onResponse }) => {
  const [file, setFile] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const openCamera = () => {
    setShowCamera(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
      });
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setCapturedPhoto(dataUrl);
      setFile(dataUrl); // Convert captured photo to file equivalent
      stopCamera();
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    const tracks = stream?.getTracks();

    if (tracks) {
      tracks.forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file) {
      alert('Please select or capture a photo.');
      return;
    }
  
    const formData = new FormData();
  
    if (typeof file === 'string') {
      // If the file is a captured photo (data URL)
      const blob = await fetch(file).then((res) => res.blob());
      formData.append('image', blob, 'captured-photo.png');
    } else {
      // If the file is from input
      formData.append('image', file);
    }
  
    closeForm();
    try {
      const response = await fetch(`${apiURL}/api/process-image/`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        const { translated_text, mp3 } = data;
  
        if (typeof onResponse === 'function') {
          onResponse(data);
        }
        // Decode Base64 MP3
        const binaryString = atob(mp3);
        const binaryLength = binaryString.length;
        const binaryArray = new Uint8Array(binaryLength);
        for (let i = 0; i < binaryLength; i++) {
          binaryArray[i] = binaryString.charCodeAt(i);
        }
  
        // Create a Blob from the binary data
        const audioBlob = new Blob([binaryArray], { type: 'audio/mpeg' });
  
        // Create an Object URL and play the audio
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
  
        // Display translated text
        console.log('Translated Text:', translated_text);
        audio.addEventListener("ended", () => {
          if (typeof onResponse === "function") {
            onResponse({ translated_text: "" }); // Clear text
          }
        });
      } else {
        alert('Failed to process the photo. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('An error occurred while processing the photo.');
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white transform hover:scale-105 transition-transform"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-xl font-bold mb-6"
      >
        Upload or Capture Photo
      </motion.h2>

      <form onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-gray-300 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded file:cursor-pointer"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-between items-center mb-4"
        >
          <button
            type="button"
            onClick={openCamera}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          >
            Click Photo
          </button>
          {capturedPhoto && (
            <img
              src={capturedPhoto}
              alt="Captured"
              className="w-16 h-16 rounded border border-gray-300"
            />
          )}
        </motion.div>

        {showCamera && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-4"
          >
            <video ref={videoRef} className="w-full rounded mb-2" autoPlay />
            <canvas ref={canvasRef} className="hidden" />
            <button
              type="button"
              onClick={capturePhoto}
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-400"
            >
              Capture
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-400 ml-2"
            >
              Close Camera
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-between"
        >
          <button
            type="button"
            onClick={closeForm}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-400 transition-transform transform hover:scale-110"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-400 transition-transform transform hover:scale-110"
          >
            Submit
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default UploadForm;
