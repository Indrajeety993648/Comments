import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment';

const CommentList = () => {
  const comments = useSelector(state => state.comments);
  const [sortOrder, setSortOrder] = useState('newest'); // Default sort order

  // Function to handle sorting
  const sortComments = (comments, order) => {
    return [...comments].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      switch (order) {
        case 'newest':
          return dateB - dateA; // Newest first
        case 'asc':
          return dateA - dateB; // Ascending
        case 'desc':
          return dateB - dateA; // Descending
        default:
          return 0;
      }
    });
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedComments = sortComments(comments, sortOrder);

  return (
    <div className="comment-list">
      <div className="sort-by">
        <select id="sort" value={sortOrder} onChange={handleSortChange}>
          <option value="newest">Newest</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {sortedComments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
