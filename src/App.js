import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Notes from './components/Notes';
import Day from './components/Day';
import './App.css';

const App = () => {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const [isSelfCareOpen, setIsSelfCareOpen] = useState(false);
  const [selfCareNotes, setSelfCareNotes] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('plannerData');
    if (savedData) {
      setCurrentWeek(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('plannerData', JSON.stringify(currentWeek));
  }, [currentWeek]);

  const handlePrevWeek = () => {
    setCurrentWeek(getPreviousWeek(currentWeek));
  };

  const handleNextWeek = () => {
    setCurrentWeek(getNextWeek(currentWeek));
  };

  const getDayOfWeek = (date) => {
    const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
    const [day, month] = date.split('/');
    const dateObj = new Date(new Date().getFullYear(), month - 1, day);
    const dayIndex = dateObj.getDay();
    return daysOfWeek[dayIndex];
  };

  return (
    <div className="app">
      <Header
        weekNumber={currentWeek.weekNumber}
        startDate={currentWeek.startDate}
        endDate={currentWeek.endDate}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
      />
      <div className="notes-section">
        <Notes title="Anotações Gerais" />
        <Notes title="Importante" />
      </div>
      <div className="days-section">
        {currentWeek.days.map((day, index) => (
          <Day key={index} date={day} dayOfWeek={getDayOfWeek(day)} />
        ))}
        <button className="self-care-button" onClick={() => setIsSelfCareOpen(true)}>
          Self-Care
        </button>
        {isSelfCareOpen && (
          <div className="popup self-care-popup">
            <h3>Self-Care</h3>
            <textarea
              value={selfCareNotes}
              onChange={(e) => setSelfCareNotes(e.target.value)}
              style={{ width: '100%', resize: 'vertical' }}
            />
            <button onClick={() => setIsSelfCareOpen(false)} className="close-button">Fechar</button>
          </div>
        )}
      </div>
    </div>
  );
};
/*sei la caraio kkk*/
const getCurrentWeek = () => {
  const today = new Date();
  const weekNumber = getWeekNumber(today);
  const startDate = getStartDateOfWeek(weekNumber);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  return {
    weekNumber,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    days: getWeekDays(startDate)
  };
};

const getPreviousWeek = (currentWeek) => {
  const weekNumber = currentWeek.weekNumber - 1;
  const startDate = getStartDateOfWeek(weekNumber);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  return {
    weekNumber,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    days: getWeekDays(startDate)
  };
};

const getNextWeek = (currentWeek) => {
  const weekNumber = currentWeek.weekNumber + 1;
  const startDate = getStartDateOfWeek(weekNumber);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  return {
    weekNumber,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    days: getWeekDays(startDate)
  };
};

const getWeekNumber = (date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const firstSunday = new Date(startOfYear.setDate(startOfYear.getDate() - startOfYear.getDay()));
  const pastDaysOfYear = (date - firstSunday) / 86400000;
  return Math.ceil((pastDaysOfYear + 1) / 7);
};

const getStartDateOfWeek = (weekNumber) => {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  const firstSunday = new Date(startOfYear.setDate(startOfYear.getDate() - startOfYear.getDay()));
  const days = (weekNumber - 1) * 7;
  const startDate = new Date(firstSunday.setDate(firstSunday.getDate() + days));
  return startDate;
};

const getWeekDays = (startDate) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    days.push(formatDate(day));
  }
  return days;
};

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}`;
};

export default App;