import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export function Toast() {
  const { toast } = useAppContext();

  return (
    <AnimatePresence>
      {toast.type && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-8 left-1/2 z-[100] min-w-[300px]"
        >
          <div className={`
            flex items-center gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-md
            ${toast.type === 'success' ? 'bg-white/90 border-green-100' : 'bg-white/90 border-red-100'}
          `}>
            {toast.type === 'success' ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-500" />
            )}
            <p className="text-sm font-medium text-foreground">{toast.message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}