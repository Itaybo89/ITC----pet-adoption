import React, { useState } from 'react';
import './dashboard.css';

function Dashboard() {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`dashboard ${isMinimized ? 'minimized' : ''}`}>
      <button onClick={toggleMinimize} className="toggle-button">
        {isMinimized ? '→' : '←'}
      </button>
      <div className="upper-buttons">
        {isMinimized ? (
          <>
            <button title="Search">S</button>
            <button title="My Pets">P</button>
            <button title="My Saved Pets">SP</button>
          </>
        ) : (
          <>
            <button>Search</button>
            <button>My Pets</button>
            <button>My Saved Pets</button>
          </>
        )}
      </div>
      <div className="lower-buttons">
        {isMinimized ? (
          <>
            <button title="Add Pet">A</button>
            <button title="Edit Pet">E</button>
            <button title="All Pets">AP</button>
            <button title="All Users">AU</button>
          </>
        ) : (
          <>
            <button>Add Pet</button>
            <button>Edit Pet</button>
            <button>All Pets</button>
            <button>All Users</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
