import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-9xl font-bold mb-4 text-indigo-600">404</div>
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Page Not Found</h1>
        <p className="mb-6 text-gray-600">
          The page you're looking for doesn't exist or has been moved
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-lg font-medium bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          Return to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;