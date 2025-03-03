import React, { useState } from 'react';
import './Notes.css';

const Notes = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState('');

  const getPopupClass = () => {
    if (title === 'Importante') {
      return 'important-popup';
    }
    return 'general-popup';
  };

  return (
    <div>
      <button className={title === 'Importante' ? 'important' : 'general'} onClick={() => setIsOpen(true)}>
        {title}
      </button>
      {isOpen && (
        <div className={`popup ${getPopupClass()}`}>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          <button onClick={() => setIsOpen(false)} className="close-button">Fechar</button>
        </div>
      )}
    </div>
  );
};

export default Notes;