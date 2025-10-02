import React from 'react';

function TimelineCard({ entry }) {
  return (
    <div className="timeline-card">
      <div className="card-header">
        <span>{entry.date}</span>
        <span className={`mood ${entry.mood}`}>{entry.moodEmoji || ''}</span>
      </div>
      {entry.file && <img src={'http://localhost:5000' + entry.file} alt="Memory" className="card-photo" />}
      <p>{entry.text}</p>
    </div>
  );
}

export default TimelineCard;