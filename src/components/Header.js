import React from 'react';
import './Header.css';

const Header = ({ weekNumber, startDate, endDate, onPrevWeek, onNextWeek }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="header" data-year={currentYear}>
      <button className="nav-button" onClick={onPrevWeek}>&#8592;</button> {/* Seta para a esquerda */}
      <span className="week-info">Semana {weekNumber}: {startDate} - {endDate}</span>
      <button className="nav-button" onClick={onNextWeek}>&#8594;</button> {/* Seta para a direita */}
    </div>
  );
};

export default Header;