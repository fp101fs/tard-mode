import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TaskInput({ onBreakDown, isLoading }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBreakDown(task);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto space-y-6"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-secondary flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          What's your goal?
        </label>
        <div className="relative">
          <input 
            type="text" 
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            placeholder="e.g. Clean my apartment"
            className="w-full bg-surface border border-slate-700 rounded-xl px-4 py-4 text-lg text-text placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-lg"
          />
          <button 
            onClick={handleSubmit}
            disabled={isLoading || !task}
            className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {isLoading ? 'Thinking...' : 'Break it down'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}