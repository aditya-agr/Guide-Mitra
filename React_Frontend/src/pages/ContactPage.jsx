import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const inputClass =
  'w-full p-3 rounded-lg bg-gray-800 text-white border border-transparent placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 text-center"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base md:text-lg max-w-2xl text-center text-gray-400 mb-10"
        >
          Have questions or feedback? We&apos;d love to hear from you.
        </motion.p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-500/10 border border-green-500/30 text-green-300 rounded-2xl px-8 py-6 text-center max-w-md"
          >
            <span className="text-3xl block mb-2" aria-hidden="true">✅</span>
            <p className="font-semibold">Thanks for reaching out!</p>
            <p className="text-sm text-green-400/80 mt-1">We&apos;ll get back to you soon.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full max-w-md space-y-4"
            onSubmit={handleSubmit}
          >
            <input type="text" placeholder="Your Name" required className={inputClass} />
            <input type="email" placeholder="Your Email" required className={inputClass} />
            <textarea
              placeholder="Your Message"
              required
              className={`${inputClass} h-32 resize-none`}
            />
            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors"
            >
              Send Message
            </button>
          </motion.form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
