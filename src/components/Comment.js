import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReply, editComment, deleteComment } from '../redux/actions';
import ReplyForm from './ReplyForm';
import { FaTrashAlt, FaReply } from 'react-icons/fa'; // Importing react-icons

const avatars = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png'
];

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
};

const Comment = ({ comment, level = 1 }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const dispatch = useDispatch();

  const handleReply = (replyContent) => {
    dispatch(addReply(comment.id, {
      id: Date.now(),
      name: replyContent.name,
      content: replyContent.content,
      date: new Date().toISOString(),
      replies: [],
    }, level));
    setIsReplying(false);
  };

  const handleEdit = () => {
    dispatch(editComment(comment.id, editedContent));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  // Function to format date as needed
  const formatDate = (date) => {
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="comment" style={{ marginLeft: `${level * 20}px` }}>
      <div className="comment-header" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={getRandomAvatar()} alt="Avatar" style={{ borderRadius: '50%', width: '40px', height: '40px', marginRight: '10px' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong>{comment.name}</strong>
          <span>{formatDate(comment.date)}</span>
        </div>
        <FaTrashAlt onClick={handleDelete} style={{ cursor: 'pointer', marginLeft: 'auto', color: 'blue' }} />
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          ></textarea>
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <p>{comment.content}</p>
      )}
      <div className="comment-actions" style={{ marginTop: '10px' }}>
        {level < 4 && (
          <span
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'blue' }}
            onClick={() => setIsReplying(!isReplying)}
          >
            <FaReply style={{ marginRight: '5px' }} />
            Reply
          </span>
        )}
        <span
          style={{ cursor: 'pointer', display: 'inline-block', marginLeft: '10px', color: 'blue' }}
          onClick={() => setIsEditing(!isEditing)}
        >
          Edit
        </span>
      </div>
      {isReplying && <ReplyForm onSubmit={handleReply} />}
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map(reply => (
            <Comment key={reply.id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
