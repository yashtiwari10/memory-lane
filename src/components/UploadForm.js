import React, { useState } from 'react';

function UploadForm({ addEntry }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    formData.append('file', file);

    const res = await fetch('http://localhost:5000/api/memories', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    addEntry(data.memory);
    setText('');
    setFile(null);
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Write something..." value={text} onChange={(e)=>setText(e.target.value)} />
      <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
      <button type="submit">Add Memory</button>
    </form>
  );
}

export default UploadForm;