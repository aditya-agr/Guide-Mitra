import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const apiURL = import.meta.env.VITE_API_URL;

const UploadForm = ({ closeForm, onSubmitStart, onResult, onError }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    return () => {
      stopCamera();
      if (previewUrl && !previewUrl.startsWith('data:')) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPreview = (url) => {
    if (previewUrl && !previewUrl.startsWith('data:')) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(url);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const openCamera = () => {
    setCameraError('');
    setShowCamera(true);
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
        setShowCamera(false);
        setCameraError('Could not access the camera. Please allow camera permission or upload a photo instead.');
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
      setFile(dataUrl); // Captured photo kept as data URL
      setPreview(dataUrl);
      stopCamera();
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach((track) => track.stop());
    setShowCamera(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    if (typeof file === 'string') {
      const blob = await fetch(file).then((res) => res.blob());
      formData.append('image', blob, 'captured-photo.png');
    } else {
      formData.append('image', file);
    }

    onSubmitStart?.();
    closeForm();

    try {
      const response = await fetch(`${apiURL}/api/process-image/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onResult?.(data);
      } else {
        onError?.('We could not process that photo. Please try again with a clearer picture.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      onError?.('Something went wrong while contacting the server. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-gray-900 border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md text-white"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Identify a Monument</h2>
        <button
          type="button"
          onClick={closeForm}
          aria-label="Close"
          className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
        >
          &times;
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-6">
        Upload or capture a photo and we&apos;ll tell you its story.
      </p>

      <form onSubmit={handleSubmit}>
        {/* File upload */}
        <label className="block border-2 border-dashed border-white/20 hover:border-blue-500 rounded-xl p-4 text-center cursor-pointer transition-colors mb-4">
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Selected preview"
              className="mx-auto max-h-40 rounded-lg object-contain"
            />
          ) : (
            <div className="py-4">
              <span className="text-3xl block mb-2" aria-hidden="true">🖼️</span>
              <span className="text-sm text-gray-300">Click to choose a photo</span>
            </div>
          )}
        </label>

        <div className="flex items-center gap-3 mb-4 text-gray-500 text-xs">
          <span className="flex-1 h-px bg-white/10" />
          OR
          <span className="flex-1 h-px bg-white/10" />
        </div>

        {!showCamera && (
          <button
            type="button"
            onClick={openCamera}
            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors mb-4"
          >
            <span aria-hidden="true">📷</span> Use camera
          </button>
        )}

        {cameraError && <p className="text-red-400 text-sm mb-4">{cameraError}</p>}

        {showCamera && (
          <div className="mb-4">
            <video ref={videoRef} className="w-full rounded-xl mb-3" autoPlay playsInline muted />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={capturePhoto}
                className="flex-1 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Capture
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="flex-1 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
              >
                Close camera
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={closeForm}
            className="flex-1 px-4 py-3 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!file}
            className="flex-1 px-4 py-3 rounded-xl bg-blue-600 font-semibold hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Tell me the story
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default UploadForm;
