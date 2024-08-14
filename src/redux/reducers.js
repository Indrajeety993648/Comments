import { ADD_COMMENT, ADD_REPLY, EDIT_COMMENT, DELETE_COMMENT } from './actions';
import { loadState, saveState } from '../utils/storage';

const initialState = loadState() || {
  comments: [],
};

const deleteNestedComment = (comments, idToDelete) => {
  return comments
    .map(comment => {
      if (comment.id === idToDelete) {
        return null; // Mark this comment for deletion
      }

      if (comment.replies) {
        return {
          ...comment,
          replies: deleteNestedComment(comment.replies, idToDelete),
        };
      }

      return comment;
    })
    .filter(comment => comment !== null); // Filter out any null values (deleted comments)
};

const addReplyToComment = (comments, parentId, reply, level) => {
  return comments.map(comment => {
    if (comment.id === parentId) {
      if (level < 4) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            { ...reply, level: level + 1 },
          ],
        };
      }
    } else if (comment.replies) {
      return {
        ...comment,
        replies: addReplyToComment(comment.replies, parentId, reply, level),
      };
    }
    return comment;
  });
};

const rootReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_COMMENT:
      newState = {
        ...state,
        comments: [...state.comments, action.payload],
      };
      break;
    case ADD_REPLY:
      newState = {
        ...state,
        comments: addReplyToComment(state.comments, action.payload.parentId, action.payload.reply, action.payload.level),
      };
      break;
    case EDIT_COMMENT:
      newState = {
        ...state,
        comments: state.comments.map(comment =>
          comment.id === action.payload.id
            ? { ...comment, content: action.payload.content }
            : comment
        ),
      };
      break;
    case DELETE_COMMENT:
      newState = {
        ...state,
        comments: deleteNestedComment(state.comments, action.payload),
      };
      break;
    default:
      return state;
  }
  saveState(newState);
  return newState;
};

export default rootReducer;
