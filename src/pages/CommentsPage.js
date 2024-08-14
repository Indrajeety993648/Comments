import React from 'react';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const CommentsPage = () => {
  return (
    <div className="comments-section">
      <h2>Comments</h2>
      <CommentForm />
      <CommentList />
    </div>
  );
};

export default CommentsPage;