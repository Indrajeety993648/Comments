export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_REPLY = 'ADD_REPLY';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

export const addReply = (parentId, reply, level) => ({
  type: ADD_REPLY,
  payload: { parentId, reply, level },
});

export const editComment = (id, content) => ({
  type: EDIT_COMMENT,
  payload: { id, content },
});

export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  payload: id,
});
