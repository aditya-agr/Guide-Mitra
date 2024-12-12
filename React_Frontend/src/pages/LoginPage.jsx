import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginPage = () => {
  return (
    <div className="bg-darkBg h-screen flex flex-col justify-between">
      <Header/>

  
      <div className="bg-black min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-extrabold text-white text-center"
        >
          Login
        </motion.h2>
        <LoginForm />
      </motion.div>
    </div>

    <Footer />
    </div>
  );
};

export default LoginPage;
