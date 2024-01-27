import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ isOpen, onClose, api }) {
  if (!isOpen) return null;

  const [displayText, setDisplayText] = useState('');
  const text = 'XXX';

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 175);
    return () => clearInterval(interval);
  }, []);

  return ReactDOM.createPortal(
    <div
      className={`opacity-100 scale-100 transform transition-transform fixed inset-0 flex items-center justify-center flex-col z-20 ${
        api == 0 ? 'bg-[#f0f2f3]' : 'bg-[#1c1c1c]'
      } font-bold text-[5vw] md:text-[4vw] lg:text-4xl`}
    >
      <h1>WE'RE NOT REALLY STRANGERS</h1>
      {api == 1 && <p>{displayText}</p>}
    </div>,
    document.getElementById('modal-root')
  );
}
