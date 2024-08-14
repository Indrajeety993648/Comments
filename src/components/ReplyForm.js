import React, { useState } from 'react';

const ReplyForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && content) {
      onSubmit({ name, content });
      setName('');
      setContent('');
    }
  };

  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Reply"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit" style=
      {{backgroundColor:'blue',color:'white'}}>POST</button>
    </form>
  );
};

export default ReplyForm;