import React, { useState, useEffect } from 'react';

export default function FlashMessage({ message, duration = 4000, onTimeout }) {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      onTimeout();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onTimeout]);

  return (
    <div className='flashbar-container' style={{ display: visible ? 'block' : 'none' }}>
      <h3 className='flashbar'>{message}</h3>
    </div>
  );
}
