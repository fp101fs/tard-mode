import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

export default function FocusOverlay({ steps, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextStep = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose(); // Or show a completion screen
    }
  };

  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-6"
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-surface">
        <motion.div 
          className="h-full bg-green-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-secondary hover:text-text transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-12">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="space-y-4"
        >
          <span className="text-primary font-bold text-xl tracking-widest uppercase">
            Step {currentIndex + 1} of {steps.length}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            {steps[currentIndex]}
          </h1>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextStep}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-green-600 rounded-full hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
        >
          {currentIndex === steps.length - 1 ? (
            <>
              Finish Task <CheckCircle className="ml-2 w-6 h-6" />
            </>
          ) : (
            <>
              Next Step <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
