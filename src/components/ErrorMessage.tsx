import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-red-400 text-lg mb-4 flex items-center justify-center gap-2">
        <AlertTriangle className="inline-block" size={24} />
        <span>Error</span>
      </div>
      <p className="text-gray-300 mb-4 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
