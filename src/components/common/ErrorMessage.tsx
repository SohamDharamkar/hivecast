import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

export default function ErrorMessage({ message, onClose, className = '' }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex items-center p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-200 ${className}`}
    >
      <AlertCircle size={20} className="mr-3 text-red-400 flex-shrink-0" />
      <p className="flex-1 text-sm">{message}</p>
      {onClose && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="ml-3 p-1 hover:bg-red-800/30 rounded-lg transition-colors"
        >
          <X size={16} />
        </motion.button>
      )}
    </motion.div>
  );
}