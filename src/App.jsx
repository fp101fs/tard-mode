import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout, Play } from 'lucide-react';
import TaskInput from './components/TaskInput';
import FocusOverlay from './components/FocusOverlay';
import { breakDownTask } from './lib/gemini';

function App() {
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [error, setError] = useState(null);

  const handleBreakDown = async (task, apiKey) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedSteps = await breakDownTask(task, apiKey);
      setSteps(generatedSteps);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/30">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center min-h-screen">
        
        {/* Header */}
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-surface rounded-2xl shadow-lg mb-4">
            <Layout className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Gemini Focus
          </h1>
          <p className="text-secondary text-lg max-w-md mx-auto">
            Turn overwhelming tasks into simple, actionable steps using AI.
          </p>
        </header>

        {/* Input Section */}
        <TaskInput onBreakDown={handleBreakDown} isLoading={isLoading} />

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg max-w-lg w-full text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results List */}
        <AnimatePresence>
          {steps.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 w-full max-w-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Your Plan</h3>
                <button 
                  onClick={() => setIsFocusMode(true)}
                  className="bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-full font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Start Focus Mode
                </button>
              </div>

              <div className="space-y-3">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-surface border border-slate-700 p-4 rounded-xl flex items-start gap-4"
                  >
                    <div className="bg-slate-700/50 text-slate-400 font-mono text-sm w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-slate-200 leading-relaxed">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Focus Mode Overlay */}
        <AnimatePresence>
          {isFocusMode && (
            <FocusOverlay 
              steps={steps} 
              onClose={() => setIsFocusMode(false)} 
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default App;