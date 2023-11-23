import React from 'react';

const AlertMessage: React.FC<{ type: 'success' | 'error'; message: string }> = ({
  type,
  message,
}) => {
  let alertColor = '';
  let backgroundColor = '';

  if (type === 'success') {
    alertColor = 'text-green-700';
    backgroundColor = 'bg-green-100';
  } else if (type === 'error') {
    alertColor = 'text-red-700';
    backgroundColor = 'bg-red-100';
  }

  return (
    <div className={`p-4 rounded-md shadow-md ${alertColor} ${backgroundColor} text-center`}>
      {message}
    </div>
  );
};

export default AlertMessage;
