import React from 'react';
import { motion } from 'framer-motion';
import RegisterForm from '../components/RegisterForm';
import Footer from '../components/Footer';
import Header from '../components/Header';

const RegisterPage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md p-8 space-y-6 bg-gray-800/80 backdrop-blur rounded-2xl border border-white/10 shadow-2xl"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Create your account</h2>
            <p className="text-sm text-gray-400">Join Guide Mitra and explore the world&apos;s stories</p>
          </div>
          <RegisterForm />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
