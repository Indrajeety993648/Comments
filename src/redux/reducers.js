import { ADD_COMMENT, ADD_REPLY, EDIT_COMMENT, DELETE_COMMENT } from './actions';
import { loadState, saveState } from '../utils/storage';

const initialState = loadState() || {
  comments: [
    {
      id: 1,
      name: 'Siddharth',
      content: 'Why is global warming increasing day by day?',
      date: new Date().toISOString(),
      replies: [
        {
          id: 2,
          name: 'Mohit',
          content: 'Because people are cutting down trees regularly and not planting new ones.',
          date: new Date().toISOString(),
          replies: [],
        }
      ]
    },
    {
      id: 3,
      name: 'Raju',
      content: 'Is AI a boon or a bane?',
      date: new Date().toISOString(),
      replies: [],
    }
  ],
};

// Recursive function to delete a comment by id
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

// Recursive function to add a reply to a comment by parent id
const addReplyToComment = (comments, parentId, reply, level = 0) => {
  return comments.map(comment => {
    if (comment.id === parentId) {
      if (level < 4) { // Assuming level 4 is the max depth
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
        comments: addReplyToComment(state.comments, action.payload.parentId, action.payload.reply, action.payload.level || 0),
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
  saveState(newState); // Save the new state to local storage
  return newState;
};

export default rootReducer;
