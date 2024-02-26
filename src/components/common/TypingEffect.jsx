import React, { useState, useEffect } from 'react';
 
const TypingEffect = ({ text, typingDelay = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, typingDelay);

      return () => clearTimeout(typingTimeout);
    } else {
      setTypingComplete(true);
    }
  }, [displayedText, text, typingDelay]);

  return (
    <div className="typing-effect">
      {displayedText}
      <Cursor />
    </div>
  );
};

const Cursor = () => {
  return <span className="cursor blinking">|</span>;
};

export default TypingEffect;