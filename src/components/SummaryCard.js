import React, { useEffect, useState } from 'react';

function SummaryCard() {
  const [summary, setSummary] = useState('Loading summary...');

  useEffect(() => {
    fetch('http://localhost:5000/api/memories/summary')
      .then(res => res.json())
      .then(data => setSummary(data.summary));
  }, []);

  return (
    <div className="summary-card">
      <h2>AI Summary</h2>
      <p>{summary}</p>
    </div>
  );
}

export default SummaryCard;