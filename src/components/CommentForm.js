import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/actions';

const CommentForm = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && content) {
      dispatch(addComment({
        id: Date.now(),
        name,
        content,
        date: new Date().toISOString(),
        replies: [],
      }));
      setName('');
      setContent('');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit" style ={{backgroundColor : 'blue' , color:'white'}}>POST</button>
    </form>
  );
};

export default CommentForm;