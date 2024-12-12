import React from 'react';
import { motion } from 'framer-motion';
import RegisterForm from '../components/RegisterForm';
import Footer from '../components/Footer';
import Header from '../components/Header';

const RegisterPage = () => {
  return (
    <div className="bg-black h-screen flex flex-col justify-between">
      <Header />

    <div className="p-8 flex items-center justify-center bg-black">
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
          Create Your Account
        </motion.h2>
        <RegisterForm />
      </motion.div>
    </div>

    <Footer />
    </div>
  );
};

export default RegisterPage;
