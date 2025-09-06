import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

export default function SuccessMessage({ message, onClose, className = '' }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex items-center p-4 bg-green-900/20 border border-green-500/30 rounded-xl text-green-200 ${className}`}
    >
      <CheckCircle size={20} className="mr-3 text-green-400 flex-shrink-0" />
      <p className="flex-1 text-sm">{message}</p>
      {onClose && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="ml-3 p-1 hover:bg-green-800/30 rounded-lg transition-colors"
        >
          <X size={16} />
        </motion.button>
      )}
    </motion.div>
  );
}